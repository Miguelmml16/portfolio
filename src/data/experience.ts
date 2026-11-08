// Structural timeline data only. Titles, periods and descriptions live in
// src/data/i18n/{en,es}.ts keyed by `id`, so reordering can't mismatch them.
// Academic projects live in the Work section, not here.

export type TimelineId = "alata" | "agentic-scale" | "ieee";

export interface TimelineItem {
  id: TimelineId;
  linkUrl?: string;
}

export const timeline: TimelineItem[] = [
  { id: "alata", linkUrl: "https://alata-ec.com" },
  { id: "agentic-scale", linkUrl: "https://www.instagram.com/p/DcGjKz5lrTw/" },
  { id: "ieee" },
];

/** Language proficiency as a 0–1 bar, labels in the dictionaries. */
export const languageLevels = [1, 0.7, 0.25] as const;
