import Link from "next/link";
import { site } from "@/lib/site-content";

export const container = "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "Devlog", href: "/dev-log" },
  { label: "Notes", href: "/notes" },
  { label: "Contact", href: "/#contact" },
];

const linkFocus =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ce99]";

export function SiteHeader() {
  return (
    <header className={container}>
      <div className="flex flex-wrap items-center justify-between gap-x-6 border-b border-[#3a3b44] py-4 md:h-20 md:flex-nowrap md:py-0">
        <Link
          href="/"
          className={`text-[1.05rem] font-bold tracking-[-0.03em] text-[#f1f4ef] sm:text-xl ${linkFocus}`}
        >
          {site.domain}
        </Link>

        <span className="font-mono text-xs text-[#bec2c4] md:order-last md:text-sm">
          {site.location}
        </span>

        <nav
          aria-label="Primary"
          className="-mx-2 mt-2 flex w-full items-center gap-1 font-mono text-[0.8rem] md:mx-0 md:mt-0 md:ml-auto md:w-auto md:gap-2"
        >
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex min-h-10 items-center px-2 text-[#bec2c4] transition-colors hover:text-[#00ce99] ${linkFocus}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

const footerLinks = [
  { label: "Notes", href: "/notes", external: false },
  { label: "CV", href: "/cv", external: false },
  { label: "Dev log", href: "/dev-log", external: false },
  { label: "GitHub", href: site.github, external: true },
  { label: "X", href: "https://x.com/_pashamuhammad", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/pashamuhammad", external: true },
  { label: "Telegram", href: site.telegram, external: true },
  { label: "Discord", href: "https://discord.com/users/1198289649643290634", external: true },
];

export function SiteFooter() {
  return (
    <footer className={`${container} mt-auto`}>
      <div className="flex flex-col gap-4 border-t border-[#3a3b44] py-8 font-mono text-xs text-[#9ea4a6] md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · Nimia Studio
        </p>
        <ul className="-mx-2 flex flex-wrap">
          {footerLinks.map((item) => (
            <li key={item.label}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex min-h-10 items-center px-2 transition-colors hover:text-[#00ce99] ${linkFocus}`}
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  className={`flex min-h-10 items-center px-2 transition-colors hover:text-[#00ce99] ${linkFocus}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
