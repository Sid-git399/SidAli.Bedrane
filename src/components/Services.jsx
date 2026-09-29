import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { services } from "../data";
import { ease, SectionHeading } from "./ui";

function ServiceCard({ s, i }) {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const bg = useMotionTemplate`radial-gradient(500px circle at ${mx}px ${my}px, color-mix(in srgb, var(--primary) 18%, transparent), transparent 50%)`;
  const border = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, var(--secondary), transparent 60%)`;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-[2rem] bg-white/[0.02] p-px"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        mx.set(-500);
        my.set(-500);
      }}
      initial={{ opacity: 0, y: 80, rotateX: 25 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: i * 0.12, ease }}
      style={{ transformPerspective: 1200 }}
    >
      <motion.div className="absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: border }} />
      <div className="absolute inset-0 rounded-[2rem] border border-white/10" />
      <div className="relative h-full rounded-[calc(2rem-1px)] bg-bg/95 p-8 md:p-10">
        <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: bg }} />
        <div className="relative flex items-start justify-between">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-3xl text-black"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8, ease }}
          >
            <s.icon />
          </motion.div>
          <span className="font-mono text-sm text-white/30">0{i + 1}</span>
        </div>
        <h3 className="relative mt-8 flex items-center gap-2 font-display text-2xl font-bold text-white md:text-3xl">
          {s.title}
          <FiArrowUpRight className="-translate-x-2 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </h3>
        <p className="relative mt-4 leading-relaxed text-white/55">{s.description}</p>
        <div className="relative mt-8 flex flex-wrap gap-2">
          {s.tags.map((t, j) => (
            <motion.span
              key={t}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/60"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 + j * 0.06, type: "spring", stiffness: 260, damping: 18 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services({ index }) {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading index={index} kicker="What I do" title="Services that bring ideas to life." />
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((s, i) => (
          <ServiceCard key={s.title} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
