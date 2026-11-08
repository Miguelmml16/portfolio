# Miguel Medina — Personal Portfolio

A minimal, monochrome (black · white · gray) editorial portfolio for **Miguel Medina**,
Computer Science student at ESPOL (Guayaquil, Ecuador) and software developer. Built to
present real projects to recruiters, tech companies and internship programs.

Sections: Hero (short intro + photo), Work (detail side sheet per project), Experience
with education and languages, a scrolling skills marquee, and Contact — in English and
Spanish, with a day / night toggle.

---

## Tech stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript** (strict, no implicit `any`)
- **Tailwind CSS** with CSS-variable color tokens (`bg`, `fg`, `muted`, `subtle`, `line`);
  night mode swaps the variables, and the `theme-ink` class always shows the opposite palette
- **Schibsted Grotesk / IBM Plex Mono** via `next/font`
- **Framer Motion** for subtle, `prefers-reduced-motion`-aware animations
- **Lucide React** icons
- Deploy target: **Vercel**

## Highlights

- Fully responsive (mobile, tablet, desktop) with a sticky, adaptive navbar
- Accessible: semantic landmarks, skip link, focus-visible rings, `aria-*`, keyboard-closable modal
- SEO-ready: metadata, canonical URL, Open Graph (auto-generated), `sitemap.xml`, `robots.txt`, favicon
- Day / night mode: follows the OS by default; an explicit choice is stored in a cookie
  and applied server-side, so there is no flash of the wrong theme
- Contact: email with one-click copy, plus GitHub, LinkedIn, WhatsApp and CV

---

## Project structure

```
portfolio/
├── public/
│   ├── miguel.png                # profile photo (shown in grayscale)
│   └── cv/Miguel-Medina-CV.pdf   # "Download CV" target
├── src/
│   ├── app/
│   │   ├── globals.css           # palette (day / night / theme-ink)
│   │   ├── icon.svg              # favicon
│   │   ├── layout.tsx            # metadata, fonts, <html> shell
│   │   ├── opengraph-image.tsx   # auto-generated OG image
│   │   ├── page.tsx              # composes all sections
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── ui/                   # ButtonLink, Reveal, RichText, SectionHeading
│   │   ├── Navbar.tsx  ThemeToggle.tsx  Hero.tsx
│   │   ├── Projects.tsx  ProjectRow.tsx  ProjectLinks.tsx  ProjectModal.tsx
│   │   ├── Experience.tsx  Skills.tsx  Contact.tsx  Footer.tsx
│   │   └── MotionProvider.tsx
│   ├── data/
│   │   ├── site.ts  projects.ts  skills.ts  experience.ts   # structure: links, tech, order
│   │   └── i18n/                 # all visible copy: en.ts, es.ts (+ types.ts)
│   └── lib/                      # i18n context (useT), utils
├── .env.example
├── tailwind.config.ts
└── next.config.mjs
```

Content is split in two layers:

- **Structure** (`src/data/*.ts`): project slugs, tech stacks, repo/demo links, timeline order.
- **Copy** (`src/data/i18n/en.ts` and `es.ts`): every visible text, keyed by project slug
  or timeline id. `types.ts` makes the build fail if the Spanish dictionary misses a key.

---

## Getting started

Requirements: **Node.js 18.17+** (or 20+) and npm.

```bash
# 1. Install dependencies
npm install

# 2. (Optional) set up environment variables
cp .env.example .env.local
# then edit .env.local — every variable is optional; the site runs without them

# 3. Start the dev server
npm run dev
```

Open <http://localhost:3000>.

### Useful scripts

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the development server          |
| `npm run build`     | Production build                      |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | Run ESLint (next/core-web-vitals)     |
| `npm run typecheck` | Type-check with `tsc --noEmit`        |

---

## Environment variables

Copy `.env.example` to `.env.local`. The only variable is optional:

| Variable               | Required | Purpose                                                      |
| ---------------------- | -------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | No       | Canonical URL used in metadata, sitemap and Open Graph image. |

---

## Personalize it

- **Photo** — replace `public/miguel.png` (shown in grayscale, cropped from the left at 4:5).
- **CV** — replace `public/cv/Miguel-Medina-CV.pdf`.
- **Projects** — add the entry in `src/data/projects.ts` (set `demoUrl` only when a demo
  exists) and its text under `projects.items` in both `i18n/en.ts` and `i18n/es.ts`.
- **Skills / Experience** — `src/data/skills.ts`; timeline entries in
  `src/data/experience.ts` with their text under `experience.items` in both dictionaries.
- **Colors / fonts** — the palette is in `src/app/globals.css` (`:root` and `.theme-ink`),
  fonts in `src/app/layout.tsx`.

---

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the repository.
3. Vercel auto-detects Next.js — keep the defaults (Build: `next build`, Output: `.next`).
4. Under **Settings → Environment Variables**, add any variables you use
   (`NEXT_PUBLIC_SITE_URL`).
5. Click **Deploy**. Every push to the main branch redeploys automatically.

CLI alternative:

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

After deploying, set `NEXT_PUBLIC_SITE_URL` to your final domain so metadata,
`sitemap.xml` and the Open Graph image use the correct absolute URLs.

---

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (CSS + Framer Motion).
- Uses `next/image` for optimized, responsive images.
- Keyboard-accessible navigation, modal (Esc to close) and focus-visible styles.
- Minimal dependencies to keep bundles small.

---

## Credits

- Moon surface: LRO albedo map from NASA SVS CGI Moon Kit (public domain), in `public/textures/moon-albedo.jpg`.

## License

MIT — feel free to reuse the structure. Please replace the personal content with your own.
```
