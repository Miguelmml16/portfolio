"use client";

import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="container-page pb-10">
      <div className="flex flex-col gap-4 border-t border-line pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">
          {t.footer.rights(year)} <span className="mx-2 text-subtle">/</span> {site.location}
        </p>
        <a href="#home" className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg">
          {t.footer.backToTop}
          <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
