import { TAU, clamp, gauss, lerp, mod, mulberry32 } from "./math";

/**
 * Day-mode sunset. `darkness` (0 = day, 1 = night) drives both the sky and
 * the page palette, so text keeps contrast while the background darkens.
 */

// Sky mid-tone per darkness. The drop is steep around 0.5 so the low-contrast
// mid-gray moment (where text flips from ink to paper) is brief.
const SKY_KEYS: [number, number][] = [
  [0, 248],
  [0.35, 214],
  [0.5, 128],
  [0.65, 56],
  [1, 8],
];

/** Text flips from dark to light at this darkness. */
export const FLIP = 0.5;

export function skyLevel(darkness: number): number {
  for (let i = 1; i < SKY_KEYS.length; i++) {
    const [f1, l1] = SKY_KEYS[i];
    const [f0, l0] = SKY_KEYS[i - 1];
    if (darkness <= f1) return lerp(l0, l1, (darkness - f0) / (f1 - f0));
  }
  return SKY_KEYS[SKY_KEYS.length - 1][1];
}

const rgb = (v: number) => {
  const c = Math.round(clamp(v, 0, 255));
  return `${c} ${c} ${c}`;
};

/** CSS custom properties for the current darkness (values as "r g b"). */
export function duskPalette(darkness: number): Record<string, string> {
  const L = skyLevel(darkness);
  if (darkness < FLIP) {
    const t = darkness / FLIP;
    return {
      "--bg": rgb(L),
      "--fg": rgb(12),
      "--muted": rgb(lerp(100, 24, t)),
      "--subtle": rgb(lerp(165, 70, t)),
      "--line": rgb(L - lerp(22, 40, t)),
    };
  }
  const t = (darkness - FLIP) / (1 - FLIP);
  return {
    "--bg": rgb(L),
    "--fg": rgb(244),
    "--muted": rgb(lerp(236, 166, t)),
    "--subtle": rgb(lerp(190, 96, t)),
    "--line": rgb(L + lerp(48, 36, t)),
  };
}

export const PALETTE_KEYS = ["--bg", "--fg", "--muted", "--subtle", "--line"];

/** Vertical sky gradient: lighter toward the horizon, like a real sunset. */
export function drawSky(ctx: CanvasRenderingContext2D, w: number, h: number, darkness: number) {
  const L = skyLevel(darkness);
  // Slightly gray zenith by day so white clouds read, like a B&W photo.
  const top = clamp(L - 20 - 20 * darkness, 0, 255);
  const horizon = clamp(L + 6 + 46 * Math.sin(Math.PI * clamp(darkness * 1.15)), 0, 255);
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, `rgb(${top},${top},${top + 2})`);
  sky.addColorStop(1, `rgb(${horizon},${horizon},${horizon})`);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
}

/** Soft sun: blown-out core with a wide glow, like a black-and-white photo. */
export function drawSun(ctx: CanvasRenderingContext2D, cx: number, cy: number, R: number, darkness: number) {
  const glowR = R * (5 + 3 * darkness);
  const glow = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, glowR);
  glow.addColorStop(0, `rgba(255,255,255,${0.55 + 0.3 * darkness})`);
  glow.addColorStop(0.25, `rgba(255,255,255,${0.18 + 0.2 * darkness})`);
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, 0, TAU);
  ctx.fill();

  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
  core.addColorStop(0, "#ffffff");
  core.addColorStop(0.85, "#fdfdfc");
  core.addColorStop(1, `rgba(255,255,255,${0.6 + 0.4 * darkness})`);
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, TAU);
  ctx.fill();
}

interface Puff {
  x: number;
  y: number;
  r: number;
}

interface Cloud {
  x: number;
  y: number;
  /** Sunlit version (day) and silhouette (dusk), cross-faded by darkness. */
  light: HTMLCanvasElement;
  dark: HTMLCanvasElement;
  w: number;
  h: number;
  speed: number; // vertical parallax
  wind: number; // px per second
}

/** Cumulus shape: many soft puffs piled into a dome over a flat base. */
function cloudShape(rand: () => number, W: number, H: number): Puff[] {
  const base = H * 0.72;
  const half = W * 0.42;
  return Array.from({ length: 34 }, () => {
    const x = W / 2 + gauss(rand) * half;
    const dome = 1 - Math.pow((x - W / 2) / (half * 1.2), 2);
    const y = base - Math.abs(gauss(rand)) * H * 0.55 * Math.max(0.15, dome);
    return { x, y, r: H * (0.12 + rand() * 0.16) * (0.6 + 0.4 * Math.max(0, dome)) };
  });
}

function renderCloud(puffs: Puff[], W: number, H: number, dpr: number, tone: number, underside: number) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(W * dpr);
  canvas.height = Math.ceil(H * dpr);
  const g = canvas.getContext("2d");
  if (!g) return canvas;
  g.scale(dpr, dpr);
  for (const p of puffs) {
    const puff = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    puff.addColorStop(0, `rgba(${tone},${tone},${tone},0.5)`);
    puff.addColorStop(0.55, `rgba(${tone},${tone},${tone},0.22)`);
    puff.addColorStop(1, `rgba(${tone},${tone},${tone},0)`);
    g.fillStyle = puff;
    g.beginPath();
    g.arc(p.x, p.y, p.r, 0, TAU);
    g.fill();
  }
  // Shade the flat underside, only where the cloud already exists.
  g.globalCompositeOperation = "source-atop";
  const shade = g.createLinearGradient(0, H * 0.45, 0, H * 0.85);
  shade.addColorStop(0, `rgba(${underside},${underside},${underside},0)`);
  shade.addColorStop(1, `rgba(${underside},${underside},${underside},0.55)`);
  g.fillStyle = shade;
  g.fillRect(0, 0, W, H);
  return canvas;
}

export function createClouds(w: number, h: number, dpr: number): Cloud[] {
  const rand = mulberry32(11);
  const count = Math.max(4, Math.round(w / 260));
  return Array.from({ length: count }, (_, i) => {
    const depth = i % 3; // 0 far … 2 near
    const W = (220 + rand() * 200) * (0.6 + depth * 0.25);
    const H = W * (0.38 + rand() * 0.12);
    const puffs = cloudShape(rand, W, H);
    return {
      x: rand() * w,
      y: rand() * h * 1.4,
      light: renderCloud(puffs, W, H, dpr, 255, 205),
      dark: renderCloud(puffs, W, H, dpr, 30, 14),
      w: W,
      h: H,
      speed: 0.08 + depth * 0.12,
      wind: 4 + depth * 5,
    };
  });
}

export function drawClouds(
  ctx: CanvasRenderingContext2D,
  clouds: Cloud[],
  w: number,
  h: number,
  scroll: number,
  time: number,
  darkness: number,
) {
  const night = clamp(darkness * 1.4);
  const span = h * 1.4;
  for (const c of clouds) {
    const x = mod(c.x + time * c.wind, w + c.w * 2) - c.w;
    const y = mod(c.y - scroll * c.speed, span) - h * 0.2;
    if (night < 1) {
      ctx.globalAlpha = 1 - night;
      ctx.drawImage(c.light, x, y, c.w, c.h);
    }
    if (night > 0) {
      ctx.globalAlpha = night * 0.85;
      ctx.drawImage(c.dark, x, y, c.w, c.h);
    }
  }
  ctx.globalAlpha = 1;
}
