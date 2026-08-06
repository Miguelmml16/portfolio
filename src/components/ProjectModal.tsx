"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  Github,
  Sparkles,
  X,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} details`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl sm:my-0"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-lg bg-ink-950/60 p-2 text-white/70 backdrop-blur transition-colors hover:bg-ink-950 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {project.image && (
              <div className="relative aspect-video w-full bg-ink-800">
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? `${project.name} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
              </div>
            )}

            <div className="max-h-[70vh] overflow-y-auto p-6 sm:p-8">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {project.category.map((c) => (
                  <Badge key={c} tone="crimson">
                    {c}
                  </Badge>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white">{project.name}</h3>
              <p className="mt-1 text-white/50">{project.tagline}</p>

              <div className="mt-6 space-y-6 text-sm leading-relaxed text-white/70">
                <div>
                  <h4 className="mb-1.5 font-mono text-xs uppercase tracking-wider text-crimson-500">
                    The problem
                  </h4>
                  <p>{project.problem}</p>
                </div>

                <div>
                  <h4 className="mb-1.5 font-mono text-xs uppercase tracking-wider text-crimson-500">
                    Overview
                  </h4>
                  <p>{project.description}</p>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-crimson-500">
                    Key features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-crimson-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-crimson-500">
                    Technical highlights
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-crimson-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-1.5 font-mono text-xs uppercase tracking-wider text-crimson-500">
                    My role
                  </h4>
                  <p>{project.role}</p>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-crimson-500">
                    Tech stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/5 px-2 py-1 font-mono text-xs text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-crimson-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-crimson-500"
                >
                  <Github className="h-4 w-4" /> View Repository
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:border-crimson-500/60"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
                {project.extraRepos?.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-crimson-500/60 hover:text-white"
                  >
                    <Github className="h-4 w-4" /> {r.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
