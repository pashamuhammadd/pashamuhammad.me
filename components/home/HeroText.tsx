"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const GLYPHS = "01<>/{}[]=+*#_$;:";

function scramble(text: string, revealed: number, seed: number) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (i < revealed || ch === " " || ch === "\n") out += ch;
    else out += GLYPHS[(i * 7 + seed) % GLYPHS.length];
  }
  return out;
}

/**
 * Text that "decodes" from code glyphs into the real copy, left to right.
 * Server render and first client render are the final text, so the copy is
 * always present for search engines, no-JS visitors, and screen readers.
 */
export function DecodeText({
  text,
  delay = 0,
  duration = 900,
  className,
}: {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start - delay;
      const progress = Math.max(0, Math.min(1, elapsed / duration));
      const revealed = Math.floor(progress * text.length);
      setShown(progress >= 1 ? text : scramble(text, revealed, Math.floor(now / 55)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      setShown(text);
    };
  }, [text, delay, duration, reduced]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{reduced ? text : shown}</span>
    </span>
  );
}

/**
 * A terminal line that types `$ open work/<project>`, holds, deletes, and
 * moves to the next project. Decorative: the projects are listed in HTML
 * in Selected work.
 */
export function TypedCommand({ items }: { items: string[] }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(items[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || items.length === 0) return;
    const word = items[index];
    let wait = deleting ? 28 : 70;
    if (!deleting && length === word.length) wait = 1800;
    if (deleting && length === 0) wait = 260;

    const timer = setTimeout(() => {
      if (!deleting && length === word.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % items.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, wait);
    return () => clearTimeout(timer);
  }, [index, length, deleting, items, reduced]);

  const word = items[index] ?? "";

  return (
    <p
      aria-hidden="true"
      className="mt-4 flex min-h-6 items-center gap-2 font-mono text-[0.8rem] text-[#8f9a97] sm:text-sm"
    >
      <span className="text-[#00ce99]">$</span>
      <span>open</span>
      <span className="text-[#f1f4ef]">
        work/{reduced ? items[0] : word.slice(0, length)}
      </span>
      <span className="caret -ml-1 inline-block h-[1.1em] w-[0.55em] bg-[#00ce99]" />
    </p>
  );
}
