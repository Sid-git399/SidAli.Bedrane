import { motion, useScroll, useTransform } from "framer-motion";
import { techMarquee } from "../data";

function Row({ items, reverse, duration }) {
  const doubled = [...items, ...items];
  return (
    <div className="pause-on-hover flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div
        className="animate-marquee flex w-max shrink-0 gap-4 py-2"
        style={{ "--duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            className="group glass flex items-center gap-3 rounded-full px-6 py-3 transition-colors duration-300 hover:bg-white"
          >
            <t.icon className="text-2xl text-white/70 transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-black" />
            <span className="font-display text-lg font-medium whitespace-nowrap text-white/70 group-hover:text-black">
              {t.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  return (
    <motion.section style={{ rotate }} className="relative -mx-4 space-y-4 py-16">
      <Row items={techMarquee} duration={35} />
      <Row items={[...techMarquee].reverse()} reverse duration={40} />
    </motion.section>
  );
}
