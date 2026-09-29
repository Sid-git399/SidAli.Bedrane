import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { testimonials } from "../data";
import { ease, SectionHeading } from "./ui";

export default function Testimonials({ index }) {
  const [[i, dir], set] = useState([0, 1]);
  const n = testimonials.length;
  const go = (d) => set(([v]) => [(v + d + n) % n, d]);

  useEffect(() => {
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [i]);

  const t = testimonials[i];

  return (
    <section id="testimonials" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading index={index} kicker="Testimonials" title="Kind words from great people." />

      <div className="glass relative overflow-hidden rounded-[2.5rem] p-8 md:p-16">
        <div className="animate-blob absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/25 blur-[100px]" />
        <span className="text-gradient pointer-events-none absolute left-6 top-0 font-display text-[10rem] leading-none opacity-30 md:left-12 md:text-[14rem]">“</span>

        <div className="relative min-h-[260px] md:min-h-[220px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 80, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir * -80, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <p className="font-display text-2xl leading-snug text-white md:text-4xl">{t.quote}</p>
              <div className="mt-10 flex items-center gap-4">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="h-14 w-14 rounded-full object-cover" />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-lg font-bold text-black">
                    {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div>
                  <p className="font-display text-lg font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-white/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-10 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((_, j) => (
              <button key={j} onClick={() => set([j, j > i ? 1 : -1])} className="relative h-2 overflow-hidden rounded-full bg-white/10" style={{ width: j === i ? 48 : 16, transition: "width .5s" }} aria-label={`Testimonial ${j + 1}`}>
                {j === i && (
                  <motion.span
                    key={i}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            {[[-1, FiChevronLeft], [1, FiChevronRight]].map(([d, Icon]) => (
              <motion.button
                key={d}
                onClick={() => go(d)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-xl text-white transition-colors hover:bg-white hover:text-black"
                aria-label={d < 0 ? "Previous" : "Next"}
              >
                <Icon />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
