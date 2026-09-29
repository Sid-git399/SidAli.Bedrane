import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { personal } from "../data";
import { ease } from "./ui";

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 2200;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setTimeout(onDone, 350);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  const name = `${personal.firstName} ${personal.lastName}`;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-bg"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="grid-bg absolute inset-0" />
      <div className="relative overflow-hidden">
        <motion.h1
          className="font-display text-5xl font-bold tracking-tight text-white md:text-8xl"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease }}
        >
          {name.split("").map((c, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease }}
            >
              {c === " " ? " " : c}
            </motion.span>
          ))}
        </motion.h1>
      </div>
      <motion.p
        className="mt-4 font-mono text-xs uppercase tracking-[0.4em] text-white/50 md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {personal.title}
      </motion.p>

      <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12">
        <div className="mb-3 flex items-end justify-between font-mono text-white/60">
          <span className="text-xs uppercase tracking-[0.3em]">Loading experience</span>
          <span className="font-display text-6xl font-bold text-white md:text-8xl">
            {count}
            <span className="text-gradient">%</span>
          </span>
        </div>
        <div className="h-px w-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-tertiary"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
