import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { experience } from "../data";
import { ease, SectionHeading, TiltCard } from "./ui";

function Item({ e, i }) {
  const left = i % 2 === 0;
  return (
    <div className={`relative grid gap-6 pl-12 md:grid-cols-2 md:gap-16 md:pl-0`}>
      {/* node */}
      <motion.div
        className="absolute left-4 top-8 z-10 -translate-x-1/2 md:left-1/2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <span className="relative flex h-5 w-5">
          <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-primary" />
          <span className="relative inline-flex h-5 w-5 rounded-full border-4 border-bg bg-gradient-to-br from-primary to-secondary" />
        </span>
      </motion.div>

      <motion.div
        className={`hidden md:block ${left ? "text-right" : "md:order-2"}`}
        initial={{ opacity: 0, x: left ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease }}
      >
        <p className="pt-6 font-display text-5xl font-bold text-white/10 lg:text-6xl">{e.period}</p>
      </motion.div>

      <motion.div
        className={left ? "" : "md:order-1"}
        initial={{ opacity: 0, x: left ? 60 : -60, rotateY: left ? -15 : 15 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease }}
        style={{ transformPerspective: 1000 }}
      >
        <TiltCard className="glass group overflow-hidden rounded-3xl p-7 md:p-8" max={6}>
          <p className="font-mono text-xs uppercase tracking-widest text-secondary md:hidden">{e.period}</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-white">{e.role}</h3>
          <p className="mt-1 text-white/60">
            <span className="text-gradient font-semibold">{e.company}</span> · {e.location}
          </p>
          <p className="mt-4 leading-relaxed text-white/55">{e.description}</p>
          {e.achievements?.length > 0 && (
            <ul className="mt-5 space-y-2">
              {e.achievements.map((a, j) => (
                <motion.li
                  key={a}
                  className="flex items-start gap-3 text-sm text-white/70"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + j * 0.1 }}
                >
                  <FiCheck className="mt-0.5 shrink-0 text-secondary" /> {a}
                </motion.li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            {e.tech.map((t) => (
              <span key={t} className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-white/60">
                {t}
              </span>
            ))}
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}

export default function Experience({ index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading index={index} kicker="Experience" title="The journey so far." />
      <div ref={ref} className="relative space-y-16">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-white/10 md:left-1/2" />
        <motion.div
          className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-primary via-secondary to-tertiary shadow-[0_0_20px_var(--primary)] md:left-1/2"
          style={{ scaleY }}
        />
        {experience.map((e, i) => (
          <Item key={e.role + e.company} e={e} i={i} />
        ))}
      </div>
    </section>
  );
}
