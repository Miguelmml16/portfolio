export type ProjectCategory =
  | "AI"
  | "Full Stack"
  | "Backend"
  | "Frontend"
  | "Java"
  | "Data Structures";

export interface Project {
  slug: string;
  name: string;
  featured: boolean;
  category: ProjectCategory[];
  tagline: string;
  problem: string;
  description: string;
  features: string[];
  tech: string[];
  role: string;
  highlights: string[];
  repoUrl: string;
  /** Secondary repositories (for multi-repo projects). */
  extraRepos?: { label: string; url: string }[];
  /** Live demo URL — only set when one really exists. */
  demoUrl?: string;
  /** Screenshot path under /public/projects. Falls back to a generated cover. */
  image?: string;
  imageAlt?: string;
}

export const projects: Project[] = [
  {
    slug: "brokeate",
    name: "Brokeate",
    featured: true,
    category: ["AI", "Full Stack", "Backend"],
    tagline: "Robo-advisor with a human advisor in the loop.",
    problem:
      "Automated investment advice tends to invent numbers and act without oversight. Brokeate keeps a human advisor in control and forbids the AI from producing any figure the database can't back.",
    description:
      "A robo-advisory platform, built for a financial-AI hackathon (Track 3: Robo-Advisory). A client answers a risk questionnaire, the system scores their profile in the database, assembles a portfolio proposal from the bank's catalog, and a human advisor approves, edits or rejects it before it becomes final. A LangGraph conversational agent explains the numbers but never invents them.",
    features: [
      "Risk profiling scored in Postgres (not in the client or the LLM) with a transparent answer → points → threshold breakdown",
      "Explainable portfolio proposals with USD amounts computed in SQL, expected risk and per-issuer credit ratings",
      "Advisor review queue with deterministic flags (approve / edit / reject), each decision audited with date, rules version and owner",
      "Sub-accounts that split total capital across goals, enforced by a Postgres trigger against race conditions",
      "LangGraph agent with a 3-route state graph and anti-hallucination guardrails; provider-swappable (Gemini / OpenAI / Anthropic)",
      "External-markets module (Alpha Vantage) with a 1-hour cache and deterministic simulated fallback, plus a GNews feed and a Twilio WhatsApp bot",
    ],
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
    role:
      "Developer on the winning team. The work was shared equally across the group — I contributed to both the front-end (the React Native app and the React web client) and the FastAPI + Postgres backend, as well as the AI layer (the LangGraph agent and its anti-hallucination guardrails).",
    highlights: [
      "Anti-hallucination by construction: every generated text is validated against a closed 'allowed context'; if the model invents a value the text is discarded, retried once, then falls back to a deterministic template.",
      "Business rules enforced in the database via triggers and GENERATED columns, so guarantees hold even against direct SQL — not just application code.",
      "Clean layered backend: routes handle only HTTP, controllers hold business logic, services own the AI engine — with a pytest suite that runs against the real seeded database.",
    ],
    repoUrl: "https://github.com/raydan90s/BROKEATE-APP",
    extraRepos: [
      { label: "Backend (FastAPI)", url: "https://github.com/raydan90s/BROKEATE-BACKEND" },
      { label: "Web (Vite + React)", url: "https://github.com/raydan90s/BROKEATE-WEB" },
    ],
    demoUrl: "https://brokeate-web.vercel.app",
    image: "/projects/brokeate.svg",
    imageAlt: "Brokeate robo-advisor project cover",
  },
  {
    slug: "gestion-de-aeropuertos",
    name: "Airport Management (Graphs)",
    featured: false,
    category: ["Java", "Data Structures"],
    tagline: "Graph algorithms over airports and flight routes, visualized live.",
    problem:
      "Classic graph algorithms are hard to grasp as pseudocode. This desktop app models airports and flights as a directed graph and animates each algorithm on an interactive canvas.",
    description:
      "A Java 21 + JavaFX desktop application that models airports and flight routes as a directed graph with an adjacency list. It manages the data, computes routes, and runs and visualizes classic graph algorithms on an interactive, zoomable canvas. Built for a Data Structures course as a refactored, extended version of the original project.",
    features: [
      "Directed graph with adjacency list — O(1) vertex lookup backed by a LinkedHashMap",
      "BFS, DFS, Dijkstra (priority queue with lazy deletion), weakly/strongly connected components (Kosaraju) and minimum spanning tree (Kruskal + Union-Find)",
      "Strategy pattern for edge weight — switch between time, distance and cost, recomputing every weighted algorithm on the fly",
      "Interactive canvas: drag nodes, zoom, pan, and color-coded animations per algorithm",
      "CSV import/export, and PBKDF2-HMAC-SHA256 hashed user accounts persisted to disk",
    ],
    tech: ["Java 21", "JavaFX", "Maven", "JUnit 5"],
    role:
      "Sole author. Designed the data-structures core, the JavaFX UI and the JUnit 5 test suite.",
    highlights: [
      "Data-structures core kept fully independent of JavaFX, which makes it directly unit-testable (GraphALTest covers Dijkstra, BFS/DFS, components and MST).",
      "Layered architecture (domain / graph / index / repo / service / persistence / auth / ui) with a single service orchestrating the graph, a TreeMap/TreeSet index and the weight strategy.",
      "Concrete algorithmic improvements over the original: O(1) vertex search, Dijkstra without O(n) queue removal, and passwords hashed with salt instead of stored in plain text.",
    ],
    repoUrl: "https://github.com/Miguelmml16/Gestion-de-Aeropuertos",
    image: "/projects/aeropuertos.svg",
    imageAlt: "Airport graph management project cover",
  },
  {
    slug: "bibliored",
    name: "BiblioRed",
    featured: false,
    category: ["Backend", "Full Stack"],
    tagline: "Django library-management system with full CRUD and reporting.",
    problem:
      "Community libraries need to track their catalog, members and loans in one place. BiblioRed provides a complete web system to manage all three.",
    description:
      "A Django web application for managing community libraries, organized into three modules — catalog, members and loans — plus a reports dashboard, authentication and full CRUD. Built for a Web & Mobile Application Development course, with a Bootstrap 5 interface and a clean SQLite → MySQL migration path.",
    features: [
      "Three Django apps: catalog (categories, authors, books, copies), members and loans",
      "Full CRUD across every entity plus a login-protected reports dashboard",
      "Automatic business rule: registering a loan marks the copy as borrowed and computes the +15-day due date; a return flips it back to available",
      "Authentication and Django admin panel",
      "Configurable persistence — starts on SQLite, migrates to MySQL by switching the settings block",
    ],
    tech: ["Python", "Django", "Bootstrap 5", "SQLite", "MySQL"],
    role:
      "Author. Modeled the domain, implemented the CRUD modules and the loan/return business logic in the model layer.",
    highlights: [
      "Loan lifecycle handled directly in the model's save() method (no signals), as required by the assignment.",
      "Clear separation into focused apps, each owning its own models.",
      "Database-agnostic design with a documented migration to MySQL.",
    ],
    repoUrl: "https://github.com/Miguelmml16/BIblioRed",
    image: "/projects/bibliored.svg",
    imageAlt: "BiblioRed library system project cover",
  },
];

export const projectCategories: ProjectCategory[] = [
  "AI",
  "Full Stack",
  "Backend",
  "Frontend",
  "Java",
  "Data Structures",
];
