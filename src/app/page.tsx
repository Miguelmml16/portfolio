import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GalaxyBackground from "@/components/GalaxyBackground";
import DaySkyBackground from "@/components/DaySkyBackground";

export default function HomePage() {
  return (
    <>
      {/* Skies: dusk by day, galaxy at night (each hidden in the other mode via CSS). */}
      <DaySkyBackground />
      <GalaxyBackground />
      <Navbar />
      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        {/* Inverted block in day mode; transparent over the sky at night. */}
        <div className="theme-ink text-fg">
          <Contact />
        </div>
      </main>
      <div className="theme-ink text-fg">
        <Footer />
      </div>
    </>
  );
}
