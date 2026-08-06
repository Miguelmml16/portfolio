"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const featured = project.featured;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className={cn(
        "group card-surface relative flex flex-col overflow-hidden rounded-2xl transition-colors hover:border-crimson-500/40",
        featured && "lg:col-span-2 lg:flex-row",
      )}
    >
      {/* Cover */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open details for ${project.name}`}
        className={cn(
          "relative block overflow-hidden bg-ink-800",
          featured ? "aspect-video lg:aspect-auto lg:w-1/2" : "aspect-video w-full",
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? `${project.name} preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-sm text-white/30">
            [Add project screenshot]
          </div>
        )}
        {featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-crimson-600 px-2.5 py-1 text-xs font-semibold text-white shadow-glow">
            <Star className="h-3 w-3" /> Featured
          </span>
        )}
      </button>

      {/* Body */}
      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", featured && "lg:w-1/2")}>
        <div className="mb-2 flex flex-wrap gap-1.5">
          {project.category.map((c) => (
            <Badge key={c} tone="crimson">
              {c}
            </Badge>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-white">{project.name}</h3>
        <p className="mt-1 text-sm text-white/50">{project.tagline}</p>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/65">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, featured ? 8 : 5).map((t) => (
            <span
              key={t}
              className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-white/60"
            >
              {t}
            </span>
          ))}
          {project.tech.length > (featured ? 8 : 5) && (
            <span className="rounded-md px-2 py-0.5 font-mono text-xs text-white/40">
              +{project.tech.length - (featured ? 8 : 5)}
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-1 text-sm font-medium text-crimson-400 transition-colors hover:text-crimson-300"
          >
            Details <ArrowUpRight className="h-4 w-4" />
          </button>
          <span className="text-white/15">·</span>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
          >
            <Github className="h-4 w-4" /> View Repository
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
