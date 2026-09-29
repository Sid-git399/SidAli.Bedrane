import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FiArrowUpRight, FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import { projects } from "../data";
import { ease, FancyButton, GeneratedCover, SectionHeading, TiltCard } from "./ui";

const labels = { all: "All", web: "Web", mobile: "Mobile", ai: "AI" };

function Cover({ p, i }) {
  return p.image ? (
    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
  ) : (
    <GeneratedCover title={p.title} seed={i + 1} className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
  );
}

function Card({ p, i, onOpen }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease }}
      className={p.featured ? "md:col-span-2" : ""}
    >
      <TiltCard className="group h-full cursor-pointer" max={6} glare={false} onClick={() => onOpen(p)}>
        <motion.div layoutId={`card-${p.title}`} className="glass h-full overflow-hidden rounded-[2rem]">
          <motion.div layoutId={`cover-${p.title}`} className={`relative overflow-hidden ${p.featured ? "aspect-[16/10] md:aspect-[21/8]" : "aspect-[16/10]"}`}>
            <Cover p={p} i={i} />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
            <span className="glass absolute left-5 top-5 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-widest text-white">
              {labels[p.type] ?? p.type}
            </span>
            <motion.span
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-black"
              initial={{ scale: 0, rotate: -90 }}
              whileHover={{ scale: 1.15 }}
              animate={{ scale: 1, rotate: 0 }}
            >
              <FiArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
            </motion.span>
          </motion.div>
          <div className="p-6 md:p-8">
            <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-secondary md:text-3xl">
              {p.title}
            </h3>
            <p className="mt-3 line-clamp-2 text-white/55">{p.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/60">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.article>
  );
}

function Modal({ p, onClose }) {
  const i = projects.indexOf(p);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10">
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        layoutId={`card-${p.title}`}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0a0a14]"
      >
        <motion.div layoutId={`cover-${p.title}`} className="relative aspect-[16/9] overflow-hidden">
          <Cover p={p} i={i} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] to-transparent" />
        </motion.div>
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-black transition-transform hover:rotate-90"
          aria-label="Close"
        >
          <FiX />
        </button>
        <motion.div
          className="p-7 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.15 } }}
          transition={{ delay: 0.25, duration: 0.6, ease }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-secondary">{labels[p.type] ?? p.type} project</span>
          <h3 className="mt-2 font-display text-3xl font-bold text-white md:text-5xl">{p.title}</h3>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{p.longDescription || p.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tech.map((t, j) => (
              <motion.span
                key={t}
                className="rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-1.5 font-mono text-sm text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + j * 0.06, type: "spring", stiffness: 300, damping: 18 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {p.live && (
              <FancyButton href={p.live} target="_blank" rel="noreferrer">
                Live demo <FiExternalLink />
              </FancyButton>
            )}
            {p.github && (
              <FancyButton href={p.github} target="_blank" rel="noreferrer" variant="ghost">
                Source code <FiGithub />
              </FancyButton>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ index }) {
  const types = ["all", ...new Set(projects.map((p) => p.type))];
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const shown = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading index={index} kicker="Selected work" title="Projects I'm proud of." />

      <div className="mb-12 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`relative rounded-full border px-5 py-2.5 font-display text-sm font-medium transition-colors md:text-base ${
              filter === t ? "border-transparent text-black" : "border-white/10 text-white/60 hover:text-white"
            }`}
          >
            {filter === t && (
              <motion.span layoutId="project-filter" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
            <span className="relative z-10">
              {labels[t] ?? t}
              <sup className="ml-1 font-mono text-[10px] opacity-60">
                {t === "all" ? projects.length : projects.filter((p) => p.type === t).length}
              </sup>
            </span>
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <Card key={p.title} p={p} i={projects.indexOf(p)} onOpen={setOpen} />
            ))}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>{open && <Modal key={open.title} p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
      </LayoutGroup>
    </section>
  );
}
