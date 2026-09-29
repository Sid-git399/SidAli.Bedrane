import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 250, damping: 22, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 250, damping: 22, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target.closest?.("a, button, [data-cursor='hover'], input, textarea");
      setHover(Boolean(t));
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", d);
    window.addEventListener("mouseup", u);
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", d);
      window.removeEventListener("mouseup", u);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[199] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{
          width: hover ? 72 : 36,
          height: hover ? 72 : 36,
          backgroundColor: hover ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
          scale: down ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
