import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { personal, sections, theme } from "./data";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const registry = { about: About, services: Services, skills: Skills, experience: Experience, projects: Projects, testimonials: Testimonials, contact: Contact };

export default function App() {
  const [loading, setLoading] = useState(theme.showPreloader);
  const done = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--primary", theme.primary);
    root.setProperty("--secondary", theme.secondary);
    root.setProperty("--tertiary", theme.tertiary);
    root.setProperty("--bg", theme.background);
    document.title = `${personal.firstName} ${personal.lastName} — ${personal.title}`;
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  const enabled = Object.entries(sections).filter(([id, s]) => s.enabled && registry[id]);

  return (
    <div className="noise relative overflow-x-clip">
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      {theme.showCustomCursor && <Cursor />}
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        {enabled.map(([id], i) => {
          const Section = registry[id];
          return <Section key={id} index={i + 1} />;
        })}
      </main>
      <Footer />
    </div>
  );
}
