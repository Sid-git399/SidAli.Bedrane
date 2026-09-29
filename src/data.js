/* ==========================================================================
   ✨ PORTFOLIO DATA — THE ONLY FILE YOU NEED TO EDIT ✨
   --------------------------------------------------------------------------
   Everything shown on the website comes from this file.
   - Text: just replace the strings.
   - Images: put files in /public (e.g. /public/me.jpg) and write "/me.jpg",
     or paste any image URL. Leave "" to get an auto-generated animated cover.
   - Icons: import any icon from react-icons (https://react-icons.github.io)
     at the top of this file and use it below.
   - Remove a section: set its `enabled` flag to false in `sections`.
   ========================================================================== */

import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiRedux,
  SiNodedotjs, SiExpress, SiGraphql, SiFlutter, SiDart, SiKotlin, SiSwift,
  SiExpo, SiFirebase, SiPython, SiPytorch, SiTensorflow, SiLangchain,
  SiHuggingface, SiScikitlearn, SiFastapi, SiMongodb, SiPostgresql, SiRedis,
  SiSupabase, SiDocker, SiGit, SiFigma, SiVercel, SiGooglecloud,
} from "react-icons/si";
import {
  FiGithub, FiLinkedin, FiTwitter, FiMail, FiInstagram, FiDribbble,
  FiMonitor, FiSmartphone, FiCpu, FiLayers,
} from "react-icons/fi";

/* -------------------------------------------------------------------------
   1. THEME — change the colors and the whole site follows
   ------------------------------------------------------------------------- */
export const theme = {
  primary: "#7c5cff", // main accent (violet)
  secondary: "#22d3ee", // second accent (cyan)
  tertiary: "#f472b6", // third accent (pink)
  background: "#05050a", // page background
  showPreloader: true, // intro loading animation
  showCustomCursor: true, // fancy cursor on desktop
  showParticles: true, // neural-network particles in the hero
};

/* -------------------------------------------------------------------------
   2. PERSONAL INFO
   ------------------------------------------------------------------------- */
export const personal = {
  firstName: "Sid Ali",
  lastName: "Bedrane",
  logo: "SID", // text logo in the navbar
  title: "Mobile, Web & AI Full-Stack Developer",
  // Rotating words in the hero ("I build ...")
  roles: [
    "cross-platform mobile apps",
    "blazing-fast web experiences",
    "AI-powered solutions",
    "Cybersecurity platforms",
  ],
  tagline:
    "I design and build modern digital products — from high-performance web and mobile applications to AI-powered and cybersecurity-focused systems.",
  avatar: "", // e.g. "/me.jpg" — leave "" for an animated monogram
  location: "Algiers, Algeria",
  email: "ns_bedrane@esi.dz",
  phone: "+213 793 79 08 42",
  resume: "/Bedrane_Sidali_Resume.pdf", // e.g. "/resume.pdf" — leave "" to hide the button
  availableForWork: true,
  availabilityText: "Available for freelance & full-time",
};

/* -------------------------------------------------------------------------
   3. SOCIAL LINKS
   ------------------------------------------------------------------------- */
