"use client";

import Image from "next/image";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { imageHref, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

/**
 * 3:2 cover for a project. Covers are transparent product mockups, so they
 * float over the sky with no frame and stay in full color (they show the
 * real UI). When the project sets `imageLink`, the cover opens that link in
 * a new tab (above the row's "open details" layer). Without an image, a
 * quiet placeholder holds the space.
 */
export function ProjectMedia({
  project,
  sizes,
  className,
}: {
  project: Project;
  sizes: string;
  className?: string;
}) {
  const t = useT().projects;
  const name = t.items[project.slug].name;

  if (!project.image) {
    return (
      <div
        className={cn(
          "flex aspect-[3/2] flex-col items-center justify-center gap-2 border border-line bg-fg/[0.03] text-muted",
          className,
        )}
      >
        <ImageIcon className="h-5 w-5" aria-hidden="true" />
        <span className="label">{t.imageSoon}</span>
      </div>
    );
  }

  const href = imageHref(project);
  const linkLabel = project.imageLink ? t.linkLabels[project.imageLink] : "";
  const image = (
    <Image
      src={project.image}
      alt={t.imageAlt(name)}
      fill
      sizes={sizes}
      className="object-contain transition-transform duration-700 ease-out group-hover/media:-translate-y-1.5 group-hover/media:scale-[1.02]"
    />
  );

  if (!href) {
    return <div className={cn("group/media relative aspect-[3/2]", className)}>{image}</div>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${linkLabel} — ${name}`}
      className={cn("group/media relative z-10 block aspect-[3/2]", className)}
    >
      {image}
      <span
        aria-hidden="true"
        className="pill pointer-events-none absolute bottom-2 right-2 bg-bg/85 opacity-0 backdrop-blur transition-opacity duration-300 group-hover/media:opacity-100 group-focus-visible/media:opacity-100"
      >
        {linkLabel}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </a>
  );
}
