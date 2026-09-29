import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export const ease = [0.22, 1, 0.36, 1];

/* Fades + slides children in when scrolled into view */
export function Reveal({ children, delay = 0, y = 40, className = "", ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* Splits text into words that rise from a mask one by one */
export function SplitText({ text, className = "", delay = 0, stagger = 0.06 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 6 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeading({ id, index, kicker, title }) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal className="mb-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-white/50 md:text-sm">
        <span className="text-gradient font-semibold">{String(index).padStart(2, "0")}</span>
        <motion.span
          className="h-px w-16 origin-left bg-gradient-to-r from-primary to-secondary"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        />
        <span id={id ? `${id}-kicker` : undefined}>{kicker}</span>
      </Reveal>
      <h2 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl">
        <SplitText text={title} />
      </h2>
    </div>
  );
}

/* Element gently follows the cursor while hovered */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
      data-cursor="hover"
    >
      {children}
    </motion.div>
  );
}

/* 3D tilt card with a spotlight that follows the cursor */
export function TiltCard({ children, className = "", max = 12, glare = true, ...rest }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, color-mix(in srgb, var(--primary) 22%, transparent), transparent 60%)`;
  const [hover, setHover] = useState(false);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        px.set(0.5);
        py.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} ${className}`}
      {...rest}
    >
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-500"
          style={{ background: spotlight, opacity: hover ? 1 : 0 }}
        />
      )}
      {children}
    </motion.div>
  );
}

/* Pill-shaped button with liquid fill on hover */
export function FancyButton({ href, children, variant = "primary", className = "", ...rest }) {
  const Comp = href ? "a" : "button";
  const base =
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-display text-sm font-semibold tracking-wide transition-colors duration-500 md:text-base";
  const styles =
    variant === "primary"
      ? "bg-white text-black"
      : "glass text-white hover:text-black";
  return (
    <Magnetic>
      <Comp href={href} className={`${base} ${styles} ${className}`} {...rest}>
        <span
          className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 ${
            variant === "primary"
              ? "bg-gradient-to-r from-primary via-secondary to-tertiary"
              : "bg-white"
          }`}
        />
        <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover:text-black">
          {children}
        </span>
      </Comp>
    </Magnetic>
  );
}

/* Animated generated cover used when no image is provided */
const palette = ["var(--primary)", "var(--secondary)", "var(--tertiary)"];

export function GeneratedCover({ title, seed = 0, className = "" }) {
  const a = palette[seed % 3];
  const b = palette[(seed + 1) % 3];
  const initials = title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#0b0b16] ${className}`}>
      <div
        className="animate-blob absolute -left-1/4 -top-1/4 h-[90%] w-[90%] rounded-full opacity-60 blur-[70px]"
        style={{ background: a }}
      />
      <div
        className="animate-blob absolute -bottom-1/4 -right-1/4 h-[80%] w-[80%] rounded-full opacity-50 blur-[70px]"
        style={{ background: b, animationDelay: "-6s" }}
      />
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[5rem] font-bold leading-none text-white/80 mix-blend-overlay md:text-[7rem]">
          {initials}
        </span>
      </div>
      <div className="animate-scan absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </div>
  );
}
