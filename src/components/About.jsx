import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { about, personal } from "../data";
import { GeneratedCover, Reveal, SectionHeading, TiltCard } from "./ui";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

function ScrollParagraph({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.3"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="font-display text-2xl leading-snug text-white md:text-3xl">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      <span className="text-gradient">{suffix}</span>
    </span>
  );
}

export default function About({ index }) {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading index={index} kicker="About me" title={about.heading} />

      <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <TiltCard className="spin-border aspect-[4/5] overflow-hidden rounded-[2rem]" max={10}>
            <div className="h-full w-full overflow-hidden rounded-[2rem]">
              {about.image ? (
                <motion.img
                  src={about.image}
                  alt={personal.firstName}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.3 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : (
                <GeneratedCover title={`${personal.firstName} ${personal.lastName}`} seed={3} />
              )}
            </div>
            <div className="glass absolute bottom-5 left-5 right-5 z-20 rounded-2xl p-4">
              <p className="font-mono text-xs uppercase tracking-widest text-white/50">Currently</p>
              <p className="mt-1 font-display text-lg text-white">{personal.title}</p>
            </div>
          </TiltCard>
        </Reveal>

        <div className="flex flex-col justify-between gap-12">
          <div className="space-y-8">
            {about.paragraphs.map((p, i) => (
              <ScrollParagraph key={i} text={p} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {about.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <TiltCard className="glass group h-full overflow-hidden rounded-3xl p-6 md:p-8" max={14}>
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl transition-all duration-700 group-hover:scale-[3]" />
                  <p className="relative font-display text-4xl font-bold text-white md:text-6xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="relative mt-2 text-sm text-white/50 md:text-base">{s.label}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
