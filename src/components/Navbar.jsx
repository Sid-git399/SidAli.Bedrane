import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { personal, sections, socials } from "../data";
import { ease, Magnetic } from "./ui";

const links = Object.entries(sections)
  .filter(([, s]) => s.enabled)
  .map(([id, s]) => ({ id, label: s.label }));

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 300 && !open);
    setScrolled(y > 40);
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["home", ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 md:px-8"
        animate={{ y: hidden ? "-120%" : 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-6 ${
            scrolled ? "glass shadow-2xl shadow-black/40" : "border border-transparent"
          }`}
        >
          <Magnetic>
            <a href="#home" className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight text-white">
              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary text-sm text-black">
                <span className="relative z-10">{personal.logo.slice(0, 1)}</span>
                <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 group-hover:translate-y-0" />
              </span>
              <span className="hidden sm:inline">
                {personal.logo}
                <span className="text-gradient">.</span>
              </span>
            </a>
          </Magnetic>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    active === l.id ? "text-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {personal.availableForWork && (
              <span className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300 md:flex">
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to work
              </span>
            )}
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative z-[95] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-white/5 lg:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-0.5 w-5 bg-white"
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block h-0.5 w-5 bg-white"
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col justify-between bg-bg/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 44px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-display text-5xl font-bold text-white"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease }}
                  >
                    <span className="font-mono text-sm text-white/40">0{i + 1}</span>
                    <span className={active === l.id ? "text-gradient" : ""}>{l.label}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex h-12 w-12 items-center justify-center rounded-full text-xl text-white"
                  aria-label={s.name}
                >
                  <s.icon />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
