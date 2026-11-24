import Image from "next/image";
import Link from "next/link";
import MotionLab from "./MotionLab";
import { container } from "./SiteChrome";
import {
  engineeringStack,
  howIBuild,
  projects,
  site,
} from "@/lib/site-content";
import type { ActivityHighlight } from "@/lib/github-activity";

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

/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section
      aria-labelledby="hero-name"
      className={`${container} grid items-center gap-8 pt-8 pb-8 md:grid-cols-2 md:gap-10 md:pt-12 lg:gap-12 lg:pt-14`}
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#f1f4ef] sm:text-sm">
          {site.eyebrow}
        </p>
        <h1
          id="hero-name"
          className="mt-3 text-[clamp(2.9rem,7.2vw,5.6rem)] leading-[0.92] font-extrabold tracking-[-0.055em] text-[#f1f4ef]"
        >
          Pasha
          <br />
          Muhammad<span className="text-[#00ce99]">.</span>
        </h1>
        <p className="mt-3 text-[clamp(1.25rem,2.2vw,1.9rem)] font-bold tracking-[-0.03em] text-[#f1f4ef]">
          {site.title}
        </p>
        <p className="mt-2 max-w-[42ch] font-mono text-sm leading-relaxed text-[#bec2c4] sm:text-[0.95rem]">
          {site.intro}
        </p>
        <a
          href="#contact"
          className={`mt-6 inline-flex min-h-12 items-center gap-2.5 rounded-[4px] bg-[#00ce99] px-6 text-base font-bold text-[#08231a] transition-colors hover:bg-[#3ff0c0] sm:text-lg ${focusRing}`}
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

