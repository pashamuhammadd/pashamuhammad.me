import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTelegram, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "CV / Resume",
  description:
    "CV and resume of Pasha Muhammad, founder of Nimia Games and Lifetopia World, covering experience across gaming, Web3, community, and product building.",
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
    org: "Nimia Games",
    description:
      "Running a game studio focused on original games, interactive experiences, and long-term digital IP for global audiences.",
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

const skills = [
  "Product Thinking & Roadmapping",
  "Game & Digital IP Development",
  "Web3 / Solana Ecosystem",
  "Community Building & Growth",
  "Founder-Led Execution",
  "AI-Assisted Product Development",
];

const projects = [
  {
    title: "Lifetopia World",
    description: "GameFi life simulation and social sandbox on Solana, currently in beta development.",
    url: "https://lifetopiaworld.io",
  },
  {
    title: "Nimia Games",
    description: "Game studio building original games and digital IP.",
    url: "https://nimiagames.com",
  },
  {
    title: "pashamuhammad.me",
    description: "Personal founder platform and portfolio.",
    url: "https://pashamuhammad.me",
  },
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

      <article className="mx-auto max-w-4xl">
        <header className="mb-10 border-b border-emerald-400/20 pb-8 print:border-black/20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm print:text-black">
            Curriculum Vitae
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Pasha Muhammad
          </h1>

          <p className="mt-3 text-base text-gray-400 print:text-black/70">
            Founder • Builder • Entrepreneur • Gaming, Web3 &amp; Emerging Technology
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400 print:text-black/70">
            <a
              href="mailto:mochnuribrahimpasha@gmail.com"
              className="inline-flex items-center gap-2 hover:text-emerald-400 print:hover:text-black"
            >
              <Mail size={15} />
              mochnuribrahimpasha@gmail.com
            </a>

            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-emerald-400 print:hover:text-black"
                >
                  <Icon size={15} />
                  {item.title}
                </a>
              );
            })}
          </div>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-[0.2em] text-emerald-400 print:text-black">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-300 sm:text-base print:text-black">
            Indonesian founder building at the intersection of gaming, Web3, community, and
            emerging technology. Founder of Lifetopia World and Nimia Games, with a background
            in community growth and creative production. Focused on turning ambitious ideas into
            real products, thriving communities, and long-term businesses.
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
            Skills &amp; Focus Areas
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-300 print:border-black/20 print:bg-transparent print:text-black"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-[0.2em] text-emerald-400 print:text-black">
            Projects
          </h2>

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.title}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white hover:text-emerald-400 print:text-black"
                >
                  {project.title}
                </a>
                <p className="mt-1 text-sm leading-relaxed text-gray-400 print:text-black/70">
                  {project.description}
                </p>
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
    </main>
  );
}
