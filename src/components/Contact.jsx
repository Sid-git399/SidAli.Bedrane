import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { contact, personal, socials } from "../data";
import { ease, Magnetic, Reveal, SectionHeading } from "./ui";

function Field({ label, as = "input", ...props }) {
  const Comp = as;

  return (
    <label className="group relative block">
      <Comp
        {...props}
        placeholder=" "
        className="peer w-full resize-none border-b border-white/15 bg-transparent pb-3 pt-7 text-lg text-white outline-none transition-colors"
      />

      <span className="pointer-events-none absolute left-0 top-7 text-white/40 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-secondary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </span>

      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-500 peer-focus:scale-x-100" />
    </label>
  );
}

export default function Contact({ index }) {
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // ---------------------------------------------------------
    // Formspree / form endpoint
    // ---------------------------------------------------------
    if (contact.formEndpoint) {
      setStatus("sending");

      try {
        const res = await fetch(contact.formEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(`Form submission failed: ${res.status}`);
        }

        setStatus("sent");
        form.reset();
      } catch (error) {
        console.error("Contact form error:", error);
        setStatus("error");
      }

      setTimeout(() => {
        setStatus("idle");
      }, 4000);

      return;
    }

    // ---------------------------------------------------------
    // Fallback: open visitor's email application
    // ---------------------------------------------------------
    const body = encodeURIComponent(
      `${data.message}\n\n— ${data.name} (${data.email})`
    );

    window.location.href =
      `mailto:${personal.email}` +
      `?subject=${encodeURIComponent(data.subject || "Hello!")}` +
      `&body=${body}`;
  };

  const copy = () => {
    navigator.clipboard?.writeText(personal.email);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36"
    >
      <SectionHeading
        index={index}
        kicker="Contact"
        title={contact.heading}
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        {/* LEFT SIDE */}
        <div className="space-y-8">
          <Reveal>
            <p className="text-lg leading-relaxed text-white/60">
              {contact.subheading}
            </p>
          </Reveal>

          {/* EMAIL */}
          <Reveal delay={0.1}>
            <button
              onClick={copy}
              className="group glass flex w-full items-center gap-4 rounded-3xl p-5 text-left transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl text-black">
                <FiMail />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-mono text-xs uppercase tracking-widest text-white/40">
                  Email
                </span>

                <span className="block truncate font-display text-lg text-white md:text-xl">
                  {personal.email}
                </span>
              </span>

              <AnimatePresence mode="wait">
                <motion.span
                  key={copied ? "y" : "n"}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  className="text-xl text-white/60"
                >
                  {copied ? (
                    <FiCheck className="text-emerald-400" />
                  ) : (
                    <FiCopy />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </Reveal>

          {/* PHONE + LOCATION */}
          <Reveal
            delay={0.2}
            className="grid gap-4 sm:grid-cols-2"
          >
            {personal.phone && (
              <a
                href={`tel:${personal.phone.replace(/\s/g, "")}`}
                className="glass flex items-center gap-3 rounded-3xl p-5 text-white/80 transition-colors hover:bg-white/[0.06]"
              >
                <FiPhone className="text-secondary" />
                {personal.phone}
              </a>
            )}

            <div className="glass flex items-center gap-3 rounded-3xl p-5 text-white/80">
              <FiMapPin className="text-secondary" />
              {personal.location}
            </div>
          </Reveal>

          {/* SOCIALS */}
          <Reveal
            delay={0.3}
            className="flex flex-wrap gap-3"
          >
            {socials.map((s, i) => (
              <Magnetic key={s.name} strength={0.5}>
                <motion.a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-white hover:bg-white hover:text-black"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + i * 0.07,
                    ease,
                  }}
                >
                  <s.icon />

                  {s.name}

                  <FiArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
                </motion.a>
              </Magnetic>
            ))}
          </Reveal>
        </div>

        {/* CONTACT FORM */}
        <Reveal delay={0.2}>
          <form
            onSubmit={submit}
            className="glass spin-border space-y-8 rounded-[2.5rem] p-7 md:p-12"
          >
            <div className="grid gap-8 sm:grid-cols-2">
              <Field
                label="Your name"
                name="name"
                required
              />

              <Field
                label="Your email"
                name="email"
                type="email"
                required
              />
            </div>

            <Field
              label="Subject"
              name="subject"
            />

            <Field
              label="Tell me about your project..."
              name="message"
              as="textarea"
              rows={4}
              required
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white py-4 font-display font-semibold text-black disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary via-secondary to-tertiary transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />

              <AnimatePresence mode="wait">
                <motion.span
                  key={status}
                  className="relative z-10 flex items-center gap-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                >
                  {status === "sending" && "Sending..."}

                  {status === "sent" && (
                    <>
                      Message sent
                      <FiCheck />
                    </>
                  )}

                  {status === "error" && (
                    <>
                      Failed to send — try again
                    </>
                  )}

                  {status === "idle" && (
                    <>
                      Send message
                      <FiSend className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}