import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import GitHubActivity from "@/components/GitHubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Lang } from "@/lib/i18n";

export default async function HomePage() {
  const cookieStore = await cookies();
  const lang: Lang = cookieStore.get("lang")?.value === "es" ? "es" : "en";

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <GitHubActivity lang={lang} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
