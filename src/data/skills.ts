export type SkillLevel = "Main tools" | "Familiar with" | "Currently learning";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

// Only technologies that appear in the repositories or in the provided
// information. No arbitrary percentages — skills are grouped by how
// confidently they are used.
export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python", level: "Main tools" },
      { name: "TypeScript", level: "Main tools" },
      { name: "Java", level: "Main tools" },
      { name: "JavaScript", level: "Main tools" },
      { name: "SQL", level: "Familiar with" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", level: "Main tools" },
      { name: "React Native / Expo", level: "Familiar with" },
      { name: "Vite", level: "Familiar with" },
      { name: "Tailwind / NativeWind", level: "Familiar with" },
      { name: "Bootstrap 5", level: "Familiar with" },
      { name: "JavaFX", level: "Familiar with" },
      { name: "Next.js", level: "Currently learning" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "FastAPI", level: "Main tools" },
      { name: "Django", level: "Familiar with" },
      { name: "REST APIs", level: "Main tools" },
      { name: "JWT auth", level: "Familiar with" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", level: "Main tools" },
      { name: "Supabase", level: "Familiar with" },
      { name: "MySQL", level: "Familiar with" },
      { name: "SQLite", level: "Familiar with" },
    ],
  },
  {
    category: "AI",
    skills: [
      { name: "LangGraph", level: "Familiar with" },
      { name: "LLM integration (Gemini / OpenAI / Anthropic)", level: "Familiar with" },
      { name: "Prompt design & guardrails", level: "Familiar with" },
    ],
  },
  {
    category: "Testing",
    skills: [
      { name: "pytest", level: "Familiar with" },
      { name: "JUnit 5", level: "Familiar with" },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git & GitHub", level: "Main tools" },
      { name: "Maven", level: "Familiar with" },
      { name: "Vercel", level: "Familiar with" },
      { name: "AWS", level: "Currently learning" },
      { name: "Twilio", level: "Familiar with" },
    ],
  },
];
