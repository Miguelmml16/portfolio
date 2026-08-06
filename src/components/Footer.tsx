import { Github, Heart, Linkedin, Mail } from "lucide-react";
import { site, navItems } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <a
              href="#home"
              className="flex items-center gap-2 font-mono text-lg font-bold text-white"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-crimson-600 text-white">
                M
              </span>
              Miguel Medina
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Computer Science student at ESPOL, building software that solves
              real problems — from AI agents to solid backends.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-2">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-xl border border-white/10 p-2.5 text-white/70 transition-colors hover:border-crimson-500/60 hover:text-white"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-xl border border-white/10 p-2.5 text-white/70 transition-colors hover:border-crimson-500/60 hover:text-white"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={site.links.email}
              aria-label="Email"
              className="rounded-xl border border-white/10 p-2.5 text-white/70 transition-colors hover:border-crimson-500/60 hover:text-white"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {year} Miguel Medina. Built to keep shipping real, useful
            software.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-crimson-500" /> using
            Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
