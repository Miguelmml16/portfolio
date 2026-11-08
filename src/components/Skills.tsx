"use client";

import { skillRows } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

/**
 * Two rows of skill pills scrolling in opposite directions. Each row renders
 * its list twice and slides by -50% for a seamless loop; hovering a row
 * pauses it and each pill inverts. With reduced motion the rows become a
 * static wrapped list.
 */
function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="group mask-fade-x overflow-hidden motion-reduce:[mask-image:none]">
      <ul
        className={cn(
          // Spacing via padding (not gap) so -50% lands exactly on the copy.
          "flex w-max group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "motion-reduce:container-page motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:gap-y-3",
        )}
      >
        {[...items, ...items].map((skill, i) => (
          <li
            key={`${skill}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className={cn("pr-3", i >= items.length && "motion-reduce:hidden")}
          >
            <span className="pill">{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  const t = useT();

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading index={t.skills.index} eyebrow={t.nav.skills} title={t.skills.title} />
      </div>
      <div className="space-y-3">
        {skillRows.map((row, i) => (
          <MarqueeRow key={i} items={row} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
