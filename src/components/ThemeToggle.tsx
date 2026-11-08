"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { Theme } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function currentTheme(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Switches between paper (light) and ink (night) palettes. */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useT().theme;
  // null until mounted: the server can't know the OS preference.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => setTheme(currentTheme()), []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.cookie = `theme=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    setTheme(next);
  }

  const label = theme === "dark" ? t.toLight : t.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={className ?? "grid h-9 w-9 place-items-center rounded-full border border-line text-fg transition-colors hover:border-fg"}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
