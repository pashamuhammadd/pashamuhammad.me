/**
 * Public copy for the home page. Source of truth for facts and URLs:
 * pasha-redesign-kit/CONTENT.md (handoff, not deployed).
 */

export const site = {
  domain: "pashamuhammad.me",
  url: "https://pashamuhammad.me",
  name: "Pasha Muhammad",
  eyebrow: "Software Developer & Founder",
  title: "Founder of Nimia Studio",
  intro: "I build web platforms, games, and products on Solana.",
  location: "Cianjur, Indonesia",
  primaryCta: "Discuss a project",
  signature: "From an idea to something you can play.",
  email: "mochnuribrahimpasha@gmail.com",
  telegram: "https://t.me/pashamuhammadd",
  github: "https://github.com/pashamuhammadd",
  description:
    "Software developer and founder of Nimia Studio in Cianjur, Indonesia. I build web platforms, games, and products on Solana.",
} as const;

/** Core stack, shown first. Extended list comes from the CV and public repos. */
export const engineeringStack = [
  "TypeScript",
  "React / Next.js",
  "Node.js",
  "Supabase",
  "Unity",
  "Solana",
  "JavaScript",
  "Tailwind CSS",
  "PostgreSQL",
  "Firebase",
  "Phaser.js",
  "Rust",
  "Anchor",
  "Web Audio API",
  "Git",
  "Turborepo",
] as const;

export type Project = {
  name: string;
  /** Short name for tight spaces (motion lab on narrow screens). */
  short: string;
  role: string;
  description: string;
  url: string;
  /** Technology or technique the work shows. Only verified facts. */
  built: string[];
  featured?: { image: string; alt: string };
};

export const projects: Project[] = [
  {
    name: "SlushyMarkets",
    short: "Slushy",
    role: "Client development",
    description:
      "An interactive platform for learning trading charts through visuals and sound.",
    url: "https://slushymarkets.com",
    built: ["Web Audio API", "Interactive charts"],
    featured: {
      image: "/work/slushy.webp",
      alt: "SlushyMarkets mascot, a blue slushy cup in a hoodie holding a phone with a trading chart",
    },
  },
  {
    name: "Lifetopia World",
    short: "Lifetopia",
    role: "Founder",
    description:
      "A cozy life simulation and social sandbox on Solana, built around farming, crafting, and community.",
    url: "https://lifetopiaworld.io",
    built: ["Unity", "Solana"],
    featured: {
      image: "/work/lifetopia.webp",
      alt: "Lifetopia World illustration of a farmer and a dog overlooking a village valley",
    },
  },
  {
    name: "CuanWeb3",
    short: "CuanWeb3",
    role: "Community platform",
    description:
      "An Indonesian-language platform for discovering Web3 opportunities, including bounties, grants, and hackathons.",
    url: "https://cuanweb3.com",
    built: ["TypeScript", "PostgreSQL"],
  },
  {
    name: "RailSight",
    short: "RailSight",
    role: "Product development",
    description:
      "A Solana analytics dashboard for exploring x402 payments, merchants, and settlement activity.",
    url: "https://railsight.xyz",
    built: ["Solana settlement analysis", "x402"],
  },
  {
    name: "Nimia Studio",
    short: "Nimia",
    role: "Founder",
    description:
      "My animation and development studio, where we build websites, games, and original animation for clients.",
    url: "https://nimiastudio.com",
    built: ["Websites", "Games", "Animation"],
  },
  {
    name: "Solana Pasundan",
    short: "Pasundan",
    role: "Community development",
    description:
      "A West Java community where Solana builders learn, collaborate, and share projects.",
    url: "https://solanapasundan.fun",
    built: ["Solana", "Community"],
  },
  {
    name: "Pasha Muhammad",
    short: "Portfolio",
    role: "Personal portfolio",
    description: "My portfolio of client work, products, and development notes.",
    url: "https://pashamuhammad.me",
    built: ["Next.js", "Supabase"],
  },
];

export const howIBuild =
  "I design the architecture, write the code, and test each release. AI helps me compare approaches and debug faster. I make the technical decisions and review what ships.";

export type BuildStep = {
  id: string;
  label: string;
  command: string;
  detail: string;
  ai?: string;
};

/** Visual walkthrough of the howIBuild copy above. */
export const buildSteps: BuildStep[] = [
  {
    id: "design",
    label: "Design",
    command: "plan --architecture",
    detail: "I design the architecture: data, services, and how each part talks to the others.",
    ai: "compare approaches",
  },
  {
    id: "build",
    label: "Build",
    command: "write --code",
    detail: "I write the code, from the first prototype to production features.",
  },
  {
    id: "test",
    label: "Test",
    command: "test --release",
    detail: "Each release is tested before it reaches players or clients.",
    ai: "debug faster",
  },
  {
    id: "ship",
    label: "Ship",
    command: "review && ship",
    detail: "I make the technical decisions and review what ships.",
  },
];
