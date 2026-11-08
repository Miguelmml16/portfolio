export const site = {
  name: "Miguel Medina",
  location: "Guayaquil, Ecuador",
  email: "miguelmedinamml@outlook.com",
  // Fallback matches the URL printed on the CV; override with NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-bice-three-51.vercel.app",
  links: {
    github: "https://github.com/Miguelmml16",
    linkedin: "https://www.linkedin.com/in/miguelmedinamml/",
    instagram: "https://www.instagram.com/miguelmml._/",
    // Same number as on the public CV.
    whatsapp: "https://wa.me/593999422359",
    email: "mailto:miguelmedinamml@outlook.com",
    cv: "/cv/Miguel-Medina-CV.pdf",
  },
} as const;

export type NavKey = "projects" | "experience" | "skills" | "contact";

export const navItems: { key: NavKey; href: `#${string}` }[] = [
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "skills", href: "#skills" },
  { key: "contact", href: "#contact" },
];
