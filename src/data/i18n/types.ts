import type { ProjectCategory, ProjectLinkKind, ProjectSlug } from "@/data/projects";
import type { TimelineId } from "@/data/experience";
import type { NavKey } from "@/data/site";

/** Text with emphasized fragments: plain strings, or { b } for bold. */
export type Rich = (string | { b: string })[];

export interface ProjectCopy {
  name: string;
  /** Short role shown in the list, e.g. "Co-founder". */
  roleShort: string;
  period: string;
  /** Optional distinction shown under the title (prize, ranking…). */
  award?: string;
  tagline: string;
  problem: string;
  description: string;
  features: string[];
  role: string;
  highlights: string[];
}

export interface TimelineCopy {
  title: string;
  org: string;
  period: string;
  description: string;
  linkLabel?: string;
}

export interface Dictionary {
  skipLink: string;
  nav: Record<NavKey, string> & { menu: string; close: string; primary: string };
  langToggle: { ariaLabel: string };
  theme: { toDark: string; toLight: string };
  hero: {
    greeting: string;
    role: string;
    intro: Rich;
    status: string;
    contactMe: string;
    downloadCV: string;
    photoAlt: string;
  };
  projects: {
    index: string;
    title: string;
    description: string;
    openDetails: (name: string) => string;
    imageAlt: (name: string) => string;
    imageSoon: string;
    details: string;
    linkLabels: Record<ProjectLinkKind, string>;
    categories: Record<ProjectCategory, string>;
    modal: {
      problem: string;
      overview: string;
      keyFeatures: string;
      technicalHighlights: string;
      myRole: string;
      techStack: string;
      links: string;
      close: string;
    };
    items: Record<ProjectSlug, ProjectCopy>;
  };
  experience: {
    index: string;
    title: string;
    items: Record<TimelineId, TimelineCopy>;
    educationTitle: string;
    education: { title: string; org: string; period: string };
    languagesTitle: string;
    /** Same order as languageLevels in data/experience.ts. */
    languages: { name: string; level: string }[];
  };
  skills: {
    index: string;
    title: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    copy: string;
    copied: string;
    channels: { github: string; linkedin: string; instagram: string; whatsapp: string; cv: string };
  };
  footer: {
    rights: (year: number) => string;
    backToTop: string;
  };
}
