"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Github, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n";

const COPIED_MS = 2000;

export default function Contact() {
  const c = useT().contact;
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      // Clipboard blocked (permissions / insecure context): open the mail client instead.
      window.location.href = site.links.email;
    }
  }

  const channels = [
    { label: c.channels.github, href: site.links.github, icon: Github },
    { label: c.channels.linkedin, href: site.links.linkedin, icon: Linkedin },
    { label: c.channels.instagram, href: site.links.instagram, icon: Instagram },
    { label: c.channels.whatsapp, href: site.links.whatsapp, icon: MessageCircle },
  ];

  return (
    <section id="contact" className="container-page pb-16 pt-24 md:pt-32">
      <Reveal>
        <p className="label">{c.eyebrow}</p>
        <h2 className="display mt-4 text-display text-fg">{c.title}</h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-14 flex flex-col gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <a href={site.links.email} className="link-draw break-words text-[clamp(1.1rem,5.2vw,2.25rem)] font-bold tracking-tight text-fg">
          {site.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="pill shrink-0 self-start sm:self-auto"
          aria-live="polite"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? c.copied : c.copy}
        </button>
      </Reveal>

      <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
        {channels.map(({ label, href, icon: Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="pill">
            <Icon className="h-4 w-4" />
            {label}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ))}
        <a href={site.links.cv} target="_blank" rel="noopener noreferrer" className="pill">
          <Download className="h-4 w-4" />
          {c.channels.cv}
        </a>
      </Reveal>
    </section>
  );
}
