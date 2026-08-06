# Miguel Medina — Personal Portfolio

A modern, dark-themed portfolio for **Miguel Medina**, Computer Science student at
ESPOL (Guayaquil, Ecuador) and software developer. Built to present real projects to
recruiters, tech companies and internship programs.

Live sections: Hero, About, Projects (with category filters and detail modals),
Skills, Experience timeline, live GitHub activity, and a working contact form.

---

## Tech stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript** (strict, no implicit `any`)
- **Tailwind CSS** for styling + a small design-token layer
- **Framer Motion** for subtle, `prefers-reduced-motion`-aware animations
- **Lucide React** icons
- **Resend** (optional) for the contact form email delivery
- Deploy target: **Vercel**

## Highlights

- Fully responsive (mobile, tablet, desktop) with a sticky, adaptive navbar
- Accessible: semantic landmarks, skip link, focus-visible rings, `aria-*`, keyboard-closable modal
- SEO-ready: metadata, canonical URL, Open Graph (auto-generated), `sitemap.xml`, `robots.txt`, favicon
- Live GitHub section that reads the public GitHub API and degrades gracefully offline
- Contact form with client + server validation, loading / success / error states, and a honeypot
- No secrets in the client; all keys live in server-side environment variables

---

## Project structure

```
portfolio/
├── public/
│   ├── miguel.png                # profile photo (replace as you like)
│   ├── cv/                       # put Miguel-Medina-CV.pdf here
│   └── projects/                 # project cover images (SVG placeholders included)
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts  # contact form endpoint (server-side)
│   │   ├── globals.css
│   │   ├── icon.svg              # favicon
│   │   ├── layout.tsx            # metadata, fonts, <html> shell
│   │   ├── opengraph-image.tsx   # auto-generated OG image
│   │   ├── page.tsx              # composes all sections
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── ui/                   # Button, Badge, SectionHeading
│   │   ├── Navbar.tsx  Hero.tsx  About.tsx
│   │   ├── Projects.tsx  ProjectCard.tsx  ProjectModal.tsx
│   │   ├── Skills.tsx  Experience.tsx  GitHubActivity.tsx
│   │   └── Contact.tsx  Footer.tsx
│   ├── data/                     # content lives here — edit these to update the site
│   │   ├── site.ts  projects.ts  skills.ts  experience.ts
│   └── lib/utils.ts
├── .env.example
├── tailwind.config.ts
└── next.config.mjs
```

All copy and data are centralized in `src/data/*`. To update projects, skills or the
timeline, edit those files — no component changes needed.

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

Copy `.env.example` to `.env.local`. All are optional and the app degrades gracefully.

| Variable                        | Required | Purpose                                                                 |
| ------------------------------- | -------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | No       | Canonical URL used in metadata / sitemap.                               |
| `NEXT_PUBLIC_GITHUB_USERNAME`   | No       | GitHub username for the activity section (defaults to `Miguelmml16`).   |
| `GITHUB_TOKEN`                  | No       | Server-side PAT to raise GitHub API rate limits (60 → 5000 req/h).      |
| `RESEND_API_KEY`                | No       | Enables the contact form to send email via Resend.                      |
| `CONTACT_TO_EMAIL`              | No       | Address that receives contact messages.                                 |
| `CONTACT_FROM_EMAIL`            | No       | Verified Resend sender (e.g. `onboarding@resend.dev` while testing).    |

> Without `RESEND_API_KEY` / `CONTACT_TO_EMAIL`, the contact form returns a clear
> "not configured yet" message instead of crashing.

### Enabling the contact form

1. Create a free account at [resend.com](https://resend.com) and generate an API key.
2. Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` to `.env.local` (and to Vercel).
3. For a custom `CONTACT_FROM_EMAIL`, verify your domain in Resend; otherwise keep
   `onboarding@resend.dev` for testing.

---

## Personalize it

- **Photo** — replace `public/miguel.png`.
- **CV** — add `public/cv/Miguel-Medina-CV.pdf` (see the `[Add CV file]` markers).
- **Projects** — edit `src/data/projects.ts`. Set `demoUrl` only when a demo exists,
  and add screenshots to `public/projects/` then point `image` at them.
- **Skills / Experience** — edit `src/data/skills.ts` and `src/data/experience.ts`.
  Replace any `[Add dates]` placeholders with your real timeline.
- **Colors / fonts** — tweak `tailwind.config.ts` and the fonts in `src/app/layout.tsx`.

Search the codebase for `[Add ...]` to find every intentional placeholder.

---

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the repository.
3. Vercel auto-detects Next.js — keep the defaults (Build: `next build`, Output: `.next`).
4. Under **Settings → Environment Variables**, add any variables you use
   (`NEXT_PUBLIC_SITE_URL`, `GITHUB_TOKEN`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, …).
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

## License

MIT — feel free to reuse the structure. Please replace the personal content with your own.
```
