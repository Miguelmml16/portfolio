import { Reveal } from "@/components/ui/Reveal";

/**
 * Section header on a 12-column grid: index + eyebrow in the left rail,
 * heavy uppercase title (and optional one-line intro) in the main column.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-10 grid grid-cols-1 gap-y-4 border-t border-line pt-6 md:mb-14 md:grid-cols-12 md:gap-x-8">
      <p className="label md:col-span-3">
        <span className="text-fg">{index}</span>
        <span className="mx-2 text-subtle">/</span>
        {eyebrow}
      </p>
      <div className="md:col-span-9">
        <h2 className="display text-title text-fg">{title}</h2>
        {description && <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{description}</p>}
      </div>
    </Reveal>
  );
}
