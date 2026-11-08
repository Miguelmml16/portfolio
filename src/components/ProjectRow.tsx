"use client";

import { Plus } from "lucide-react";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectLinks } from "@/components/ProjectLinks";
import { ProjectMedia } from "@/components/ProjectMedia";
import { useT } from "@/lib/i18n";

// Secondary repos stay in the detail sheet; the row shows the main links.
const ROW_LINKS = 4;

/**
 * One project in the list: meta rail | text | cover image (image first on
 * mobile). The title button stretches over the whole row (after:inset-0), so
 * clicking the image opens the detail too; external links sit above it (z-10).
 */
export function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const t = useT().projects;
  const copy = t.items[project.slug];
  const rowLinks = project.links.filter((l) => !l.label).slice(0, ROW_LINKS);

  return (
    <Reveal as="li" className="group relative border-b border-line">
      <div className="grid grid-cols-1 gap-y-6 py-8 md:grid-cols-12 md:gap-x-8 md:py-10">
        <div className="flex gap-4 md:col-span-3 md:block">
          <p className="font-mono text-sm text-fg">{String(index).padStart(2, "0")}</p>
          <div className="md:mt-4">
            <p className="text-sm text-fg">{copy.roleShort}</p>
            <p className="label mt-1">{copy.period}</p>
          </div>
          {/* Explicit "view details" control (the rest of the row opens it too). */}
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="label relative z-10 mt-8 hidden items-center gap-2.5 text-fg md:inline-flex"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-90 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
              <Plus className="h-3.5 w-3.5" />
            </span>
            {t.details}
          </button>
        </div>

        <div className="md:order-3 md:col-span-4">
          <ProjectMedia project={project} sizes="(max-width: 768px) 100vw, 33vw" />
        </div>

        <div className="md:order-2 md:col-span-5">
          <h3>
            <button
              type="button"
              onClick={() => onOpen(project)}
              aria-label={t.openDetails(copy.name)}
              className="display text-left text-4xl normal-case leading-none text-fg after:absolute after:inset-0 md:text-5xl"
            >
              {/* The nudge lives on an inner span: a transform on the button
                  would make it the containing block and shrink the row overlay. */}
              <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                {copy.name}
              </span>
            </button>
          </h3>
          {copy.award && <p className="label mt-4 text-fg">{copy.award}</p>}
          <p className="mt-4 text-lg leading-snug text-muted">{copy.tagline}</p>

          <p className="mt-5 font-mono text-xs leading-relaxed text-muted">
            {project.tech.slice(0, 6).join("  ·  ")}
            {project.tech.length > 6 && <span className="text-subtle">{`  +${project.tech.length - 6}`}</span>}
          </p>

          <ProjectLinks links={rowLinks} className="relative z-10 mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm" />
        </div>
      </div>
    </Reveal>
  );
}
