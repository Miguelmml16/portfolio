"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";
import { useLanguage, useT, type Lang } from "@/lib/i18n";
import { ThemeToggle } from "@/components/ThemeToggle";

// Sections observed for the active-link indicator (includes non-nav ones so
// the highlight clears when scrolling through them).
const OBSERVED = ["home", "projects", "experience", "skills", "contact"];

function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const t = useT();
  const options: Lang[] = ["en", "es"];

  return (
    <div role="group" aria-label={t.langToggle.ariaLabel} className={cn("label flex items-center", className)}>
      {options.map((option, i) => (
        <span key={option} className="flex items-center">
          {i > 0 && <span className="mx-1.5 text-subtle">/</span>}
          <button
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={lang === option}
            className={cn(
              "py-2 transition-colors",
              lang === option ? "text-fg" : "text-subtle hover:text-fg",
            )}
          >
            {option.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const t = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    OBSERVED.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <nav aria-label={t.nav.primary} className="container-page flex h-16 items-center justify-between">
        <a href="#home" className="text-sm font-bold uppercase tracking-tight text-fg">
          Miguel Medina
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href ? "location" : undefined}
                className={cn(
                  "link-draw py-1 text-sm transition-colors",
                  active === item.href ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {t.nav[item.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <LangSwitch className="hidden md:flex" />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="label -mr-2 px-2 py-3 text-fg md:hidden"
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </nav>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise become
          the containing block for this fixed overlay and clip it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg pt-16 md:hidden"
          >
            <ul className="container-page pt-8">
              {navItems.map((item, i) => (
                <li key={item.href} className="border-b border-line">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-baseline gap-4 py-4 text-4xl text-fg"
                  >
                    <span className="label">{String(i + 1).padStart(2, "0")}</span>
                    {t.nav[item.key]}
                  </a>
                </li>
              ))}
            </ul>
            <div className="container-page pb-10">
              <LangSwitch />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
