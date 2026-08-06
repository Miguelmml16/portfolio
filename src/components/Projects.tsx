"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  projects as allProjects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  // Only show filter chips for categories that actually have projects.
  const availableFilters = useMemo<Filter[]>(() => {
    const used = new Set<ProjectCategory>();
    allProjects.forEach((p) => p.category.forEach((c) => used.add(c)));
    return ["All", ...projectCategories.filter((c) => used.has(c))];
  }, []);

  const visible = useMemo(() => {
    if (filter === "All") return allProjects;
    return allProjects.filter((p) => p.category.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A few projects that show how I work across AI, backend and the fundamentals. Each opens for a deeper technical look."
        />

        {/* Filters */}
        {availableFilters.length > 2 && (
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {availableFilters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  filter === f
                    ? "bg-crimson-600 text-white"
                    : "border border-white/10 text-white/60 hover:border-crimson-500/40 hover:text-white",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.slug} project={p} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
