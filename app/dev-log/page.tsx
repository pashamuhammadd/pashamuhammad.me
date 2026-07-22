import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getGitHubActivity } from "@/lib/github-activity";
import DevLogTerminal from "@/components/DevLogTerminal";

export const metadata: Metadata = {
  title: "Dev Log",
  description:
    "Live GitHub activity log for Pasha Muhammad, covering commits, pull requests, and releases, pulled straight from GitHub.",
  alternates: {
    canonical: "https://pashamuhammad.me/dev-log",
  },
};

export const revalidate = 300;

export default async function DevLogPage() {
  const initial = await getGitHubActivity();

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#1f1f27] text-white">
      <nav className="flex shrink-0 items-center justify-between gap-4 border-b border-white/5 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <span className="text-sm text-gray-500">
          pashamuhammad<span className="text-emerald-400">.me</span>/dev-log
        </span>
      </nav>

      <div className="min-h-0 flex-1 p-0 sm:p-5 md:p-6 lg:px-10">
        <DevLogTerminal initial={initial} />
      </div>
    </main>
  );
}
