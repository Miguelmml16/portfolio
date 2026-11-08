import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { getTranslation } from "@/data/i18n";
import { LanguageProvider } from "@/lib/i18n";
import { parseLang, parseTheme } from "@/lib/utils";
import { MotionProvider } from "@/components/MotionProvider";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = parseLang(cookies().get("lang")?.value);
  const t = getTranslation(lang);
  const title = `${site.name} — ${t.hero.role}`;
  const description = t.hero.intro.map((part) => (typeof part === "string" ? part : part.b)).join("");

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${site.name}` },
    description,
    keywords: [
      "Miguel Medina",
      "aLata",
      "Computer Science",
      "Software Developer",
      "ESPOL",
      "Artificial Intelligence",
      "Full Stack",
      "Portfolio",
      "Guayaquil",
      "Ecuador",
    ],
    authors: [{ name: site.name, url: site.links.github }],
    creator: site.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_EC" : "en_US",
      url: site.url,
      title,
      description,
      siteName: site.name,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const lang = parseLang(cookieStore.get("lang")?.value);
  // Explicit choice only; without it CSS follows the OS preference.
  const theme = parseTheme(cookieStore.get("theme")?.value);

  return (
    <html lang={lang} data-theme={theme} className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-fg">
        <LanguageProvider initialLang={lang}>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
            >
              {getTranslation(lang).skipLink}
            </a>
            {children}
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
