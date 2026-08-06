"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  ExternalLink,
  FolderGit2,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import { timeline, type TimelineItem } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

const kindIcon: Record<TimelineItem["kind"], typeof Award> = {
  award: Award,
  volunteer: HeartHandshake,
  project: FolderGit2,
  education: GraduationCap,
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Achievements & involvement"
          description="Hackathon wins, community work and the academic projects behind the skills above."
        />

        <ol className="relative border-l border-white/10">
          {timeline.map((item, i) => {
            const Icon = kindIcon[item.kind];
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="mb-9 ml-6 last:mb-0"
              >
                <span className="absolute -left-[13px] grid h-6 w-6 place-items-center rounded-full border border-crimson-700/50 bg-ink-900 text-crimson-400">
                  <Icon className="h-3.5 w-3.5" />
                </span>

                <div className="card-surface rounded-xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs text-white/40">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-crimson-400">{item.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {item.description}
                  </p>

                  {item.tags && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-white/55"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.link && (
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-crimson-400 transition-colors hover:text-crimson-300"
                    >
                      {item.link.label} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>

        <p className="mt-8 flex items-center gap-2 text-xs text-white/30">
          <BookOpen className="h-4 w-4" />
          Dates marked [Add dates] are placeholders — fill them in with your real
          timeline.
        </p>
      </div>
    </section>
  );
}