export const socials = [
  { name: "GitHub", url: "https://github.com/Sid-git399", icon: FiGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/bedrane-sidali-b67075382/", icon: FiLinkedin },
  { name: "Twitter", url: "https://x.com/", icon: FiTwitter },
  { name: "Instagram", url: "https://www.instagram.com/sidali_bdr/", icon: FiInstagram },
  { name: "Dribbble", url: "https://dribbble.com/", icon: FiDribbble },
  { name: "Email", url: "mailto:ns_bedrane@esi.dz", icon: FiMail },
];

/* -------------------------------------------------------------------------
   4. ABOUT
   ------------------------------------------------------------------------- */
export const about = {
  heading: "Turning ideas into products people love to use.",
  // Each string is a paragraph. Words light up as the visitor scrolls.
  paragraphs: [
    "I'm a software engineer ,a fourth-year engineering student at École Nationale Supérieure d'Informatique (ESI Algiers) who lives at the intersection of mobile, web and artificial intelligence. I love taking a rough idea and shaping it into a polished, production-ready product.",
    "My toolbox spans React, Next.js, React Native and Flutter on the front, Node and Python on the back, and PyTorch, LangChain and LLM APIs when things need to get smart.",
  ],
  image: "/portfolio-pic.png", // optional portrait for the about section
  stats: [
    { value: 4, suffix: "+", label: "Years of experience" },
    { value: 20, suffix: "+", label: "Projects shipped" },
    { value: 10, suffix: "+", label: "Happy clients" },
    { value: 2, suffix: "", label: "AI models deployed" },
  ],
};

/* -------------------------------------------------------------------------
   /* -------------------------------------------------------------------------
   5. SERVICES — what you offer
   ------------------------------------------------------------------------- */
export const services = [
  {
    title: "Web Development",
    description:
      "Modern, responsive and production-ready web applications built with React and Next.js, backed by reliable APIs, databases and clean architecture.",
    icon: FiMonitor,
    tags: ["React", "Next.js", "Node.js", "REST APIs"],
  },
  {
    title: "Mobile Development",
    description:
      "Cross-platform mobile applications built with React Native and Expo, focused on smooth experiences, practical functionality and clean interfaces.",
    icon: FiSmartphone,
    tags: ["React Native", "Expo", "JavaScript", "APIs"],
  },
  {
    title: "AI & Machine Learning",
    description:
      "AI-powered applications that integrate machine learning, LLMs and intelligent automation to turn ideas into useful real-world products.",
    icon: FiCpu,
    tags: ["Machine Learning", "LLMs", "AI APIs", "Python"],
  },
  {
    title: "Backend & Cybersecurity",
    description:
      "Secure backend systems, APIs and data-driven applications with a focus on authentication, reliability and security-aware software development.",
    icon: FiLayers,
    tags: ["Node.js", "Python", "APIs", "Security"],
  },
];

/* -------------------------------------------------------------------------
   6. SKILLS — grouped in categories (level is 0 → 100)
   ------------------------------------------------------------------------- */
export const skills = [
  {
    category: "Web",
    items: [
      { name: "React", icon: SiReact, level: 100 },
      { name: "Next.js", icon: SiNextdotjs, level: 100 },
      { name: "TypeScript", icon: SiTypescript, level: 90 },
      { name: "JavaScript", icon: SiJavascript, level: 95 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 95 },
      { name: "Redux", icon: SiRedux, level: 85 },
    ],
  },
  {
    category: "Mobile",
    items: [
      { name: "React Native", icon: SiReact, level: 92 },
      { name: "Expo", icon: SiExpo, level: 90 },
      { name: "Flutter", icon: SiFlutter, level: 85 },
      { name: "Dart", icon: SiDart, level: 82 },
      { name: "Kotlin", icon: SiKotlin, level: 70 },
      { name: "Swift", icon: SiSwift, level: 65 },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "Python", icon: SiPython, level: 92 },
      { name: "PyTorch", icon: SiPytorch, level: 82 },
      { name: "TensorFlow", icon: SiTensorflow, level: 75 },
      { name: "LangChain", icon: SiLangchain, level: 88 },
      { name: "Hugging Face", icon: SiHuggingface, level: 85 },
      { name: "scikit-learn", icon: SiScikitlearn, level: 84 },
    ],
  },
  {
    category: "Backend & Cloud",
    items: [
      { name: "Node.js", icon: SiNodedotjs, level: 90 },
      { name: "Express", icon: SiExpress, level: 88 },
      { name: "FastAPI", icon: SiFastapi, level: 85 },
      { name: "GraphQL", icon: SiGraphql, level: 78 },
      { name: "MongoDB", icon: SiMongodb, level: 88 },
      { name: "PostgreSQL", icon: SiPostgresql, level: 84 },
      { name: "Redis", icon: SiRedis, level: 72 },
      { name: "Firebase", icon: SiFirebase, level: 90 },
      { name: "Supabase", icon: SiSupabase, level: 80 },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Docker", icon: SiDocker, level: 80 },
      { name: "Git", icon: SiGit, level: 92 },
      { name: "Figma", icon: SiFigma, level: 85 },
      { name: "Vercel", icon: SiVercel, level: 90 },
      { name: "Google Cloud", icon: SiGooglecloud, level: 72 },
    ],
  },
];

