import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Dev Log",
  description:
    "Live GitHub activity log for Pasha Muhammad, covering commits, pull requests, and releases, pulled straight from GitHub.",
  alternates: {
    canonical: "https://pashamuhammad.me/dev-log",
  },
};

export const revalidate = 300;

const GITHUB_USERNAME = "pashamuhammadd";

type GitHubCommit = {
  sha?: string;
  message?: string;
};

type GitHubEvent = {
  id: string;
  type: string;
  repo?: { name?: string };
  created_at: string;
  payload?: {
    ref_type?: string;
    ref?: string;
    commits?: GitHubCommit[];
    action?: string;
    number?: number;
    pull_request?: { title?: string; merged?: boolean };
    issue?: { title?: string };
    forkee?: { full_name?: string };
    release?: { tag_name?: string };
  };
};

type LogLine = {
  id: string;
  timestamp: string;
  command: string;
  detail?: string[];
};

function timeAgo(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffSec = Math.max(0, Math.floor(diffMs / 1000));

  if (diffSec < 60) return `${diffSec}s ago`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) return `${diffDay}d ago`;

  const diffMonth = Math.floor(diffDay / 30);
  return `${diffMonth}mo ago`;
}

function truncate(text: string, max: number) {
  const firstLine = text.split("\n")[0].trim();
  return firstLine.length > max ? `${firstLine.slice(0, max - 1)}…` : firstLine;
}

function formatEvent(event: GitHubEvent): LogLine | null {
  const repo = event.repo?.name ?? "unknown/repo";
  const payload = event.payload ?? {};

  switch (event.type) {
    case "PushEvent": {
      const commits = payload.commits ?? [];
      if (commits.length === 0) return null;

      return {
        id: event.id,
        timestamp: event.created_at,
        command: `git push ${repo}`,
        detail: commits
          .slice(0, 5)
          .map(
            (c) => `${(c.sha ?? "").slice(0, 7)} ${truncate(c.message ?? "", 72)}`
          ),
      };
    }

    case "CreateEvent": {
      if (payload.ref_type === "repository") {
        return {
          id: event.id,
          timestamp: event.created_at,
          command: `git init ${repo}`,
        };
      }

      if (payload.ref_type === "branch" && payload.ref) {
        return {
          id: event.id,
          timestamp: event.created_at,
          command: `git checkout -b ${payload.ref} (${repo})`,
        };
      }

      return null;
    }

    case "PullRequestEvent": {
      const title = truncate(payload.pull_request?.title ?? "", 60);

      if (payload.action === "opened") {
        return {
          id: event.id,
          timestamp: event.created_at,
          command: `gh pr create ${repo}#${payload.number}`,
          detail: [`"${title}"`],
        };
      }

      if (payload.action === "closed" && payload.pull_request?.merged) {
        return {
          id: event.id,
          timestamp: event.created_at,
          command: `gh pr merge ${repo}#${payload.number}`,
          detail: [`"${title}"`],
        };
      }

      return null;
    }

    case "IssuesEvent": {
      if (payload.action !== "opened") return null;

      return {
        id: event.id,
        timestamp: event.created_at,
        command: `gh issue create ${repo}#${payload.number}`,
        detail: [`"${truncate(payload.issue?.title ?? "", 60)}"`],
      };
    }

    case "WatchEvent":
      return {
        id: event.id,
        timestamp: event.created_at,
        command: `star ${repo}`,
      };

    case "ForkEvent":
      return {
        id: event.id,
        timestamp: event.created_at,
        command: `fork ${repo} -> ${payload.forkee?.full_name ?? "new-fork"}`,
      };

    case "ReleaseEvent":
      return {
        id: event.id,
        timestamp: event.created_at,
        command: `gh release publish ${repo} ${payload.release?.tag_name ?? ""}`,
      };

    case "PublicEvent":
      return {
        id: event.id,
        timestamp: event.created_at,
        command: `chmod +public ${repo}`,
      };

    default:
      return null;
  }
}

async function getGitHubActivity(): Promise<{
  lines: LogLine[];
  errorMessage?: string;
}> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "pashamuhammad-dev-log",
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return { lines: [], errorMessage: `GitHub API returned ${response.status}` };
    }

    const events = (await response.json()) as GitHubEvent[];

    const lines = events
      .map(formatEvent)
      .filter((line): line is LogLine => line !== null)
      .slice(0, 25);

    return { lines };
  } catch {
    return { lines: [], errorMessage: "could not reach GitHub" };
  }
}

export default async function DevLogPage() {
  const { lines, errorMessage } = await getGitHubActivity();

  return (
    <main className="min-h-screen overflow-hidden bg-[#1f1f27] px-4 py-8 text-white sm:px-6 md:px-12 md:py-10 lg:px-20">
      <nav className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <h1 className="text-lg font-bold sm:text-xl">
          pashamuhammad<span className="text-emerald-400">.me</span>
        </h1>
      </nav>

      <section className="mb-10 text-center md:text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm sm:tracking-[0.3em]">
          Dev Log
        </p>

        <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Building in public,
          <br />
          <span className="text-emerald-400">one commit at a time.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:mx-0">
          A live feed of my public GitHub activity, refreshed automatically
          every few minutes, straight from{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            github.com/{GITHUB_USERNAME}
          </a>
          .
        </p>
      </section>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-emerald-400/20 bg-black shadow-[0_0_60px_rgba(16,185,129,0.08)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />

          <span className="ml-3 flex items-center gap-2 text-xs text-gray-500">
            <Terminal size={13} />
            {GITHUB_USERNAME}@github:~/activity
          </span>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5 font-mono text-xs leading-relaxed sm:p-6 sm:text-sm">
          {lines.length === 0 ? (
            <p className="text-gray-500">
              $ no recent public activity found
              {errorMessage ? ` (${errorMessage})` : ""}
              <span className="ml-1 animate-pulse text-emerald-400">
                &#9611;
              </span>
            </p>
          ) : (
            <div className="space-y-4">
              {lines.map((line) => (
                <div key={line.id}>
                  <p className="text-gray-500">
                    [{timeAgo(line.timestamp)}]{" "}
                    <span className="text-emerald-400">$</span>{" "}
                    <span className="text-white">{line.command}</span>
                  </p>

                  {line.detail?.map((detail, index) => (
                    <p key={index} className="pl-4 text-gray-400">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}

              <p className="text-emerald-400">
                $ <span className="animate-pulse">&#9611;</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
