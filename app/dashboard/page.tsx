"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  FileText,
  CalendarDays,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import DeleteArticleButton from "@/components/DeleteArticleButton";

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  created_at: string;
  published_at: string | null;
};

export default function DashboardPage() {
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthAndFetchArticles() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, category, status, created_at, published_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      }

      if (data) {
        setArticles(data as Article[]);
      }

      setLoading(false);
    }

    checkAuthAndFetchArticles();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#1f1f27] px-8 py-10 text-white md:px-20">
        <p className="text-gray-400">Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1f1f27] px-8 py-10 text-white md:px-20">
      <nav className="mb-12 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/new"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:scale-105"
          >
            <Plus size={17} />
            New Article
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:border-red-400 hover:text-red-400"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </nav>

      <section className="mb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Dashboard
        </p>

        <h1 className="text-4xl font-bold md:text-6xl">Manage Articles</h1>

        <p className="mt-5 max-w-2xl text-gray-400">
          Create, manage, and publish notes for pashamuhammad.me without editing
          code manually.
        </p>
      </section>

      {articles.length === 0 ? (
        <div className="rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-8 text-center">
          <FileText className="mx-auto text-emerald-400" size={34} />
          <h2 className="mt-4 text-2xl font-bold">No articles yet</h2>
          <p className="mt-2 text-gray-400">
            Start by creating your first article.
          </p>
        </div>
      ) : (
        <section className="space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col gap-5 rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                    {article.category}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      article.status === "published"
                        ? "bg-emerald-400 text-black"
                        : "bg-white/10 text-gray-300"
                    }`}
                  >
                    {article.status}
                  </span>
                </div>

                <h2 className="text-2xl font-bold">{article.title}</h2>

                <p className="mt-2 text-sm text-gray-500">
                  /notes/{article.slug}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays size={15} />
                  {new Date(article.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/notes/${article.slug}`}
                  className="rounded-full border border-emerald-400/30 px-5 py-2 text-sm text-emerald-400 transition hover:bg-emerald-400 hover:text-black"
                >
                  View
                </Link>

                <Link
                  href={`/dashboard/edit/${article.id}`}
                  className="rounded-full border border-white/10 px-5 py-2 text-sm text-gray-300 transition hover:border-emerald-400 hover:text-emerald-400"
                >
                  Edit
                </Link>

                <DeleteArticleButton
                  articleId={article.id}
                  articleTitle={article.title}
                />
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}