// Icons that scroll forever in the tech marquee & orbit around your avatar
export const techMarquee = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Flutter", icon: SiFlutter },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python", icon: SiPython },
  { name: "PyTorch", icon: SiPytorch },
  { name: "LangChain", icon: SiLangchain },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Firebase", icon: SiFirebase },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Kotlin", icon: SiKotlin },
  { name: "Docker", icon: SiDocker },
];

/* -------------------------------------------------------------------------
   7. EXPERIENCE — newest first
   ------------------------------------------------------------------------- */
export const experience = [
  {
    role: "Senior Full-Stack & AI Developer",
    company: "Soficlef",
    location: "Algeria",
    period: "2026 — Present",
    description:
      "Contributing to the development of a modern digital platform integrating AI agents to automate tasks, assist users and enhance business workflows.",
    achievements: [
      "Cut LLM inference cost by 38% with smart caching",
      "Worked on web application development and integration of AI capabilities",
      "Integrated frontend, backend and AI-driven functionality into the platform",
    ],
    tech: ["Next.js", "React Native", "Python", "LangChain"],
  },
  {
    role: "Full-Stack Developer",
    company: "Souvex Agency",
    location: "Algiers, DZ",
    period: "2025 — 2026",
    description:
      "Built and maintained 4 production mobile apps and websites for e-commerce and fintech clients with a focus on performance and animation.",
    achievements: [
      "4.8★ average rating across stores",
      "Introduced a shared design system",
    ],
    tech: ["Flutter", "React Native", "Firebase" ,"Node.js"],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Self-employed",
    location: "Remote",
    period: "2023 — Present",
    description:
      "Designing and building web, mobile and AI products for independent clients, from requirements to deployment.",
    achievements: ["Improved Lighthouse scores to 95+", "Mentored 3 junior devs"],
    tech: ["React", "Tailwind", "Node.js"],
  },
  {
    role: "Engineering Degree, Computer Science & Information Systems",
    company: "École nationale Supérieure d'Informatique (ESI)",
    location: "Algiers, DZ",
    period: "2023 — Present",
    description:
      "Engineering cycle in computer science and information systems, with a focus on AI and cybersecurity.",
    achievements: ["Learn with honors"],
    tech: ["Algorithms", "ML", "Systems"],
  },
];

/* -------------------------------------------------------------------------
   8. PROJECTS
   - type: "web" | "mobile" | "ai"  (used for the filter tabs)
   - image: screenshot URL or "" for an auto-generated animated cover
   - featured: true shows it larger in the grid
   ----m--------------------------------------------------------------------- */
