import { TAU, clamp } from "./math";

/**
 * Realistic moon: NASA LRO albedo map (public/textures/moon-albedo.jpg,
 * SVS CGI Moon Kit, public domain) projected onto a sphere and lit with a
 * Lommel-Seeliger/Lambert blend. That reflectance is why a real full moon
 * looks evenly bright edge to edge, and it gives a correct curved terminator
 * at every phase.
 */

export const MOON_TEXTURE_SRC = "/textures/moon-albedo.jpg";

/** Faint light on the night side (earthshine). */
const EARTHSHINE = 0.012;
/** Brightness gain so sunlit highlands land near white. */
const EXPOSURE = 1.45;

export async function loadMoonAlbedo(src: string = MOON_TEXTURE_SRC): Promise<ImageData | null> {
  try {
    const img = new Image();
    img.src = src;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const g = canvas.getContext("2d", { willReadFrequently: true });
    if (!g) return null;
    g.drawImage(img, 0, 0);
    return g.getImageData(0, 0, canvas.width, canvas.height);
  } catch {
    return null;
  }
}

export interface MoonRenderer {
  /** illum: lit fraction of the disc, 0 = new moon, 1 = full moon. */
  draw(ctx: CanvasRenderingContext2D, cx: number, cy: number, illum: number): void;
}

interface SurfacePoint {
  index: number; // pixel index in the output
  nx: number;
  nz: number; // view-space normal (y is irrelevant: the sun moves horizontally)
  albedo: number; // 0–1, contrast-adjusted luminance
  edge: number; // anti-aliasing coverage at the limb
}

/** Precomputes the orthographic projection of the near side once per size. */
function projectSurface(albedo: ImageData, size: number): SurfacePoint[] {
  const r = size / 2;
  const { width: W, height: H, data } = albedo;
  const points: SurfacePoint[] = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = (x + 0.5 - r) / r;
      const py = (y + 0.5 - r) / r;
      const d2 = px * px + py * py;
      if (d2 > 1.02) continue;
      const nz = Math.sqrt(Math.max(0, 1 - d2));
      const lat = Math.asin(clamp(-py, -1, 1));
      const lon = Math.atan2(px, nz);
      const u = Math.min(W - 1, Math.floor((lon / TAU + 0.5) * W));
      const v = Math.min(H - 1, Math.floor((0.5 - lat / Math.PI) * H));
      const o = (v * W + u) * 4;
      const lum = (0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2]) / 255;
      points.push({
        index: (y * size + x) * 4,
        nx: px,
        nz,
        // Gentle contrast: real maria are only ~2x darker than highlands.
        albedo: clamp(0.3 + 0.9 * (lum - 0.3)),
        edge: clamp((1 - Math.sqrt(d2)) * r + 0.5),
      });
    }
  }
  return points;
}

export function createMoonRenderer(albedo: ImageData, R: number, dpr: number): MoonRenderer {
  const size = Math.ceil(R * 2 * dpr);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const g = canvas.getContext("2d");
  const surface = projectSurface(albedo, size);
  const image = g ? g.createImageData(size, size) : null;
  let lastAngle = -1; // impossible angle, forces the first shade

  function shade(angle: number) {
    if (!g || !image) return;
    // Sun direction in view space: behind the moon at new, behind us at full,
    // lighting the right-hand side while waxing.
    const lx = Math.sin(angle);
    const lz = -Math.cos(angle);
    const out = image.data;
    for (const p of surface) {
      const mu0 = p.nx * lx + p.nz * lz; // cos(incidence)
      const mu = p.nz; // cos(emission) — viewer on +z
      // Lommel-Seeliger (2μ0/(μ0+μ), = 1 across a full moon) plus a little
      // Lambert so the terminator softens like the real one.
      const lommel = Math.min(1.2, (2 * mu0) / (mu0 + mu + 1e-4));
      const lit = mu0 > 0 ? 0.8 * lommel + 0.2 * mu0 : 0;
      const value = Math.min(255, 255 * p.albedo * (lit * EXPOSURE + EARTHSHINE));
      out[p.index] = value;
      out[p.index + 1] = value;
      out[p.index + 2] = value * 0.985; // a hint of warmth, still grayscale to the eye
      out[p.index + 3] = 255 * p.edge;
    }
    g.putImageData(image, 0, 0);
  }

  return {
    draw(ctx, cx, cy, illum) {
      const angle = Math.acos(clamp(1 - 2 * illum, -1, 1));
      if (Math.abs(angle - lastAngle) > 0.004) {
        shade(angle);
        lastAngle = angle;
      }

      const halo = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 2.8);
      halo.addColorStop(0, `rgba(255,255,255,${0.03 + 0.1 * illum})`);
      halo.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 2.8, 0, TAU);
      ctx.fill();

      ctx.drawImage(canvas, cx - R, cy - R, R * 2, R * 2);
    },
  };
}
