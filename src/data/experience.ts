export interface TimelineItem {
  title: string;
  org: string;
  period: string;
  kind: "award" | "volunteer" | "project" | "education";
  description: string;
  tags?: string[];
  link?: { label: string; url: string };
}

// Dates left generic where they were not provided — do not invent specifics.
export const timeline: TimelineItem[] = [
  {
    title: "Winner — Agentic Scale 2026 Hackathon",
    org: "ESPOL · organized by TAWS",
    period: "2026",
    kind: "award",
    description:
      "Part of the winning team with Brokeate, a robo-advisory platform pairing a LangGraph AI agent with a human advisor and database-enforced anti-hallucination guardrails.",
    tags: ["AI", "FastAPI", "React Native", "PostgreSQL"],
    link: { label: "View project", url: "https://github.com/raydan90s/BROKEATE-APP" },
  },
  {
    title: "Student Volunteer",
    org: "IEEE ESPOL Student Branch — Computer Society",
    period: "2026 — Present",
    kind: "volunteer",
    description:
      "Volunteer in the IEEE ESPOL Computer Society student branch, taking part in the community's activities and events.",
    tags: ["Community", "IEEE"],
  },
  {
    title: "Airport Management — Graph Algorithms",
    org: "Data Structures course · ESPOL",
    period: "Academic project",
    kind: "project",
    description:
      "Java 21 + JavaFX application implementing and visualizing BFS, DFS, Dijkstra, connected components and MST over a directed graph, with a JUnit 5 test suite.",
    tags: ["Java", "JavaFX", "Data Structures"],
    link: {
      label: "View repository",
      url: "https://github.com/Miguelmml16/Gestion-de-Aeropuertos",
    },
  },
  {
    title: "BiblioRed — Library Management System",
    org: "Web & Mobile App Development course · ESPOL",
    period: "Academic project",
    kind: "project",
    description:
      "Django system to manage a community library's catalog, members and loans, with a reports dashboard, authentication and full CRUD.",
    tags: ["Django", "Python", "MySQL"],
    link: { label: "View repository", url: "https://github.com/Miguelmml16/BIblioRed" },
  },
  {
    title: "B.Sc. Computer Science (in progress)",
    org: "ESPOL — Escuela Superior Politécnica del Litoral",
    period: "Guayaquil, Ecuador",
    kind: "education",
    description:
      "Studying software development, artificial intelligence, data structures, databases and software engineering.",
    tags: ["Computer Science"],
  },
];