export function StackStrip() {
  return (
    <section aria-labelledby="stack-label" className={container}>
      <div className="@container border-b border-[#3a3b44] pb-6 md:rounded-md md:border md:px-4 md:py-3">
        <div className="grid gap-5 @[1060px]:grid-cols-[1fr_auto] @[1060px]:items-center @[1060px]:gap-0">
          <div className="flex flex-col gap-3 @[1060px]:flex-row @[1060px]:items-center">
            <h2 id="stack-label" className={`${sectionLabel} shrink-0 @[1060px]:pr-5`}>
              Engineering stack
            </h2>
            <ul className="flex flex-wrap gap-2 @[1060px]:gap-0">
              {engineeringStack.map((item) => (
                <li
                  key={item}
                  className="rounded-[4px] border border-[#4a4c55] px-3 py-1.5 font-mono text-[0.8rem] text-[#f1f4ef] @[1060px]:rounded-none @[1060px]:border-0 @[1060px]:border-l @[1060px]:px-4 @[1060px]:py-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <figure className="flex min-h-12 items-center gap-3 @[1060px]:border-l @[1060px]:border-[#4a4c55] @[1060px]:pl-5">
            <Image
              src="/pasha-avatar.webp"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-[5px] border border-[#49544e] object-cover grayscale"
            />
            <blockquote className="text-sm leading-snug">
              <p className="font-semibold text-[#f1f4ef]">{site.signature}</p>
              <footer className="font-mono text-xs text-[#bec2c4]">{site.name}</footer>
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-label"
      className={`${container} scroll-mt-6 pt-12 md:pt-16`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="work-label" className={sectionLabel}>
          Selected work
        </h2>
        <span className="font-mono text-xs text-[#9ea4a6]">
          {String(projects.length).padStart(2, "0")} projects
        </span>
      </div>

      <ol className="mt-5 border-b border-[#3a3b44]">
        {projects.map((project) => {
          const isSelf = project.url === site.url;
          return (
            <li key={project.name} className="border-t border-[#3a3b44]">
              <a
                href={project.url}
                {...(isSelf ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className={`group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)_7rem_auto] md:gap-x-8 md:py-5 ${focusRing} focus-visible:outline-offset-0`}
              >
                <div className="min-w-0 md:border-r md:border-[#3a3b44] md:pr-8">
                  <h3 className="text-[1.35rem] leading-tight font-bold tracking-[-0.03em] text-[#f1f4ef] transition-colors group-hover:text-[#00ce99] sm:text-2xl md:text-[1.75rem]">
                    {project.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-[0.8rem] text-[#00ce99] sm:text-sm">
                    {project.role}
                  </p>
                </div>

                <div className="col-span-2 row-start-2 md:col-span-1 md:row-start-auto">
                  <p className="max-w-[60ch] font-mono text-[0.82rem] leading-relaxed text-[#bec2c4] sm:text-sm">
                    {project.description}
                  </p>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.72rem] text-[#8f9a97]">
                    <span className="sr-only">Built with: </span>
                    {project.built.map((item) => (
                      <span key={item} className="before:mr-1.5 before:text-[#00ce99] before:content-['/']">
                        {item}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="hidden md:block">
                  {project.featured ? (
                    <Image
                      src={project.featured.image}
                      alt={project.featured.alt}
                      width={112}
                      height={72}
                      className="h-[72px] w-28 rounded-[4px] border border-[#3a3b44] object-cover"
                    />
                  ) : null}
                </div>

                <span className="col-start-2 row-start-1 flex h-10 w-10 items-center justify-center text-xl text-[#00ce99] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:col-start-auto md:row-start-auto">
                  <Arrow />
                  <span className="sr-only">
                    {isSelf ? "" : " (opens in a new tab)"}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const KIND_LABEL: Record<ActivityHighlight["kind"], string> = {
  release: "Release",
  pr: "Pull request",
  push: "Push",
  create: "Branch",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function DevlogFeed({
  items,
  errorMessage,
}: {
  items: ActivityHighlight[];
  errorMessage?: string;
}) {
  const profileLink = (
    <a
      href={site.github}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-10 items-center gap-1.5 font-mono text-sm text-[#00ce99] underline-offset-4 hover:underline ${focusRing}`}
    >
      View my GitHub profile
      <Arrow />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );

  return (
    <section
      id="devlog"
      aria-labelledby="devlog-label"
      className={`${container} scroll-mt-6 pt-12 md:pt-16`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="devlog-label" className={sectionLabel}>
          GitHub devlog
        </h2>
        <Link
          href="/dev-log"
          className={`inline-flex min-h-10 items-center gap-1.5 font-mono text-xs text-[#bec2c4] hover:text-[#00ce99] ${focusRing}`}
        >
          Full dev log
          <Arrow />
        </Link>
      </div>
      <p className="mt-1 max-w-[60ch] text-sm text-[#bec2c4]">
        Recent public releases, pull requests, and pushes, pulled from GitHub.
      </p>

      {items.length === 0 ? (
        <div className="mt-5 rounded-md border border-dashed border-[#4a4c55] px-4 py-5">
          <p className="font-mono text-sm text-[#bec2c4]">
            {errorMessage
              ? "GitHub activity is unavailable right now."
              : "No recent public activity to show yet."}
          </p>
          <div className="mt-2">{profileLink}</div>
        </div>
      ) : (
        <>
          <ul className="mt-5 grid gap-px overflow-hidden rounded-md border border-[#3a3b44] bg-[#3a3b44]">
            {items.map((item) => (
              <li key={item.id} className="bg-[#1f1f27]">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group grid gap-1 px-4 py-3.5 transition-colors hover:bg-[#171a20] sm:grid-cols-[9.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6 ${focusRing} focus-visible:outline-offset-[-2px]`}
                >
                  <span className="flex items-center gap-3 font-mono text-xs text-[#9ea4a6]">
                    <time dateTime={item.timestamp}>{formatDate(item.timestamp)}</time>
                    <span className="text-[#00ce99] sm:hidden">{KIND_LABEL[item.kind]}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[0.95rem] font-semibold text-[#f1f4ef] group-hover:text-[#00ce99]">
                      {item.project ?? item.repo.split("/")[1]}
                      <span className="ml-2 font-mono text-xs font-normal text-[#8f9a97]">
                        {item.repo}
                      </span>
                    </span>
                    <span className="block truncate font-mono text-[0.8rem] text-[#bec2c4]">
                      {item.summary}
                    </span>
                  </span>
                  <span className="hidden items-center gap-2 font-mono text-xs text-[#00ce99] sm:flex">
                    {KIND_LABEL[item.kind]}
                    <Arrow />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3">{profileLink}</div>
        </>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function BuildAndContact() {
  const secondary = `inline-flex min-h-12 items-center gap-2 rounded-[4px] border border-[#4a4c55] px-5 font-mono text-sm text-[#f1f4ef] transition-colors hover:border-[#00ce99] hover:text-[#00ce99] ${focusRing}`;

  return (
    <section
      aria-label="How I build and contact"
      className={`${container} grid gap-10 pt-12 pb-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 md:pt-16 md:pb-20`}
    >
      <div>
        <h2 className={sectionLabel}>How I build</h2>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-[#bec2c4] sm:text-[1.05rem]">
          {howIBuild}
        </p>
      </div>

      <div
        id="contact"
        className="scroll-mt-6 rounded-md border border-[#3a4046] bg-[#171a20] p-5 sm:p-7"
      >
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#00ce99]">
          Contact
        </p>
        <h2 className="mt-2 text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.05] font-extrabold tracking-[-0.04em] text-[#f1f4ef]">
          Tell me about your project.
        </h2>
        <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-[#bec2c4] sm:text-base">
          Websites, games, and Solana products, from first prototype to release.
          Send a short brief by email or Telegram.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className={`inline-flex min-h-12 items-center gap-2 rounded-[4px] bg-[#00ce99] px-5 font-bold text-[#08231a] transition-colors hover:bg-[#3ff0c0] ${focusRing}`}
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
    </section>
  );
}
