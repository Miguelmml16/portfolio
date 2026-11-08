export const TAU = Math.PI * 2;

/** Deterministic PRNG so the sky looks the same on every visit. */
export function mulberry32(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Roughly normal value in [-1, 1] (sum of uniforms). */
export function gauss(rand: () => number): number {
  return (rand() + rand() + rand() - 1.5) / 1.5;
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const mod = (v: number, m: number) => ((v % m) + m) % m;
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
