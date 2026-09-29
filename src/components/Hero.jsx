import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FiArrowDownRight, FiDownload, FiMapPin } from "react-icons/fi";
import { personal, socials, techMarquee, theme } from "../data";
import ParticleNetwork from "./ParticleNetwork";
import { ease, FancyButton, Magnetic, TiltCard } from "./ui";

function RotatingRoles({ roles }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, [roles.length]);
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="text-gradient inline-block whitespace-nowrap"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function AnimatedName({ text, delay }) {
  return (
    <span className="block overflow-hidden">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "115%", rotateX: -90, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{ duration: 1, delay: delay + i * 0.045, ease }}
          whileHover={{ y: -12, color: "var(--secondary)", transition: { duration: 0.2 } }}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </span>
  );
}

function Avatar() {
  const orbit = techMarquee.slice(0, 8);
  const initials = `${personal.firstName[0] ?? ""}${personal.lastName[0] ?? ""}`;
  return (
    <div className="relative mx-auto aspect-square w-[280px] sm:w-[340px] lg:w-[420px]" style={{ containerType: "inline-size" }}>
      {/* orbit rings */}
      <div className="absolute inset-0 rounded-full border border-white/5" />
      <div className="absolute inset-[12%] rounded-full border border-dashed border-white/10" />
      <div className="animate-orbit absolute inset-0" style={{ "--duration": "40s" }}>
        {orbit.slice(0, 4).map((t, i) => {
          const a = (i / 4) * Math.PI * 2;
          return (
            <div
              key={t.name}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(-50%, -50%) translate(${Math.cos(a) * 50}cqw, ${Math.sin(a) * 50}cqw)` }}
            >
              <div className="animate-orbit-rev" style={{ "--duration": "40s" }}>
                <div className="glass flex h-11 w-11 items-center justify-center rounded-2xl text-xl text-white shadow-lg shadow-primary/20 md:h-14 md:w-14 md:text-2xl" title={t.name}>
                  <t.icon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="animate-orbit-rev absolute inset-[12%]" style={{ "--duration": "28s" }}>
        {orbit.slice(4, 8).map((t, i) => {
          const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
          return (
            <div
              key={t.name}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(-50%, -50%) translate(${Math.cos(a) * 38}cqw, ${Math.sin(a) * 38}cqw)` }}
            >
              <div className="animate-orbit" style={{ "--duration": "28s" }}>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-lg text-white/80 backdrop-blur md:h-11 md:w-11" title={t.name}>
                  <t.icon />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* core */}
      <TiltCard className="absolute inset-[24%] rounded-full" max={18}>
        <div className="spin-border h-full w-full rounded-full">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-primary/40 via-bg to-secondary/40">
            {personal.avatar ? (
              <img src={personal.avatar} alt={personal.firstName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-gradient font-display text-6xl font-bold md:text-7xl">{initials}</span>
              </div>
            )}
            <div className="animate-scan absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
          </div>
        </div>
      </TiltCard>

      {/* glow */}
      <div className="absolute inset-[20%] -z-10 rounded-full bg-primary/40 blur-[80px]" />
    </div>
  );
}

export default function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const colors = useMemo(() => [theme.primary, theme.secondary, theme.tertiary], []);
  const d = 0.1;

  return (
    <section id="home" ref={ref} className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      {/* animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="animate-blob absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="animate-blob absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full bg-secondary/20 blur-[120px]" style={{ animationDelay: "-5s" }} />
        <div className="animate-blob absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-tertiary/20 blur-[120px]" style={{ animationDelay: "-10s" }} />
        <div className="grid-bg absolute inset-0" />
        {theme.showParticles && <ParticleNetwork colors={colors} />}
      </div>

      {/* hold the entrance animations until the preloader finishes */}
      {ready && (<>
      <motion.div style={{ y, opacity, scale }} className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div
            className="glass mb-8 inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-xs text-white/70 md:text-sm"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: d, ease }}
          >
            <span className="rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 font-semibold text-black">
              {personal.availableForWork ? "Available" : "Hello"}
            </span>
            {personal.availabilityText}
          </motion.div>

          <motion.p
            className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-white/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: d + 0.2, duration: 0.8, ease }}
          >
            Hi, I'm
          </motion.p>

          <h1 className="font-display text-[3.4rem] font-bold leading-[0.92] tracking-tighter text-white sm:text-7xl md:text-8xl xl:text-[8.5rem]" style={{ perspective: 800 }}>
            <AnimatedName text={personal.firstName} delay={d + 0.3} />
            <span className="text-outline">
              <AnimatedName text={personal.lastName} delay={d + 0.55} />
            </span>
          </h1>

          <motion.p
            className="mt-8 font-display text-xl text-white/80 sm:text-2xl md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.9, duration: 0.8, ease }}
          >
            I build <RotatingRoles roles={personal.roles} />
          </motion.p>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-white/55 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 1.05, duration: 0.8, ease }}
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 1.2, duration: 0.8, ease }}
          >
            <FancyButton href="#projects">
              View my work <FiArrowDownRight className="transition-transform duration-500 group-hover:rotate-[-45deg]" />
            </FancyButton>
            {personal.resume ? (
              <FancyButton href={personal.resume} variant="ghost" download>
                Resume <FiDownload />
              </FancyButton>
            ) : (
              <FancyButton href="#contact" variant="ghost">
                Contact me
              </FancyButton>
            )}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: d + 1.4, duration: 1 }}
          >
            <div className="flex gap-2">
              {socials.slice(0, 4).map((s, i) => (
                <Magnetic key={s.name} strength={0.5}>
                  <motion.a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-white/70 transition-colors hover:border-white hover:bg-white hover:text-black"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: d + 1.4 + i * 0.08, type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <s.icon />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
            <span className="flex items-center gap-2 text-sm text-white/50">
              <FiMapPin /> {personal.location}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: d + 0.4, ease }}
        >
          <Avatar />
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 2 }}
      >
        Scroll
        <span className="relative h-12 w-6 rounded-full border border-white/20">
          <motion.span
            className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-white"
            animate={{ y: [0, 18, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
      </>)}
    </section>
  );
}
