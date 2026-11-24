import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import MotionLab from "./MotionLab";
import BuildFlow from "./BuildFlow";
import ProjectPreview from "./ProjectPreview";
import { DecodeText, TypedCommand } from "./HeroText";
import { container } from "./SiteChrome";
import DevLogTerminal from "@/components/DevLogTerminal";
import {
  buildSteps,
  engineeringStack,
  howIBuild,
  projects,
  site,
} from "@/lib/site-content";
import type { GitHubActivityResult } from "@/lib/github-activity";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ce99]";

const sectionLabel =
  "font-mono text-sm font-semibold uppercase tracking-[0.14em] text-[#f1f4ef]";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`h-[0.9em] w-[0.9em] shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section
      aria-labelledby="hero-name"
      className={`${container} grid items-center gap-6 pt-8 pb-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-8 md:pt-10 lg:gap-10`}
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#f1f4ef] sm:text-sm">
          <span aria-hidden="true" className="text-[#00ce99]">{"// "}</span>
          <DecodeText text={site.eyebrow} duration={700} />
        </p>
        <h1
          id="hero-name"
          className="mt-3 text-[clamp(2.9rem,7.2vw,5.6rem)] leading-[0.92] font-extrabold tracking-[-0.055em] text-[#f1f4ef]"
        >
          <DecodeText text="Pasha" delay={150} duration={650} />
          <br />
          <DecodeText text="Muhammad" delay={300} duration={800} />
          <span className="text-[#00ce99]">.</span>
        </h1>
        <p className="mt-3 text-[clamp(1.25rem,2.2vw,1.9rem)] font-bold tracking-[-0.03em] text-[#f1f4ef]">
          <DecodeText text={site.title} delay={700} duration={700} />
        </p>
        <p className="mt-2 max-w-[42ch] font-mono text-sm leading-relaxed text-[#bec2c4] sm:text-[0.95rem]">
          <span aria-hidden="true" className="text-[#00ce99]">{"> "}</span>
          <DecodeText text={site.intro} delay={1000} duration={1100} />
        </p>
        <TypedCommand items={projects.map((p) => slug(p.name))} />
        <a
          href="#contact"
          className={`mt-6 inline-flex min-h-12 items-center gap-2.5 rounded-[4px] bg-[#00ce99] px-6 text-base font-bold text-[#08231a] shadow-[0_0_30px_rgba(0,206,153,0.25)] transition-colors hover:bg-[#3ff0c0] sm:text-lg ${focusRing}`}
        >
          {site.primaryCta}
          <Arrow />
        </a>
      </div>

      <MotionLab nodes={projects.map(({ name, short }) => ({ name, short }))} />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function StackChip({ item }: { item: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2 rounded-full border border-[#3a3f46] bg-[#1b1c23] px-3.5 py-1.5 font-mono text-[0.8rem] whitespace-nowrap text-[#f1f4ef] transition-colors hover:border-[#00ce99] hover:text-[#3ff0c0]">
      <span aria-hidden="true" className="chip-dot h-1.5 w-1.5 rounded-full bg-[#00ce99]" />
      {item}
    </span>
  );
}

/** Animated signature card: spinning ring, scan line, shimmering "play". */
function Signature() {
  const lead = site.signature.replace(/play\.$/, "");
  return (
    <figure
      className="glow-frame col-span-2 justify-self-start @[1000px]:col-span-1"
      style={{ "--glow-speed": "5s", borderRadius: "10px" } as CSSProperties}
    >
      <div className="relative z-0 m-px flex items-center gap-3 rounded-[9px] bg-[#171a20] py-2 pr-4 pl-2.5">
        <div className="relative h-10 w-10 shrink-0">
          <span aria-hidden="true" className="sig-ring absolute -inset-[3px] rounded-[8px]" />
          <div className="relative h-10 w-10 overflow-hidden rounded-[6px] bg-[#171a20]">
            <Image
              src="/pasha-avatar.webp"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-cover grayscale"
            />
            <span
              aria-hidden="true"
              className="sig-scan absolute inset-x-0 top-0 h-2.5 bg-gradient-to-b from-transparent via-[#00ce99]/45 to-transparent"
            />
          </div>
        </div>
        <blockquote className="min-w-0 text-[0.82rem] leading-snug sm:text-sm">
          <p className="font-semibold text-[#f1f4ef]">
            {lead}
            <span className="shimmer-text">play</span>.
          </p>
          <footer className="mt-0.5 flex items-center gap-1.5 font-mono text-[0.68rem] text-[#8f9a97]">
            <span aria-hidden="true">idea</span>
            <span aria-hidden="true" className="relative h-px w-10 bg-[#34383f]">
              <span className="flow-pulse absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b9ffe8] shadow-[0_0_8px_#00ce99]" />
            </span>
            <span aria-hidden="true" className="text-[#00ce99]">play</span>
            <span className="text-[#bec2c4]">· {site.name}</span>
          </footer>
        </blockquote>
      </div>
    </figure>
  );
}

export function StackStrip() {
  return (
    <section aria-labelledby="stack-label" className={`${container} pt-6`}>
      <div className="@container border-y border-[#3a3b44] py-4">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-4 @[1000px]:grid-cols-[auto_minmax(0,1fr)_auto] @[1000px]:gap-6">
          <h2
            id="stack-label"
            className={`${sectionLabel} max-w-[6.5rem] text-xs leading-tight sm:max-w-none sm:text-sm`}
          >
            Engineering stack
          </h2>

          {/* Scrolling chips; screen readers get the plain list once. */}
          <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="sr-only">
              {engineeringStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div
              aria-hidden="true"
              className="marquee-track flex w-max gap-2 py-1"
              style={{ "--marquee-speed": "55s" } as CSSProperties}
            >
              {engineeringStack.map((item) => (
                <StackChip key={item} item={item} />
              ))}
              <span className="marquee-copy flex gap-2">
                {engineeringStack.map((item) => (
                  <StackChip key={`${item}-copy`} item={item} />
                ))}
              </span>
            </div>
          </div>

          <Signature />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function SelectedWork({ previews }: { previews: (string | null)[] }) {
  return (
    <section
      id="work"
      aria-labelledby="work-label"
      className={`${container} scroll-mt-6 pt-14 md:pt-20`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="work-label" className={sectionLabel}>
          Selected work
        </h2>
        <span className="font-mono text-xs text-[#9ea4a6]">
          {String(projects.length).padStart(2, "0")} projects
        </span>
      </div>

      {/* 2 columns on phones and tablets, 3 on desktop. */}
      <ol className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {projects.map((project, index) => {
          const isSelf = project.url === site.url;
          // The last card fills the row it would otherwise leave half empty.
          const wide = index === projects.length - 1;
          const domain = new URL(project.url).hostname;
          const frameStyle = {
            "--glow-delay": `${-index * 1.3}s`,
            "--glow-speed": `${6 + (index % 3)}s`,
          } as CSSProperties;

          return (
            <li
              key={project.name}
              className={`glow-frame ${wide ? "col-span-2 lg:col-span-3" : ""}`}
              style={frameStyle}
            >
              <a
                href={project.url}
                aria-label={`${project.name}, ${project.role}${isSelf ? "" : " (opens in a new tab)"}`}
                {...(isSelf ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className={`group relative z-0 m-px h-[calc(100%-2px)] overflow-hidden rounded-[11px] bg-[#171a20] transition-transform duration-300 hover:-translate-y-0.5 ${
                  wide ? "grid grid-cols-2 lg:grid-cols-3" : "flex flex-col"
                } ${focusRing} focus-visible:outline-offset-2`}
              >
                <div
                  className={`relative overflow-hidden border-[#2b3036] ${
                    wide ? "min-h-36 border-r lg:aspect-[1200/630]" : "aspect-[1200/630] border-b"
                  }`}
                >
                  <ProjectPreview
                    src={previews[index]}
                    name={project.name}
                    domain={domain}
                    index={index}
                  />
                  <span className="absolute top-2 left-2 rounded-full bg-[#0f1114]/80 px-2 py-0.5 font-mono text-[0.6rem] text-[#3ff0c0] backdrop-blur sm:top-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-[0.68rem]">
                    {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>

                <div className={`flex flex-1 flex-col p-3 sm:p-5 ${wide ? "justify-center lg:col-span-2 lg:px-8" : ""}`}>
                  <p className="font-mono text-[0.62rem] text-[#00ce99] sm:text-[0.75rem]">{project.role}</p>
                  <h3 className="mt-0.5 text-[1rem] leading-tight font-bold tracking-[-0.03em] text-[#f1f4ef] transition-colors group-hover:text-[#3ff0c0] sm:mt-1 sm:text-[1.45rem]">
                    {project.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 font-mono text-[0.68rem] leading-relaxed text-[#bec2c4] sm:mt-2 sm:line-clamp-none sm:text-[0.8rem]">
                    {project.description}
                  </p>
                  <p className="mt-3 hidden flex-wrap gap-1.5 font-mono text-[0.68rem] text-[#aab3b1] sm:flex">
                    <span className="sr-only">Built with: </span>
                    {project.built.map((item) => (
                      <span key={item} className="rounded-full border border-[#30353b] px-2 py-0.5">
                        {item}
                      </span>
                    ))}
                  </p>
                  <span className="mt-auto flex items-center justify-between gap-2 pt-3 font-mono text-[0.62rem] text-[#8f9a97] sm:pt-4 sm:text-xs">
                    <span className="truncate">{domain}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#30353b] text-[#00ce99] transition-colors group-hover:border-[#00ce99] group-hover:bg-[#00ce99] group-hover:text-[#08231a] sm:h-8 sm:w-8">
                      <Arrow />
                    </span>
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function DevlogSection({ initial }: { initial: GitHubActivityResult }) {
  return (
    <section
      id="devlog"
      aria-labelledby="devlog-label"
      className={`${container} scroll-mt-6 pt-14 md:pt-20`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="devlog-label" className={sectionLabel}>
          GitHub devlog
        </h2>
        <Link
          href="/dev-log"
          className={`inline-flex min-h-10 items-center gap-1.5 font-mono text-xs text-[#bec2c4] hover:text-[#00ce99] ${focusRing}`}
        >
          Open full dev log
          <Arrow />
        </Link>
      </div>
      <p className="mt-1 mb-5 max-w-[60ch] text-sm text-[#bec2c4]">
        Live public activity from{" "}
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-[#00ce99] underline-offset-4 hover:underline ${focusRing}`}
        >
          github.com/pashamuhammadd
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        , refreshed every minute.
      </p>

      <DevLogTerminal
        initial={initial}
        endpoint="/api/dev-log?scope=public"
        pollMs={60_000}
        showLatest
        className="min-h-[300px] max-h-[440px]"
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function HowIBuild() {
  return (
    <section
      aria-labelledby="build-label"
      className={`${container} grid items-center gap-10 pt-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 md:pt-24`}
    >
      <div>
        <h2 id="build-label" className={sectionLabel}>
          How I build
        </h2>
        <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-[#bec2c4] sm:text-[1.05rem]">
          {howIBuild}
        </p>
      </div>
      <BuildFlow steps={buildSteps} />
    </section>
  );
}

export function Contact() {
  const secondary = `inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-[#4a4c55] px-5 font-mono text-sm text-[#f1f4ef] transition-colors hover:border-[#00ce99] hover:text-[#00ce99] ${focusRing}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-label"
      className={`${container} scroll-mt-6 pt-16 pb-16 md:pt-24 md:pb-20`}
    >
      <div className="glow-frame" style={{ "--glow-speed": "9s" } as CSSProperties}>
        <div className="relative z-0 m-px grid gap-6 overflow-hidden rounded-[11px] bg-[#171a20] p-6 sm:p-9 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,206,153,0.18),transparent)]"
          />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#00ce99]">
              Contact
            </p>
            <h2
              id="contact-label"
              className="mt-2 text-[clamp(1.9rem,4vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.04em] text-[#f1f4ef]"
            >
              Tell me about your project.
            </h2>
            <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-[#bec2c4] sm:text-base">
              Websites, games, and Solana products, from first prototype to release.
              Send a short brief by email or Telegram.
            </p>
          </div>
          <div className="relative grid grid-cols-2 gap-3 sm:flex sm:flex-wrap md:justify-end">
            <a
              href={`mailto:${site.email}`}
              className={`col-span-2 inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-[4px] bg-[#00ce99] px-5 text-sm font-bold break-all text-[#08231a] sm:text-base transition-colors hover:bg-[#3ff0c0] ${focusRing}`}
            >
              {site.email}
            </a>
            <a href={site.telegram} target="_blank" rel="noopener noreferrer" className={secondary}>
              Telegram
              <Arrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/cv" className={secondary}>
              View CV
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
