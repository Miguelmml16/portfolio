// Structural project data only. All human-readable copy (name, tagline,
// description, features…) lives in src/data/i18n/{en,es}.ts keyed by slug.
// Projects render in this order, one under the other.

export type ProjectCategory =
  | "Startup"
  | "Mobile"
  | "AI"
  | "Full Stack"
  | "Backend"
  | "Java"
  | "Data Structures";

export type ProjectSlug = "alata" | "brokeate" | "gestion-de-aeropuertos" | "bibliored";

export type ProjectLinkKind =
  | "web"
  | "appStore"
  | "googlePlay"
  | "instagram"
  | "repo"
  | "demo"
  | "award";

export interface ProjectLink {
  kind: ProjectLinkKind;
  url: string;
  /** Overrides the translated label for this kind (e.g. secondary repos). */
  label?: string;
}

export interface Project {
  slug: ProjectSlug;
  category: ProjectCategory[];
  tech: string[];
  /** First link is the primary one. */
  links: ProjectLink[];
  /**
   * Cover shown in the list and the detail sheet (16:10 crop). Put the file
   * in public/projects/ and set e.g. "/projects/alata.jpg". Without it a
   * placeholder keeps the space.
   */
  image?: string;
  /** Which link the cover image opens (first link of that kind without a custom label). */
  imageLink?: ProjectLinkKind;
}

/** URL the cover image opens, if any. */
export function imageHref(project: Project): string | undefined {
  if (!project.imageLink) return undefined;
  return project.links.find((l) => l.kind === project.imageLink && !l.label)?.url;
}

export const projects: Project[] = [
  {
    slug: "alata",
    image: "/projects/alata.png",
    imageLink: "web",
    category: ["Startup", "Mobile", "Full Stack"],
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "NativeWind",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Socket.io",
      "React",
      "AWS",
    ],
    links: [
      { kind: "web", url: "https://alata-ec.com" },
      { kind: "appStore", url: "https://apps.apple.com/app/id6818165556" },
      { kind: "googlePlay", url: "https://play.google.com/store/apps/details?id=com.alataec.app" },
      { kind: "instagram", url: "https://www.instagram.com/alata_ec/" },
    ],
  },
  {
    slug: "brokeate",
    image: "/projects/brokeate.png",
    imageLink: "repo",
    category: ["AI", "Full Stack", "Backend"],
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Supabase",
      "LangGraph",
      "Vite",
      "React",
      "NativeWind",
      "JWT",
      "AWS",
      "Vercel",
    ],
    links: [
      { kind: "demo", url: "https://brokeate-web.vercel.app" },
      { kind: "repo", url: "https://github.com/raydan90s/BROKEATE-APP" },
      { kind: "award", url: "https://www.instagram.com/p/DcGjKz5lrTw/" },
      { kind: "repo", url: "https://github.com/raydan90s/BROKEATE-BACKEND", label: "Backend (FastAPI)" },
      { kind: "repo", url: "https://github.com/raydan90s/BROKEATE-WEB", label: "Web (Vite + React)" },
    ],
  },
  {
    slug: "gestion-de-aeropuertos",
    image: "/projects/airport-graph.png",
    imageLink: "repo",
    category: ["Java", "Data Structures"],
    tech: ["Java 21", "JavaFX", "Maven", "JUnit 5"],
    links: [{ kind: "repo", url: "https://github.com/Miguelmml16/Gestion-de-Aeropuertos" }],
  },
  {
    slug: "bibliored",
    image: "/projects/bibliored.png",
    imageLink: "repo",
    category: ["Backend", "Full Stack"],
    tech: ["Python", "Django", "Bootstrap 5", "SQLite", "MySQL"],
    links: [{ kind: "repo", url: "https://github.com/Miguelmml16/BIblioRed" }],
  },
];
