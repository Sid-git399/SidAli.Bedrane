import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skills } from "../data";
import { ease, SectionHeading, TiltCard } from "./ui";

function Ring({ level }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full -rotate-90">
      <circle cx="32" cy="32" r={r} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="3" />
      <motion.circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="url(#skill-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - (c * level) / 100 }}
        transition={{ duration: 1.6, ease, delay: 0.2 }}
      />
    </svg>
  );
}

export default function Skills({ index }) {
  const [tab, setTab] = useState(0);
  const current = skills[tab];

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="skill-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
      </svg>

      <SectionHeading index={index} kicker="Tech stack" title="Tools I use to craft the future." />

      <div className="mb-12 flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <button
            key={s.category}
            onClick={() => setTab(i)}
            className={`relative rounded-full px-5 py-2.5 font-display text-sm font-medium transition-colors md:text-base ${
              tab === i ? "text-black" : "text-white/60 hover:text-white"
            }`}
          >
            {tab === i && (
              <motion.span
                layoutId="skill-tab"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{s.category}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.category}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
            exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
          }}
        >
          {current.items.map((s) => (
            <motion.div
              key={s.name}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.8, rotateY: 60 },
                show: { opacity: 1, y: 0, scale: 1, rotateY: 0, transition: { duration: 0.7, ease } },
                exit: { opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.25 } },
              }}
            >
              <TiltCard className="glass group flex h-full flex-col items-center rounded-3xl p-6 text-center" max={20}>
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <Ring level={s.level} />
                  <s.icon className="text-3xl text-white transition-all duration-500 group-hover:scale-125 group-hover:text-secondary" />
                </div>
                <p className="mt-4 font-display font-semibold text-white">{s.name}</p>
                <p className="mt-1 font-mono text-xs text-white/40">{s.level}%</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
