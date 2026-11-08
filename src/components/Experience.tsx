"use client";

import { ArrowUpRight } from "lucide-react";
import { languageLevels, timeline } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n";

export default function Experience() {
  const t = useT();
  const e = t.experience;

  return (
    <section id="experience" className="container-page py-20 md:py-28">
      <SectionHeading index={e.index} eyebrow={t.nav.experience} title={e.title} />

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        <ol className="border-t border-line lg:col-span-7">
          {timeline.map((item, i) => {
            const copy = e.items[item.id];
            return (
              <Reveal as="li" key={item.id} delay={i * 0.05} className="border-b border-line py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold leading-snug text-fg">{copy.title}</h3>
                  <p className="label">{copy.period}</p>
                </div>
                <p className="mt-0.5 text-sm font-medium text-fg/70">{copy.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{copy.description}</p>
                {item.linkUrl && copy.linkLabel && (
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw mt-2 inline-flex items-center gap-1 text-sm text-fg"
                  >
                    {copy.linkLabel} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </Reveal>
            );
          })}
        </ol>

        <div className="space-y-10 lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.1}>
            <h3 className="label mb-4">{e.educationTitle}</h3>
            <div className="border border-line p-5">
              <p className="label text-fg">{e.education.period}</p>
              <p className="mt-2 text-lg font-bold leading-snug text-fg">{e.education.title}</p>
              <p className="mt-1 text-sm text-muted">{e.education.org}</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="label mb-4">{e.languagesTitle}</h3>
            <ul className="space-y-4 border border-line p-5">
              {e.languages.map((language, i) => (
                <li key={language.name}>
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="font-semibold text-fg">{language.name}</span>
                    <span className="text-muted">{language.level}</span>
                  </div>
                  <div className="mt-2 h-[3px] bg-line" aria-hidden="true">
                    <div className="h-full bg-fg" style={{ width: `${(languageLevels[i] ?? 0) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
