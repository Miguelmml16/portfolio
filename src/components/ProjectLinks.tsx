"use client";

import { ArrowUpRight } from "lucide-react";
import type { ProjectLink } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

/** External links of a project, labelled by kind in the current language. */
export function ProjectLinks({
  links,
  className,
  itemClassName,
}: {
  links: ProjectLink[];
  className?: string;
  itemClassName?: string;
}) {
  const labels = useT().projects.linkLabels;

  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.url} className={itemClassName}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("link-draw inline-flex items-center gap-1 text-fg")}
          >
            {link.label ?? labels[link.kind]} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
