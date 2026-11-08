import type { Rich } from "@/data/i18n/types";

/** Renders dictionary text where { b } fragments are emphasized in ink. */
export function RichText({ parts }: { parts: Rich }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <strong key={i} className="font-semibold text-fg">
            {part.b}
          </strong>
        ),
      )}
    </>
  );
}
