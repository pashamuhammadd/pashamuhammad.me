import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaTelegram, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import PrintButton from "@/components/PrintButton";
import { projects, site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "CV / Resume",
  description:
    "CV of Pasha Muhammad, software developer and founder of Nimia Studio, covering client development, games, Solana products, and community work.",
  alternates: {
    canonical: "https://pashamuhammad.me/cv",
  },
};

const experience = [
  {
    year: "2025 - Present",
    role: "Founder",
    org: "Lifetopia World",
    description:
      "Building a cozy life simulation and social sandbox game on Solana, from concept through public alpha, including grant-funded development.",
  },
  {
    year: "2025 - Present",
    role: "Founder",
    org: "Nimia Studio",
    description:
      "Running an animation and development studio that builds websites, games, and original animation for clients.",
  },
  {
    year: "2023 - 2024",
    role: "Founder",
    org: "Lumix Creative Studio",
    description:
      "Founded and ran a remote creative studio delivering animation, design, and community support for Web3 projects.",
  },
  {
    year: "2017 - 2023",
    role: "Community Builder",
    org: "Independent",
    description:
      "Built and managed online communities, growing one Facebook community to more than 53,000 members while learning engagement, leadership, and audience growth.",
  },
];

const education = [
  {
    year: "2020",
    school: "MAN 1 Cianjur",
    detail: "Graduated, then moved into self-directed learning in digital and technology skills.",
  },
];

const technicalSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Unity",
  "Phaser.js",
  "Supabase",
  "Firebase",
  "Solana",
  "Anchor",
  "Rust",
  "Git",
  "Monorepo Architecture",
  "Turborepo",
];

const focusAreas = [
  "Product Thinking & Roadmapping",
  "Game & Digital IP Development",
  "Web3 / Solana Ecosystem",
  "Community Building & Growth",
  "Founder-Led Execution",
  "AI-Assisted Product Development",
];


const socialLinks = [
  { title: "X / Twitter", href: "https://x.com/_pashamuhammad", icon: FaXTwitter },
  { title: "LinkedIn", href: "https://linkedin.com/in/pashamuhammad", icon: FaLinkedin },
  { title: "GitHub", href: "https://github.com/pashamuhammadd", icon: FaGithub },
  { title: "Telegram", href: "https://t.me/pashamuhammadd", icon: FaTelegram },
  { title: "Discord", href: "https://discord.com/users/1198289649643290634", icon: FaDiscord },
];

export default function CvPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#1f1f27] px-4 py-8 text-white sm:px-6 md:px-12 md:py-10 lg:px-20 print:bg-white print:text-black">
      <nav className="mb-10 flex items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <PrintButton />
      </nav>

      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[260px_1fr] print:grid-cols-[200px_1fr] print:gap-8">
        <aside className="space-y-8 md:sticky md:top-10 md:self-start print:static">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-emerald-400/30 shadow-[0_0_50px_rgba(52,211,153,0.15)] print:h-24 print:w-24 print:border-black/20 print:shadow-none">
              <Image
                src="/profile.png"
                alt="Pasha Muhammad"
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>

            <h1 className="mt-5 text-2xl font-bold leading-tight sm:text-3xl">
              Pasha Muhammad
            </h1>

            <p className="mt-2 text-sm text-gray-400 print:text-black/70">
              {site.eyebrow}
            </p>

            <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 print:text-black/60">
              <MapPin size={13} />
              {site.location}
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-400 print:text-black/70">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 break-all hover:text-emerald-400 print:hover:text-black"
            >
              <Mail size={15} className="shrink-0" />
              {site.email}
            </a>

            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 print:hover:text-black"
                >
                  <Icon size={15} className="shrink-0" />
                  {item.title}
                </a>
              );
            })}
          </div>

          <div>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 print:text-black">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {technicalSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 print:border-black/20 print:bg-transparent print:text-black"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 print:text-black">
              Focus Areas
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {focusAreas.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-gray-300 print:border-black/10 print:bg-transparent print:text-black"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <article>
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-bold uppercase tracking-[0.2em] text-emerald-400 print:text-black">
              Summary
            </h2>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base print:text-black">
              Software developer and founder of Nimia Studio, based in Cianjur, Indonesia. I build
              web platforms, games, and products on Solana, from client work such as SlushyMarkets
              to my own game, Lifetopia World. I design the architecture, write the code, and test
              each release, with a background in community growth and creative production.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-lg font-bold uppercase tracking-[0.2em] text-emerald-400 print:text-black">
              Experience
            </h2>

            <div className="space-y-6">
              {experience.map((item) => (
                <div
                  key={`${item.org}-${item.year}`}
                  className="rounded-2xl border border-emerald-400/20 bg-white/[0.04] p-5 print:rounded-none print:border-0 print:border-b print:border-black/10 print:bg-transparent print:p-0 print:pb-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold text-white print:text-black">
                      {item.role} at {item.org}
                    </h3>
                    <span className="text-sm text-emerald-400 print:text-black/60">
                      {item.year}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400 print:text-black/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-lg font-bold uppercase tracking-[0.2em] text-emerald-400 print:text-black">
              Projects
            </h2>

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="flex gap-4 rounded-2xl border border-emerald-400/20 bg-white/[0.04] p-4 print:rounded-none print:border-0 print:border-b print:border-black/10 print:bg-transparent print:p-0 print:pb-5"
                >
                  <div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-white hover:text-emerald-400 print:text-black"
                    >
                      {project.name}
                    </a>
                    <span className="ml-2 text-xs text-emerald-400 print:text-black/60">
                      {project.role}
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-gray-400 print:text-black/70">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-bold uppercase tracking-[0.2em] text-emerald-400 print:text-black">
              Education
            </h2>

            {education.map((item) => (
              <div key={item.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-white print:text-black">
                    {item.school}
                  </h3>
                  <span className="text-sm text-emerald-400 print:text-black/60">
                    {item.year}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-gray-400 print:text-black/70">
                  {item.detail}
                </p>
              </div>
            ))}
          </section>
        </article>
      </div>
    </main>
  );
}
