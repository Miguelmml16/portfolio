"use client";

import { motion } from "framer-motion";
import { CircleDot, Sparkle, Wrench } from "lucide-react";
import { skillGroups, type SkillLevel } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { getTranslation } from "@/data/translations";

const legendIcons: { level: SkillLevel; icon: typeof Wrench; className: string }[] = [
  { level: "Main tools", icon: Wrench, className: "text-crimson-400" },
  { level: "Familiar with", icon: CircleDot, className: "text-white/70" },
  { level: "Currently learning", icon: Sparkle, className: "text-emerald-300/80" },
];

const levelStyles: Record<SkillLevel, string> = {
  "Main tools": "border-crimson-700/50 bg-crimson-900/25 text-crimson-300",
  "Familiar with": "border-white/10 bg-white/5 text-white/75",
  "Currently learning": "border-emerald-500/25 bg-emerald-500/10 text-emerald-200/90",
};

export default function Skills() {
  const { lang } = useLanguage();
  const t = getTranslation(lang).skills;
  const levelLabels: Record<SkillLevel, string> = {
    "Main tools": t.legend.main,
    "Familiar with": t.legend.familiar,
    "Currently learning": t.legend.learning,
  };

  return (
    <section id="skills" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        {/* Legend */}
        <div className="mb-8 flex flex-wrap gap-4">
          {legendIcons.map((l) => (
            <span
              key={l.level}
              className="inline-flex items-center gap-1.5 text-sm text-white/60"
            >
              <l.icon className={cn("h-4 w-4", l.className)} />
              {levelLabels[l.level]}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="card-surface rounded-2xl p-5"
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t.categories[group.category] ?? group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <li key={s.name}>
                    <span
                      title={levelLabels[s.level]}
                      className={cn(
                        "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium",
                        levelStyles[s.level],
                      )}
                    >
                      {s.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
