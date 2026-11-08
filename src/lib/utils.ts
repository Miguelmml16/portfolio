/** Tiny classnames helper — joins truthy class strings. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Reads the language cookie value into a supported Lang. */
export function parseLang(value: string | undefined): "en" | "es" {
  return value === "es" ? "es" : "en";
}

export type Theme = "light" | "dark";

/** Reads the theme cookie; undefined means "follow the OS". */
export function parseTheme(value: string | undefined): Theme | undefined {
  return value === "light" || value === "dark" ? value : undefined;
}
