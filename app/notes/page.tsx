import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

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

      {!articles || articles.length === 0 ? (
        <section className="rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-6 text-center sm:p-8">
          <p className="text-lg font-semibold text-white">No articles yet.</p>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Published articles will appear here automatically.
          </p>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {(articles as Article[]).map((article) => (
            <Link
              key={article.id}
              href={`/notes/${article.slug}`}
              className="group overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/[0.04] transition hover:-translate-y-2 hover:border-emerald-400/80"
            >
              {article.cover_image ? (
                <div className="h-44 w-full overflow-hidden bg-black/20 sm:h-48">
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex h-44 w-full items-center justify-center bg-emerald-400/10 sm:h-48">
                  <div className="flex flex-col items-center text-emerald-400">
                    <ImageIcon size={32} />
                    <span className="mt-3 text-xs">No Cover Image</span>
                  </div>
                </div>
              )}

              <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                    {article.category}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-emerald-400 transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

                <h3 className="text-xl font-bold sm:text-2xl">
                  {article.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
                  {article.excerpt || "No excerpt available."}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays size={15} />
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                    : "Coming Soon"}
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}