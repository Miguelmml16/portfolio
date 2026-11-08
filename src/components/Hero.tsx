"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Github, Instagram, Linkedin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { RichText } from "@/components/ui/RichText";
import { site } from "@/data/site";
import { useT } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  };
}

const iconLink =
  "grid h-11 w-11 place-items-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg";

export default function Hero() {
  const t = useT().hero;

  return (
    <section
      id="home"
      className="container-page grid grid-cols-1 items-center gap-12 pb-20 pt-28 md:pt-36 lg:min-h-[92svh] lg:grid-cols-12 lg:gap-8"
    >
      <div className="lg:col-span-7">
        <motion.p {...rise(0)} className="label flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg/40" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fg" />
          </span>
          {t.status}
        </motion.p>

        <motion.h1 {...rise(0.08)} className="display mt-6 text-display text-fg">
          <span className="block text-[0.32em] tracking-[-0.01em] text-muted">{t.greeting}</span>
          Miguel
          <br />
          Medina.
        </motion.h1>

        <motion.p {...rise(0.16)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          <RichText parts={t.intro} />
        </motion.p>

        <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href="#contact">
            {t.contactMe}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </ButtonLink>
          <ButtonLink href={site.links.cv} variant="outline" external>
            {t.downloadCV}
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </ButtonLink>
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
            <Github className="h-4 w-4" />
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={iconLink}>
            <Instagram className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      <motion.div {...rise(0.2)} className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
        <div className="relative aspect-[4/5] overflow-hidden bg-line">
          {/* object-left crops the carousel arrow on the photo's right edge */}
          <Image
            src="/miguel.png"
            alt={t.photoAlt}
            fill
            priority
            sizes="(max-width: 1024px) 384px, 40vw"
            className="object-cover object-left grayscale transition-[filter] duration-700 hover:grayscale-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
