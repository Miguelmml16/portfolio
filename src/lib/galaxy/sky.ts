import { TAU, gauss, mod, mulberry32 } from "./math";

export interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
}

export interface StarLayer {
  stars: Star[];
  /** Vertical parallax as a fraction of scroll. */
  speed: number;
  /** Horizontal drift as a fraction of scroll (reads as the sky turning). */
  drift: number;
}

// Far → near: more, smaller, dimmer, slower stars in the back.
const LAYER_SPECS = [
  { pxPerStar: 3500, r: [0.3, 0.8], alpha: [0.25, 0.7], speed: 0.06, drift: 0.015 },
  { pxPerStar: 11000, r: [0.7, 1.3], alpha: [0.45, 0.9], speed: 0.16, drift: 0.04 },
  { pxPerStar: 55000, r: [1.2, 2.0], alpha: [0.7, 1], speed: 0.32, drift: 0.08 },
] as const;

export function createStarLayers(w: number, h: number): StarLayer[] {
  const rand = mulberry32(7);
  const pick = ([min, max]: readonly [number, number]) => min + rand() * (max - min);

  return LAYER_SPECS.map((spec) => ({
    speed: spec.speed,
    drift: spec.drift,
    stars: Array.from({ length: Math.round((w * h) / spec.pxPerStar) }, () => ({
      x: rand() * w,
      y: rand() * h,
      r: pick(spec.r),
      alpha: pick(spec.alpha),
      twinkleSpeed: 0.5 + rand() * 2,
      phase: rand() * TAU,
    })),
  }));
}

export function drawStarLayers(
  ctx: CanvasRenderingContext2D,
  layers: StarLayer[],
  w: number,
  h: number,
  scroll: number,
  time: number,
  twinkle: boolean,
  opacity = 1,
) {
  ctx.fillStyle = "#fff";
  for (const layer of layers) {
    const oy = scroll * layer.speed;
    const ox = scroll * layer.drift;
    for (const s of layer.stars) {
      const base = twinkle ? s.alpha * (0.7 + 0.3 * Math.sin(time * s.twinkleSpeed + s.phase)) : s.alpha;
      ctx.globalAlpha = base * opacity;
      ctx.beginPath();
      ctx.arc(mod(s.x + ox, w), mod(s.y - oy, h), s.r, 0, TAU);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

/** Pre-rendered Milky Way band: soft haze, a dust lane and dense star dust. */
export function createMilkyWay(w: number, h: number, dpr: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const g = canvas.getContext("2d");
  if (!g) return canvas;
  g.scale(dpr, dpr);

  const rand = mulberry32(42);
  const [x0, y0, x1, y1] = [-0.1 * w, 0.92 * h, 1.1 * w, 0.12 * h];
  const len = Math.hypot(x1 - x0, y1 - y0);
  const [nx, ny] = [-(y1 - y0) / len, (x1 - x0) / len];
  const span = Math.min(w, h) * 0.24;
  const along = (spread: number) => {
    const t = rand();
    const off = gauss(rand) * span * spread;
    return [x0 + (x1 - x0) * t + nx * off, y0 + (y1 - y0) * t + ny * off];
  };

  for (let i = 0; i < 80; i++) {
    const [x, y] = along(0.5);
    const r = span * (0.35 + rand() * 0.9);
    const tint = rand() < 0.5 ? "205,212,255" : "255,255,255";
    const haze = g.createRadialGradient(x, y, 0, x, y, r);
    // Kept faint so gray body text stays readable over the band.
    haze.addColorStop(0, `rgba(${tint},${0.018 + rand() * 0.024})`);
    haze.addColorStop(1, `rgba(${tint},0)`);
    g.fillStyle = haze;
    g.beginPath();
    g.arc(x, y, r, 0, TAU);
    g.fill();
  }

  g.globalCompositeOperation = "destination-out";
  for (let i = 0; i < 40; i++) {
    const [x, y] = along(0.12);
    const r = span * (0.08 + rand() * 0.18);
    const lane = g.createRadialGradient(x, y, 0, x, y, r);
    lane.addColorStop(0, `rgba(0,0,0,${0.08 + rand() * 0.1})`);
    lane.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = lane;
    g.beginPath();
    g.arc(x, y, r, 0, TAU);
    g.fill();
  }
  g.globalCompositeOperation = "source-over";

  g.fillStyle = "#fff";
  const dust = Math.round((w * h) / 700);
  for (let i = 0; i < dust; i++) {
    const [x, y] = along(0.45);
    g.globalAlpha = 0.1 + rand() * 0.38;
    g.beginPath();
    g.arc(x, y, 0.25 + rand() * 0.5, 0, TAU);
    g.fill();
  }
  g.globalAlpha = 1;
  return canvas;
}