export const projects = [
  {
    title: "Soficlef Platform",
    type: "web",
    featured: true,
    description:
      "Onboarding and HR platform for SOFICLEF SARL.",
    longDescription:
      "Covers the organizational structure, job descriptions, competencies and the new-hire onboarding journey, in French, English and Arabic (RTL), with AI agents integrated into the platform.",
    image: "/Soficlef.png",
    tech: ["JavaScript", "Python", "LangChain", "PostgreSQL"],
    github: "https://github.com/Sid-git399/Soficlef-platform",
    live: "https://soficlef-platform.vercel.app/",
  },
  {
    title: "Novyx Mobile",
    type: "web",
    featured: false,
    description:
      "Phones market",
    longDescription:
      "Original devices. Warranty included. Fast delivery across Algeria — pay on delivery, no surprises.",
    image: "/NOVYX.png",
    tech: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    github: "https://github.com/",
    live: "https://novyx-mobile.vercel.app/",
  },
  {
    title: "ShopySid",
    type: "web",
    featured: false,
    description:
      "full-stack commerce platform for managing products.",
    longDescription:
      "ShopySid is a full-stack commerce platform for managing products, customers, orders, storefront settings, live sales analytics, and an AI-powered store assistant. Built with Next.js, React, TypeScript, Tailwind CSS, Better Auth, Neon Postgres, and server actions.",
    image: "/shopysid.png",
    tech: ["Next.js", "TypeScript", "Tailwind", "postgres"],
    github: "https://github.com/Sid-git399/ShopySid",
    live: "",
  },
  {
    title: "Lion Royal",
    type: "web",
    featured: false,
    description:
      "L'Excellence en Machines de Production",
    longDescription:
      "Lion Royal is a web platform for showcasing and selling high-quality production machines. It features a responsive design, product catalog, and AI-powered recommendations for users.",
    image: "/lion.png",
    tech: ["Next.js", "TypeScript", "Tailwind", "postgres"],
    github: "https://github.com/Sid-git399/lion_Royal",
    live: "https://lion-royal.vercel.app/",
  },
  {
    title: "EduCentre",
    type: "web",
    featured: false,
    description:
      "Online learning platform for students and educators with AI-powered content recommendations.",
    longDescription:
      "Native-feeling Flutter app with custom-painted animations, biometric security, multi-currency support and ML-powered spending categorisation.",
    image: "/Edu.png",
    tech: ["Next.js", "TypeScript", "Tailwind", "postgres"],
    github: "",
    live: "https://school-ashy-two.vercel.app",
  },
  {
    title: "SOC-Insight",
    type: "AI-cybersecurity",
    featured: false,
    description:
      "AI-powered cybersecurity platform for monitoring and analyzing security events in real-time.",
    longDescription:
      "SOC-Insight — A defensive security investigation workbench that correlates security events, detects suspicious behavior, extracts IOCs, maps activity to MITRE ATT&CK, and assists analysts in investigating simulated security incidents.",
    image: "/soc-insight-incident.png",
    tech: ["Python", "LangChain", "FastAPI", "PostgreSQL"],
    github: "https://github.com/Sid-git399/soc-insight-Sid",
    live: "",
  },
  {
    title: "CyberStream",
    type: "BigData-cybersecurity",
    featured: false,
    description:
      "Distributed Big Data platform that streams security events through Kafka and Spark to detect threats in near real-time.",
    longDescription:
      "CyberStream — A Big Data cybersecurity lab that streams synthetic security events through Kafka and PySpark Structured Streaming, detects threats with windowed rules and anomaly analysis, maps alerts to MITRE ATT&CK, and correlates them into incidents, all monitored through a FastAPI and React dashboard.",
    image: "/cyberstream_overview.svg",
    tech: ["Kafka", "PySpark", "FastAPI", "PostgreSQL", "React", "TypeScript", "Docker"],
    github: "https://github.com/Sid-git399/cyberstream-Sid",
    live: "",
  },
];

/* -------------------------------------------------------------------------
   9. TESTIMONIALS
   ------------------------------------------------------------------------- */
export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, NeuralWave Labs",
    avatar: "",
    quote:
      "One of the most talented engineers I've worked with. The AI features shipped faster than we planned and the app feels incredibly polished.",
  },
  {
    name: "Karim Benali",
    role: "Product Manager, Pixel Studio",
    avatar: "",
    quote:
      "Transforms designs into beautiful, smooth mobile experiences. Our users constantly compliment the animations.",
  },
  {
    name: "Emily Chen",
    role: "Founder, ShopSphere",
    avatar: "",
    quote:
      "Took our e-commerce idea from zero to launch in record time. Communication was clear and the code quality is excellent.",
  },
];

/* -------------------------------------------------------------------------
   10. CONTACT
   ------------------------------------------------------------------------- */
export const contact = {
  heading: "Let's build something extraordinary.",
  subheading:
    "Have a project in mind, a question, or just want to say hi? My inbox is always open.",
  // The form opens the visitor's email app pre-filled (no backend needed).
  // To use a form service instead (e.g. Formspree), paste its endpoint here:
  formEndpoint: "https://formspree.io/f/xjykjvjn",
};

/* -------------------------------------------------------------------------
   11. SECTIONS & NAVIGATION — reorder, rename or disable
   ------------------------------------------------------------------------- */
export const sections = {
  about: { enabled: true, label: "About" },
  services: { enabled: true, label: "Services" },
  skills: { enabled: true, label: "Skills" },
  experience: { enabled: true, label: "Journey" },
  projects: { enabled: true, label: "Work" },
  testimonials: { enabled: true, label: "Words" },
  contact: { enabled: true, label: "Contact" },
};

export const footer = {
  text: "Designed & built with passion.",
  bigText: "LET'S TALK",
};
