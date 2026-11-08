"use client";

import { useCallback, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectRow } from "@/components/ProjectRow";
import { ProjectModal } from "@/components/ProjectModal";
import { useT } from "@/lib/i18n";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const t = useT();
  const p = t.projects;
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" className="container-page py-20 md:py-28">
      <SectionHeading index={p.index} eyebrow={t.nav.projects} title={p.title} description={p.description} />

      <ol className="border-t border-line">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i + 1} onOpen={setSelected} />
        ))}
      </ol>

      <ProjectModal project={selected} onClose={close} />
    </section>
  );
}
