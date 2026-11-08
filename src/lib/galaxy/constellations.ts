import { TAU, clamp } from "./math";

/**
 * Simplified shapes of real constellations visible from Guayaquil.
 * Star coordinates are normalized to a square box; the third value is
 * brightness (0–1).
 */
interface Constellation {
  name: string;
  /** Box size in px at 1200px viewport width. */
  size: number;
  /** Horizontal center, as a fraction of the viewport width. */
  x: number;
  stars: [number, number, number][];
  lines: [number, number][];
}

const CONSTELLATIONS: Constellation[] = [
  {
    name: "Orion",
    size: 230,
    x: 0.78,
    stars: [
      [0.48, 0.0, 0.4], // Meissa
      [0.2, 0.12, 1], // Betelgeuse
      [0.76, 0.16, 0.75], // Bellatrix
      [0.38, 0.5, 0.7], // Alnitak
      [0.5, 0.47, 0.75], // Alnilam
      [0.62, 0.44, 0.7], // Mintaka
      [0.3, 0.9, 0.6], // Saiph
      [0.82, 0.86, 1], // Rigel
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 5], [3, 4], [4, 5], [3, 6], [5, 7]],
  },
  {
    name: "Crux",
    size: 150,
    x: 0.14,
    stars: [
      [0.46, 0.0, 0.8], // Gacrux
      [0.52, 1.0, 1], // Acrux
      [0.12, 0.42, 0.85], // Mimosa
      [0.84, 0.36, 0.55], // Delta
      [0.64, 0.62, 0.3], // Epsilon
    ],
    lines: [[0, 1], [2, 3]],
  },
  {
    name: "Ursa Major",
    size: 260,
    x: 0.74,
    stars: [
      [0.0, 0.32, 0.7],
      [0.18, 0.26, 0.75],
      [0.33, 0.36, 0.8],
      [0.48, 0.46, 0.55],
      [0.52, 0.76, 0.75],
      [0.84, 0.86, 0.75],
      [0.88, 0.52, 0.85],
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
  },
  {
    name: "Cassiopeia",
    size: 200,
    x: 0.2,
    stars: [
      [0.0, 0.25, 0.7],
      [0.25, 0.78, 0.8],
      [0.5, 0.42, 0.9],
      [0.75, 0.88, 0.75],
      [1.0, 0.12, 0.65],
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
];

/** Constellations scroll at this fraction of the page speed (parallax). */
const PARALLAX = 0.55;
/** Fraction of the page over which the constellations are spread. */
const SPREAD = 0.82;
/** Peak opacity of lines; kept low so they stay behind the text. */
const LINE_ALPHA = 0.22;

/**
 * Draws each constellation so it crosses the screen at a different point of
 * the page; lines draw themselves in as the shape nears the center.
 */
export function drawConstellations(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  scroll: number,
  maxScroll: number,
  time: number,
  font: string,
) {
  const scale = clamp(w / 1200, 0.55, 1);
  const last = CONSTELLATIONS.length - 1;

  CONSTELLATIONS.forEach((c, i) => {
    const size = c.size * scale;
    // Each one crosses the screen center at its share of the page, ending
    // before the contact title so the last shape doesn't sit behind it.
    const baseY = h * 0.42 + (i / last) * SPREAD * maxScroll * PARALLAX;
    const cy = baseY - scroll * PARALLAX;
    if (cy < -size || cy > h + size) return;

    const fade = 1 - clamp(Math.abs(cy - h * 0.45) / (h * 0.75));
    if (fade <= 0) return;

    const ox = c.x * w - size / 2;
    const oy = cy - size / 2;
    const pts = c.stars.map(([x, y, m]) => [ox + x * size, oy + y * size, m] as const);
    const drawn = clamp((fade - 0.15) / 0.45);

    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(255,255,255,${LINE_ALPHA * fade})`;
    for (const [a, b] of c.lines) {
      const [x1, y1] = pts[a];
      const [x2, y2] = pts[b];
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 + (x2 - x1) * drawn, y1 + (y2 - y1) * drawn);
      ctx.stroke();
    }

    for (const [x, y, m] of pts) {
      const twinkle = 0.8 + 0.2 * Math.sin(time * 1.7 + x * 0.05);
      const r = 1 + m * 1.6;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
      glow.addColorStop(0, `rgba(255,255,255,${0.28 * fade * twinkle})`);
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, r * 5, 0, TAU);
      ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${fade})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fill();
    }

    ctx.font = `500 10px ${font}`;
    ctx.fillStyle = `rgba(255,255,255,${0.32 * fade})`;
    ctx.fillText(c.name.toUpperCase().split("").join(" "), ox, oy + size + 22);
  });
}
