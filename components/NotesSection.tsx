"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  FileText,
  PenLine,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  status: string;
  published_at: string | null;
  created_at: string;
};

const categories = [
  "All",
  "Founder Notes",
  "Game Development",
  "Web3",
  "AI",
  "Business",
  "Grant Journey",
];

export default function NotesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from("articles")
        .select(
          "id, title, slug, excerpt, category, status, published_at, created_at"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!error && data) {
        setArticles(data as Article[]);
      }

      setLoading(false);
    }

    fetchArticles();
  }, []);

  const categoriesInUse = Array.from(
    new Set(articles.map((article) => article.category))
  );

  const visibleCategories = categories.filter(
    (category) => category === "All" || categoriesInUse.includes(category)
  );

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <section className="w-full overflow-hidden px-4 py-14 sm:px-6 md:px-12 md:py-16 lg:px-20">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div className="text-center md:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 sm:text-sm sm:tracking-[0.3em]">
              Notes
            </p>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Thoughts, lessons,
              <br />
              <span className="text-emerald-400">and builder logs.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:mx-0">
              A collection of notes from my journey building products,
              communities, games, grants, and digital ventures.
            </p>
          </div>

          <div className="w-full rounded-3xl border border-emerald-400/20 bg-white/[0.035] px-4 py-3 sm:w-auto">
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                <PenLine size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Dashboard Connected
                </p>
                <p className="text-xs text-gray-500">
                  Articles are loaded from Supabase.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mb-6 flex gap-3 overflow-x-auto pb-2"
        >
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
        </motion.div>

        {loading ? (
          <div className="rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-6 text-center text-sm text-gray-400 sm:text-left">
            Loading articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-6 text-center sm:text-left">
            <FileText
              className="mx-auto text-emerald-400 sm:mx-0"
              size={28}
            />
            <h3 className="mt-4 text-xl font-bold text-white sm:text-2xl">
              No published notes yet
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              Published articles from the dashboard will appear here
              automatically.
            </p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-6 text-center sm:text-left">
            <FileText
              className="mx-auto text-emerald-400 sm:mx-0"
              size={28}
            />
            <h3 className="mt-4 text-xl font-bold text-white sm:text-2xl">
              No notes in &quot;{selectedCategory}&quot; yet
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              Try another category or view all notes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredArticles.slice(0, 3).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative min-h-[260px] overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-5 transition hover:border-emerald-400/80"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                      <FileText size={21} />
                    </div>

                    <span className="rounded-full border border-emerald-400/30 px-3 py-1 text-xs text-emerald-400">
                      Article
                    </span>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-400">
                      {article.category}
                    </span>

                    <span className="flex items-center gap-1 text-gray-500">
                      <CalendarDays size={13} />
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
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                    {article.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-gray-400">
                    {article.excerpt || "No excerpt available."}
                  </p>

                  <Link
                    href={`/notes/${article.slug}`}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-emerald-400 transition group-hover:gap-3"
                  >
                    Read Note
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
              className="flex min-h-[260px] flex-col justify-between rounded-3xl border border-dashed border-emerald-400/30 bg-black/20 p-5"
            >
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-black">
                  <BookOpen size={21} />
                </div>

                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  More Notes
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  View all published articles from the public notes page.
                </p>
              </div>

              <Link
                href="/notes"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400"
              >
                View All Notes
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}