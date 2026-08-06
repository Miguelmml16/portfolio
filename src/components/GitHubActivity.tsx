import { ArrowUpRight, GitFork, Github, Star } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Server component. Fetches public GitHub data at build/request time.
 * - Works without a token (60 req/h). Set GITHUB_TOKEN to raise the limit.
 * - Degrades gracefully: if the API is unreachable, it still renders the
 *   curated highlights below and a link to the full profile.
 */

interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

// Curated fallback so the section is never empty, even offline.
const featuredRepos: { name: string; url: string; description: string; language: string }[] =
  [
    {
      name: "BROKEATE-BACKEND",
      url: "https://github.com/raydan90s/BROKEATE-BACKEND",
      description:
        "Robo-advisory API — FastAPI + Postgres + a LangGraph agent with anti-hallucination guardrails.",
      language: "Python",
    },
    {
      name: "Gestion-de-Aeropuertos",
      url: "https://github.com/Miguelmml16/Gestion-de-Aeropuertos",
      description:
        "Java + JavaFX app that visualizes graph algorithms over airports and flight routes.",
      language: "Java",
    },
    {
      name: "BIblioRed",
      url: "https://github.com/Miguelmml16/BIblioRed",
      description:
        "Django library-management system: catalog, members, loans and reporting.",
      language: "Python",
    },
  ];

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  Java: "#b07219",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

async function getRepos(): Promise<Repo[] | null> {
  const username = site.githubUsername;
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // Revalidate once a day.
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!res.ok) return null;
    return (await res.json()) as Repo[];
  } catch {
    return null;
  }
}

export default async function GitHubActivity() {
  const repos = await getRepos();

  // Top languages by repo count (public, non-forked).
  const langCount: Record<string, number> = {};
  let publicRepos = 0;
  if (repos) {
    repos
      .filter((r) => !r.fork)
      .forEach((r) => {
        publicRepos += 1;
        if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1;
      });
  }
  const topLanguages = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <section id="github" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Activity"
          title="On GitHub"
          description="Public repositories, most-used languages and a few highlights. Data comes straight from the GitHub API."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Stats + languages */}
          <div className="card-surface flex flex-col rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Github className="h-6 w-6 text-crimson-500" />
              <div>
                <p className="font-mono text-sm text-white/50">
                  @{site.githubUsername}
                </p>
                {repos && (
                  <p className="text-sm text-white/70">
                    {publicRepos} public repositories
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
                Most used languages
              </h3>
              {topLanguages.length > 0 ? (
                <ul className="space-y-2">
                  {topLanguages.map(([lang, count]) => (
                    <li key={lang} className="flex items-center gap-2 text-sm">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: languageColors[lang] ?? "#888" }}
                      />
                      <span className="text-white/80">{lang}</span>
                      <span className="ml-auto font-mono text-xs text-white/40">
                        {count}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-white/40">
                  Live language data will appear once deployed. Highlights are
                  shown alongside.
                </p>
              )}
            </div>

            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-crimson-400 transition-colors hover:text-crimson-300"
            >
              Visit full profile <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Highlighted repos */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            {featuredRepos.map((r) => {
              const live = repos?.find((x) => x.name === r.name);
              return (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-surface group flex flex-col rounded-2xl p-5 transition-colors hover:border-crimson-500/40"
                >
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-white/50" />
                    <span className="font-mono text-sm font-medium text-white group-hover:text-crimson-300">
                      {r.name}
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-white/30 transition-colors group-hover:text-crimson-400" />
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                    {live?.description ?? r.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-white/50">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            languageColors[live?.language ?? r.language] ?? "#888",
                        }}
                      />
                      {live?.language ?? r.language}
                    </span>
                    {live && (
                      <>
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" /> {live.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5" /> {live.forks_count}
                        </span>
                      </>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
