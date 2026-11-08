import type { Lang } from "@/lib/i18n";
import type { Dictionary } from "./types";
import { en } from "./en";
import { es } from "./es";

const dictionaries: Record<Lang, Dictionary> = { en, es };

export function getTranslation(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary, Rich } from "./types";
