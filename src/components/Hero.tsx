"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

const codeLines = [
  { t: "const miguel = {", c: "text-white/50" },
  { t: "  role: 'CS Student & Software Developer',", c: "text-crimson-400" },
  { t: "  focus: ['AI agents', 'backend', 'web'],", c: "text-white/80" },
  { t: "  stack: ['Python', 'TypeScript', 'Java'],", c: "text-white/80" },
  { t: "  based: 'Guayaquil, Ecuador',", c: "text-white/80" },
  { t: "  building: () => solveRealProblems(),", c: "text-emerald-300/80" },
  { t: "};", c: "text-white/50" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-crimson-700/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-crimson-900/25 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/40 to-ink-950" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson-500" />
            </span>
            Open to internships &amp; software projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Miguel Medina
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-3 text-xl font-medium text-gradient sm:text-2xl"
          >
            {site.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Computer Science student at ESPOL. I build software across the
            stack — AI agents, FastAPI/Django backends and data-driven
            interfaces — and I care about systems that stay honest about the
            data they show. Recently won the Agentic Scale 2026 hackathon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="#projects">
              View projects <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={site.links.cv} variant="outline" external>
              <Download className="h-4 w-4" /> Download CV
            </Button>
            <div className="flex items-center gap-1">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="rounded-xl border border-white/10 p-2.5 text-white/70 transition-colors hover:border-crimson-500/60 hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="rounded-xl border border-white/10 p-2.5 text-white/70 transition-colors hover:border-crimson-500/60 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/40"
          >
            <MapPin className="h-4 w-4" /> {site.location}
          </motion.p>
        </div>

        {/* Right: animated code card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className={reduce ? "" : "animate-float"}>
            <div className="card-surface overflow-hidden rounded-2xl shadow-2xl shadow-crimson-900/20">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-crimson-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
                <span className="ml-2 font-mono text-xs text-white/40">
                  miguel.ts
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
                <code>
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
                      className={line.c}
                    >
                      <span className="mr-4 select-none text-white/20">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {line.t}
                    </motion.div>
                  ))}
                </code>
              </pre>
            </div>
          </div>

          {/* Floating tech chips */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="absolute -left-4 top-10 hidden rounded-lg border border-white/10 bg-ink-800/90 px-3 py-1.5 font-mono text-xs text-crimson-400 shadow-lg sm:block"
          >
            LangGraph
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="absolute -right-3 bottom-14 hidden rounded-lg border border-white/10 bg-ink-800/90 px-3 py-1.5 font-mono text-xs text-white/80 shadow-lg sm:block"
          >
            FastAPI · Postgres
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
