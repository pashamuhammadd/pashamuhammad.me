import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import NotesExplorer from "@/components/NotesExplorer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  status: string;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
};

export default async function NotesPage() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select(
      "id, title, slug, excerpt, category, status, cover_image, published_at, created_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#1f1f27] px-4 py-8 text-white sm:px-6 md:px-12 md:py-10 lg:px-20">
      <nav className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between md:mb-14">
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
          Notes
        </p>

        <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Articles, thoughts,
          <br />
          <span className="text-emerald-400">and builder logs.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:mx-0">
          A collection of notes from my journey building products, communities,
          games, grants, and digital ventures.
        </p>
      </section>

      <NotesExplorer articles={(articles as Article[]) ?? []} />
    </main>
  );
}