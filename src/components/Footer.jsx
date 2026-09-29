import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowUp } from "react-icons/fi";
import { footer, personal, socials } from "../data";
import { Magnetic } from "./ui";

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const text = `${footer.bigText} — ${footer.bigText} — `;

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/5 pt-20">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-primary/15 to-transparent" />
      <motion.a href="#contact" style={{ x }} className="block whitespace-nowrap font-display text-[18vw] font-bold leading-none tracking-tighter">
        <span className="text-outline transition-colors duration-500 hover:text-white">{text}</span>
      </motion.a>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-6 px-5 pb-10 md:flex-row md:px-8">
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} {personal.firstName} {personal.lastName}. {footer.text}
        </p>
        <div className="flex gap-2">
          {socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} className="flex h-10 w-10 items-center justify-center rounded-full text-white/50 transition-all hover:-translate-y-1 hover:bg-white/10 hover:text-white">
              <s.icon />
            </a>
          ))}
        </div>
        <Magnetic strength={0.6}>
          <a href="#home" className="group flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl text-black" aria-label="Back to top">
            <FiArrowUp className="transition-transform duration-500 group-hover:-translate-y-1" />
          </a>
        </Magnetic>
      </div>
    </footer>
  );
}
