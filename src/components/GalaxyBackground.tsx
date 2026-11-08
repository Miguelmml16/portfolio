"use client";

import { useEffect, useRef } from "react";
import { clamp, easeOutCubic, lerp } from "@/lib/galaxy/math";
import { createMilkyWay, createStarLayers, drawStarLayers, type StarLayer } from "@/lib/galaxy/sky";
import { drawConstellations } from "@/lib/galaxy/constellations";
import { skyBodyX } from "@/lib/galaxy/layout";
import { createMoonRenderer, loadMoonAlbedo, type MoonRenderer } from "@/lib/galaxy/moon";

/** Extra Milky Way height so the band can drift up as the page scrolls. */
const MILKY_EXTRA = 260;
const MAX_DPR = 1.75;

interface Scene {
  w: number;
  h: number;
  dpr: number;
  layers: StarLayer[];
  milky: HTMLCanvasElement;
  /** Null until the NASA albedo map has loaded. */
  moon: MoonRenderer | null;
  R: number;
}

function buildScene(canvas: HTMLCanvasElement, albedo: ImageData | null): Scene {
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const R = w < 640 ? 30 : 56;
  return {
    w,
    h,
    dpr,
    layers: createStarLayers(w, h),
    milky: createMilkyWay(w, h + MILKY_EXTRA, dpr),
    moon: albedo ? createMoonRenderer(albedo, R, dpr) : null,
    R,
  };
}

function render(ctx: CanvasRenderingContext2D, scene: Scene, time: number, still: boolean, font: string) {
  const { w, h, dpr, R, moon } = scene;
  const scroll = still ? 0 : window.scrollY;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - h);
  const t = time / 1000;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(scene.milky, 0, -Math.min(scroll * 0.05, MILKY_EXTRA), w, h + MILKY_EXTRA);
  drawStarLayers(ctx, scene.layers, w, h, scroll, t, !still);
  drawConstellations(ctx, w, h, scroll, maxScroll, t, font);

  // The moon rises from the bottom-right during the first half of the page
  // and waxes from crescent to full by the end.
  const rise = still ? 1 : easeOutCubic(clamp(scroll / (maxScroll * 0.45)));
  const cx = skyBodyX(w, R);
  const cy = lerp(h * 0.97, h * 0.22, rise);
  const illum = still ? 1 : lerp(0.22, 1, clamp(scroll / maxScroll));
  moon?.draw(ctx, cx, cy, illum);
}

/** Night-mode sky: Milky Way, parallax stars, constellations and the moon. */
export default function GalaxyBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font = getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim() || "monospace";
    let scene: Scene | null = null;
    let albedo: ImageData | null = null;
    let raf = 0;
    let running = false;
    let disposed = false;

    // The moon appears as soon as its texture is decoded.
    loadMoonAlbedo().then((data) => {
      if (disposed || !data) return;
      albedo = data;
      if (scene) scene.moon = createMoonRenderer(data, scene.R, scene.dpr);
      if (running && still) requestAnimationFrame(frame);
    });

    const frame = (time: number) => {
      if (!scene) return;
      render(ctx, scene, time, still, font);
      if (running && !still) raf = requestAnimationFrame(frame);
    };

    // The canvas is display:none outside night mode (CSS); only animate when shown.
    const sync = () => {
      const visible = getComputedStyle(canvas).display !== "none";
      if (visible && !running) {
        running = true;
        scene = scene ?? buildScene(canvas, albedo);
        raf = requestAnimationFrame(frame);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const onResize = () => {
      if (!scene) return;
      // Ignore small height changes (mobile URL bar) to avoid regenerating.
      const widthChanged = window.innerWidth !== scene.w;
      const bigHeightChange = Math.abs(window.innerHeight - scene.h) > 150;
      if (widthChanged || bigHeightChange) scene = buildScene(canvas, albedo);
      if (running && still) requestAnimationFrame(frame);
    };

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", sync);
    window.addEventListener("resize", onResize);
    sync();

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      scheme.removeEventListener("change", sync);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="galaxy-sky pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
