"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Brain, Code2, Database, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const facts = [
  {
    icon: Code2,
    title: "Full-stack builder",
    body: "From React Native and React front-ends to FastAPI and Django back-ends.",
  },
  {
    icon: Brain,
    title: "AI-focused",
    body: "Conversational agents with LangGraph and strict anti-hallucination guardrails.",
  },
  {
    icon: Database,
    title: "Data at the core",
    body: "PostgreSQL, Supabase and MySQL — business rules enforced in the database.",
  },
  {
    icon: GraduationCap,
    title: "Strong CS fundamentals",
    body: "Graphs, algorithms and data structures implemented and tested from scratch.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="About" title="Who I am" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              {/* Replace /public/miguel.png with your preferred photo if needed */}
              <Image
                src="/miguel.png"
                alt="Miguel Medina"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-crimson-700/40" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-4 text-base leading-relaxed text-white/70">
              <p>
                I&apos;m a Computer Science student at ESPOL in Guayaquil,
                Ecuador. I like taking a problem from a rough idea all the way to
                a working product — designing the data model, building the API,
                and putting a clean interface on top.
              </p>
              <p>
                My recent work sits at the intersection of AI and solid backend
                engineering. In{" "}
                <span className="text-white">Brokeate</span>, the project my team
                won the Agentic Scale 2026 hackathon with, we built a
                robo-advisor where a LangGraph agent explains investment
                proposals but is never allowed to invent a number: every figure
                is computed in Postgres and validated against a closed context
                before it reaches the user.
              </p>
              <p>
                I also enjoy the fundamentals — implementing graph algorithms
                (Dijkstra, Kosaraju, Kruskal) in Java and visualizing them, or
                modeling a full library system in Django. I&apos;m keen to keep
                learning, contribute to real projects, and grow through
                internships and hands-on collaboration.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {facts.map((f) => (
                <div
                  key={f.title}
                  className="card-surface rounded-xl p-4 transition-colors hover:border-crimson-500/40"
                >
                  <f.icon className="mb-2 h-5 w-5 text-crimson-500" />
                  <h3 className="text-sm font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/55">{f.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
