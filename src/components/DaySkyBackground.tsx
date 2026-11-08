"use client";

import { useEffect, useRef } from "react";
import { clamp, lerp } from "@/lib/galaxy/math";
import { createStarLayers, drawStarLayers, type StarLayer } from "@/lib/galaxy/sky";
import { PALETTE_KEYS, createClouds, drawClouds, drawSky, drawSun, duskPalette } from "@/lib/galaxy/dusk";
import { docTop, skyBodyX } from "@/lib/galaxy/layout";

const MAX_DPR = 1.5;

interface Scene {
  w: number;
  h: number;
  dpr: number;
  clouds: ReturnType<typeof createClouds>;
  stars: StarLayer[];
}

function buildScene(canvas: HTMLCanvasElement): Scene {
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  return { w, h, dpr, clouds: createClouds(w, h, dpr), stars: createStarLayers(w, h) };
}

const smoothstep = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

/**
 * Darkness from the page position: the sky stays light through Work and
 * Experience, falls during Skills, and is night by the time the contact
 * title is in the upper part of the screen.
 */
function darknessAt(scroll: number, h: number) {
  const start = docTop("skills") - h;
  const end = docTop("contact") - h * 0.35;
  return { darkness: smoothstep((scroll - start) / Math.max(1, end - start)), sunsetEnd: end };
}

function applyPalette(darkness: number, last: { key: string }) {
  const palette = duskPalette(darkness);
  const key = PALETTE_KEYS.map((k) => palette[k]).join("|");
  if (key === last.key) return;
  last.key = key;
  const style = document.documentElement.style;
  for (const k of PALETTE_KEYS) style.setProperty(k, palette[k]);
}

function clearPalette(last: { key: string }) {
  last.key = "";
  const style = document.documentElement.style;
  for (const k of PALETTE_KEYS) style.removeProperty(k);
}

/** Day-mode sky: clouds and a setting sun that turn the page into dusk. */
export default function DaySkyBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Reduced motion: plain day sky, no scroll-driven sunset or palette.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const lastPalette = { key: "" };
    let scene: Scene | null = null;
    let raf = 0;
    let running = false;

    const frame = (time: number) => {
      if (!scene) return;
      const { w, h, dpr } = scene;
      const scroll = still ? 0 : window.scrollY;
      const { darkness, sunsetEnd } = still ? { darkness: 0, sunsetEnd: 1 } : darknessAt(scroll, h);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawSky(ctx, w, h, darkness);
      drawStarLayers(ctx, scene.stars, w, h, scroll, time / 1000, true, clamp((darkness - 0.7) / 0.3));

      // The sun sinks from the upper right to below the horizon by the contact.
      const R = w < 640 ? 22 : 34;
      const sunset = clamp(scroll / Math.max(1, sunsetEnd));
      drawSun(ctx, skyBodyX(w, R), lerp(h * 0.16, h * 1.12, sunset * sunset), R, darkness);

      drawClouds(ctx, scene.clouds, w, h, scroll, still ? 0 : time / 1000, darkness);
      if (!still) applyPalette(darkness, lastPalette);
      if (running && !still) raf = requestAnimationFrame(frame);
    };

    // Shown only in day mode (CSS); night mode belongs to GalaxyBackground.
    const sync = () => {
      const visible = getComputedStyle(canvas).display !== "none";
      if (visible && !running) {
        running = true;
        scene = scene ?? buildScene(canvas);
        if (!still) root.dataset.sunset = "on";
        raf = requestAnimationFrame(frame);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
        delete root.dataset.sunset;
        clearPalette(lastPalette);
      }
    };

    const onResize = () => {
      if (!scene) return;
      const widthChanged = window.innerWidth !== scene.w;
      const bigHeightChange = Math.abs(window.innerHeight - scene.h) > 150;
      if (widthChanged || bigHeightChange) scene = buildScene(canvas);
      if (running && still) requestAnimationFrame(frame);
    };

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", sync);
    window.addEventListener("resize", onResize);
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      scheme.removeEventListener("change", sync);
      window.removeEventListener("resize", onResize);
      delete root.dataset.sunset;
      clearPalette(lastPalette);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="day-sky pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
