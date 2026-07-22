"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ImageIcon } from "lucide-react";

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

const knownCategories = [
  "Founder Notes",
  "Game Development",
  "Web3",
  "AI",
  "Business",
  "Grant Journey",
];

export default function NotesExplorer({ articles }: { articles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoriesInUse = Array.from(
    new Set(articles.map((article) => article.category))
  );

  const visibleCategories = [
    "All",
    ...knownCategories.filter((category) => categoriesInUse.includes(category)),
    ...categoriesInUse.filter((category) => !knownCategories.includes(category)),
  ];

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  if (articles.length === 0) {
    return (
      <section className="rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-6 text-center sm:p-8">
        <p className="text-lg font-semibold text-white">No articles yet.</p>
        <p className="mt-2 text-sm text-gray-400 sm:text-base">
          Published articles will appear here automatically.
        </p>
      </section>
    );
  }

  return (
    <div>
      {visibleCategories.length > 1 && (
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {visibleCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${
                selectedCategory === category
                  ? "border-emerald-400 bg-emerald-400 text-black"
                  : "border-emerald-400/20 bg-white/[0.035] text-gray-300 hover:border-emerald-400 hover:text-emerald-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {filteredArticles.length === 0 ? (
        <section className="rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-6 text-center sm:p-8">
          <p className="text-lg font-semibold text-white">
            No articles in &quot;{selectedCategory}&quot; yet.
          </p>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Try another category to see more notes.
          </p>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => (
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
    </div>
  );
}
