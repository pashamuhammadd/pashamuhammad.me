"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  CircleDot,
  FolderGit2,
  GitBranch,
  GitCommitHorizontal,
  GitFork,
  GitPullRequest,
  Globe,
  Star,
  Tag,
  Terminal,
} from "lucide-react";
import type { GitHubActivityResult, LogKind, LogLine } from "@/lib/github-activity";

const POLL_INTERVAL_MS = 90_000;

const KIND_ICON: Record<LogKind, typeof GitCommitHorizontal> = {
  push: GitCommitHorizontal,
  create: FolderGit2,
  pr: GitPullRequest,
  issue: CircleDot,
  star: Star,
  fork: GitFork,
  release: Tag,
  public: Globe,
};

function formatExact(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}

function TypedText({ text, speed = 14 }: { text: string; speed?: number }) {
  const reducedMotion = usePrefersReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reducedMotion ? text.length : 0);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(text.length);
      return;
    }

    setVisibleCount(0);
    let count = 0;

    const interval = setInterval(() => {
      count += 1;
      setVisibleCount(count);

      if (count >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reducedMotion]);

  return <>{text.slice(0, visibleCount)}</>;
}

function LogEntry({ line }: { line: LogLine }) {
  const Icon = KIND_ICON[line.kind] ?? Terminal;

  return (
    <div>
      <p className="flex flex-wrap items-center gap-2 text-gray-500">
        <span className="text-[10px] sm:text-xs">[{formatExact(line.timestamp)}]</span>
        <Icon size={13} className="shrink-0 text-emerald-400" />
        <span className="text-emerald-400">$</span>
        <span className="text-white">
          <TypedText text={line.command} />
        </span>
        {line.isPrivate ? (
          <span className="text-amber-400">[private]</span>
        ) : null}
      </p>

      {line.detail?.map((detail, index) => (
        <p key={index} className="pl-5 text-gray-400 sm:pl-6">
          <TypedText text={detail} speed={8} />
        </p>
      ))}
    </div>
  );
}

export default function DevLogTerminal({
  initial,
}: {
  initial: GitHubActivityResult;
}) {
  const [data, setData] = useState<GitHubActivityResult>(initial);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const isFetching = useRef(false);

  useEffect(() => {
    async function poll() {
      if (isFetching.current) return;
      isFetching.current = true;

      try {
        const response = await fetch("/api/dev-log", { cache: "no-store" });
        if (response.ok) {
          const fresh = (await response.json()) as GitHubActivityResult;
          setData(fresh);
          setLastSynced(new Date());
        }
      } catch {
        // silently keep showing the last known good data
      } finally {
        isFetching.current = false;
      }
    }

    const interval = setInterval(poll, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const { lines, errorMessage, usingToken } = data;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-none border-y border-emerald-400/20 bg-black sm:rounded-2xl sm:border shadow-[0_0_60px_rgba(16,185,129,0.08)]">
      {/* retro scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div className="relative z-20 flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />

        <span className="ml-3 flex items-center gap-2 text-xs text-gray-500">
          <Terminal size={13} />
          pashamuhammadd@github:~/activity
        </span>

        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400 sm:text-xs">
          <Activity size={12} className="animate-pulse" />
          live
        </span>
      </div>

      <div className="relative z-20 flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed sm:p-6 sm:text-sm">
        {lines.length === 0 ? (
          <p className="text-gray-500">
            $ no recent activity found
            {errorMessage ? ` (${errorMessage})` : ""}
            <span className="ml-1 animate-pulse text-emerald-400">&#9611;</span>
          </p>
        ) : (
          <div className="space-y-4">
            {lines.map((line) => (
              <LogEntry key={line.id} line={line} />
            ))}

            <p className="text-emerald-400">
              $ <span className="animate-pulse">&#9611;</span>
            </p>
          </div>
        )}
      </div>

      <div className="relative z-20 flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] px-4 py-2 text-[10px] text-gray-600 sm:text-xs">
        <span>
          {usingToken ? "public + private repos" : "public repos only"}
        </span>
        <span>
          {lastSynced
            ? `synced ${lastSynced.toLocaleTimeString()}`
            : "auto-refreshing every 90s"}
        </span>
      </div>
    </div>
  );
}
