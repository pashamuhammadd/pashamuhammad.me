"use client";

import { useState } from "react";

/**
 * The project's own Open Graph image. When the site publishes none, or the
 * image fails to load, a generated default preview is shown instead.
 */
export default function ProjectPreview({
  src,
  name,
  domain,
  index,
}: {
  src: string | null;
  name: string;
  domain: string;
  index: number;
}) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // Remote OG images come from seven different hosts and are already
      // sized for previews, so a plain lazy <img> is used here.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={`${name} preview image`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    );
  }

  return <DefaultPreview name={name} domain={domain} index={index} />;
}

function DefaultPreview({
  name,
  domain,
  index,
}: {
  name: string;
  domain: string;
  index: number;
}) {
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  // A different orbit angle per project keeps the defaults distinct.
  const angle = (index * 53) % 360;

  return (
    <div
      role="img"
      aria-label={`${name} default preview`}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#14181c]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:radial-gradient(#2e3b38_1px,transparent_1px)] [background-size:14px_14px] [mask-image:radial-gradient(closest-side,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute h-[140%] w-[140%] opacity-70"
        style={{
          background: `conic-gradient(from ${angle}deg at 50% 50%, transparent 0deg, rgba(0,206,153,0.22) 40deg, transparent 90deg)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute h-28 w-28 rounded-full border border-[#2c4a42] sm:h-32 sm:w-32"
      />
      <div
        aria-hidden="true"
        className="absolute h-20 w-20 rounded-full border border-[#00ce99]/50 sm:h-24 sm:w-24"
      />
      <span
        aria-hidden="true"
        className="relative text-4xl font-extrabold tracking-[-0.06em] text-[#00ce99] sm:text-5xl"
      >
        {initials}
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-4 font-mono text-[0.7rem] text-[#8f9a97]"
      >
        {domain}
      </span>
    </div>
  );
}
