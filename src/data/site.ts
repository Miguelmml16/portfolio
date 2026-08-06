export const site = {
  name: "Miguel Medina",
  role: "Computer Science Student & Software Developer",
  tagline:
    "I build software end to end — AI agents, backends and data-driven web apps — with a focus on systems that stay honest about the data they show.",
  location: "Guayaquil, Ecuador",
  university: "ESPOL — Escuela Superior Politécnica del Litoral",
  email: "miguelmedinamml@outlook.com",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://miguel-medina.vercel.app",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "Miguelmml16",
  links: {
    github: "https://github.com/Miguelmml16",
    linkedin: "https://www.linkedin.com/in/miguelmedinamml/",
    email: "mailto:miguelmedinamml@outlook.com",
    // Place your CV at /public/cv/Miguel-Medina-CV.pdf, or update this path.
    cv: "/cv/Miguel-Medina-CV.pdf", // [Add CV file]
  },
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
