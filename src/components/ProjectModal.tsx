"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectLinks } from "@/components/ProjectLinks";
import { ProjectMedia } from "@/components/ProjectMedia";
import { useT } from "@/lib/i18n";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 border-t border-line py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <h4 className="label pt-0.5">{label}</h4>
      <div className="text-sm leading-relaxed text-fg/80">{children}</div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-subtle" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Side sheet with the full technical write-up of a project. */
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const t = useT().projects;
  const closeRef = useRef<HTMLButtonElement>(null);
  const copy = project ? t.items[project.slug] : null;

  useEffect(() => {
    if (!project) return;
    const trigger = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && copy && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-fg/30 backdrop-blur-[2px]"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col bg-bg shadow-[0_0_80px_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-10">
              <p className="label">{project.category.map((c) => t.categories[c]).join(" · ")}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="label -mr-2 inline-flex items-center gap-1.5 px-2 py-2 text-fg"
              >
                {t.modal.close} <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-12 pt-10 sm:px-10">
              {project.image && (
                <ProjectMedia project={project} sizes="(max-width: 672px) 100vw, 672px" className="mb-8" />
              )}
              <h3 id="project-title" className="display text-5xl normal-case leading-none text-fg">
                {copy.name}
              </h3>
              {copy.award && <p className="label mt-5 text-fg">{copy.award}</p>}
              <p className="mb-10 mt-4 text-lg text-muted">{copy.tagline}</p>

              <Block label={t.modal.problem}>
                <p>{copy.problem}</p>
              </Block>
              <Block label={t.modal.overview}>
                <p>{copy.description}</p>
              </Block>
              <Block label={t.modal.keyFeatures}>
                <List items={copy.features} />
              </Block>
              <Block label={t.modal.technicalHighlights}>
                <List items={copy.highlights} />
              </Block>
              <Block label={t.modal.myRole}>
                <p>{copy.role}</p>
              </Block>
              <Block label={t.modal.techStack}>
                <p className="font-mono text-xs leading-loose">{project.tech.join("  ·  ")}</p>
              </Block>
              <Block label={t.modal.links}>
                <ProjectLinks links={project.links} className="space-y-2" />
              </Block>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
