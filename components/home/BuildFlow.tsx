"use client";

import { useEffect, useRef, useState } from "react";
import type { BuildStep } from "@/lib/site-content";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const STEP_MS = 2600;

/**
 * Animated walkthrough of how a release moves from design to ship. Cycles
 * on its own while visible; visitors can pick a step to stop the cycle.
 */
export default function BuildFlow({ steps }: { steps: BuildStep[] }) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((e) => e.isIntersecting)),
      { threshold: 0.25 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const running = inView && !manual && !reduced;

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % steps.length);
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [running, steps.length]);

  const current = steps[active];

  return (
    <div ref={rootRef} className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-8%] bg-[radial-gradient(closest-side,rgba(0,206,153,0.12),transparent)]"
      />

      <div className="relative flex items-center justify-between font-mono text-[0.7rem] text-[#8f9a97] sm:text-xs">
        <span className="flex items-center gap-2 text-[#c6d3ce]">
          <span aria-hidden="true" className="chip-dot h-1.5 w-1.5 rounded-full bg-[#00ce99]" />
          Release pipeline
        </span>
        <span>
          {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
        </span>
      </div>

      {/* pipeline: horizontal on every screen size */}
      <ol className="relative mt-6 grid grid-cols-4">
        {steps.map((step, index) => {
          const done = reduced || index < active;
          const isActive = index === active;
          const last = index === steps.length - 1;
          return (
            <li key={step.id} className="relative flex flex-col items-center text-center">
              {/* connector to the next step */}
              {!last ? (
                <span
                  aria-hidden="true"
                  className="absolute top-[17px] left-[calc(50%+18px)] h-px w-[calc(100%-36px)] bg-[#34383f] sm:top-[19px] sm:left-[calc(50%+20px)] sm:w-[calc(100%-40px)]"
                >
                  <span
                    className={`absolute inset-0 origin-left bg-[#00ce99] transition-transform duration-700 ${
                      done ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                  {isActive && running ? (
                    <span className="flow-pulse absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b9ffe8] shadow-[0_0_12px_#00ce99]" />
                  ) : null}
                </span>
              ) : null}

              <button
                type="button"
                aria-current={isActive ? "step" : undefined}
                onClick={() => {
                  setActive(index);
                  setManual(true);
                }}
                className="group relative z-10 flex flex-col items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ce99] sm:gap-3"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[0.7rem] transition-all duration-500 sm:h-10 sm:w-10 sm:text-xs ${
                    isActive
                      ? "scale-110 border-[#00ce99] bg-[#00ce99] text-[#08231a] shadow-[0_0_24px_rgba(0,206,153,0.55)]"
                      : done
                        ? "border-[#00ce99] bg-[#14251f] text-[#3ff0c0]"
                        : "border-[#3a3f46] bg-[#1b1c23] text-[#8f9a97] group-hover:border-[#00ce99]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span
                    className={`block text-sm font-semibold transition-colors sm:text-base ${
                      isActive ? "text-[#f1f4ef]" : "text-[#bec2c4]"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="hidden font-mono text-[0.7rem] text-[#8f9a97] sm:block">
                    {step.command}
                  </span>
                </span>
              </button>

              {/* AI assist badge for the steps where AI helps */}
              {step.ai ? (
                <span
                  className={`mt-2 rounded-full border px-2 py-0.5 font-mono text-[0.62rem] whitespace-nowrap transition-all duration-500 sm:text-[0.65rem] ${
                    isActive
                      ? "border-[#00ce99] bg-[#00ce99]/15 text-[#3ff0c0] shadow-[0_0_14px_rgba(0,206,153,0.35)]"
                      : "border-dashed border-[#3a3f46] text-[#8f9a97]"
                  }`}
                >
                  AI<span className="hidden lg:inline"> · {step.ai}</span>
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      {/* live caption */}
      <div className="relative mt-5 rounded-md border border-[#2f343a] bg-[#14161b]/80 px-4 py-3 font-mono text-[0.78rem] leading-relaxed sm:text-[0.8rem]">
        <p className="text-[#8f9a97]">
          <span className="text-[#00ce99]">$</span> {current.command}
        </p>
        <p aria-live="polite" className="mt-1 min-h-[2.6em] text-[#e3e8e6]">
          {current.detail}
          {current.ai ? (
            <span className="text-[#3ff0c0]"> AI helps me {current.ai}.</span>
          ) : null}
          <span aria-hidden="true" className="caret ml-1 inline-block h-[1em] w-[0.5em] translate-y-[2px] bg-[#00ce99]" />
        </p>
      </div>
    </div>
  );
}
