"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import RichTextEditor from "@/components/RichTextEditor";

const categories = [
  "Founder Notes",
  "Game Development",
  "Web3",
  "AI",
  "Business",
  "Grant Journey",
];

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Founder Notes");
  const [coverImage, setCoverImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function checkAuthAndFetchArticle() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        alert("Article not found.");
        router.push("/dashboard");
        return;
      }

      setTitle(data.title || "");
      setCategory(data.category || "Founder Notes");
      setCoverImage(data.cover_image || "");
      setExcerpt(data.excerpt || "");
      setContent(data.content || "");
      setStatus(data.status || "draft");
      setLoading(false);
    }

    checkAuthAndFetchArticle();
  }, [id, router]);

  async function handleUpdate(nextStatus: "draft" | "published") {
    if (!title.trim()) {
      alert("Title wajib diisi.");
      return;
    }

    setIsSaving(true);

    const { error } = await supabase
      .from("articles")
      .update({
        title,
        slug: createSlug(title),
        category,
        cover_image: coverImage,
        excerpt,
        content,
        status: nextStatus,
        updated_at: new Date().toISOString(),
        published_at:
          nextStatus === "published" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    setIsSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#1f1f27] px-8 py-10 text-white md:px-20">
        <p className="text-gray-400">Checking access...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1f1f27] px-8 py-10 text-white md:px-20">
      <nav className="mb-12">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>
      </nav>

      <section className="mb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Dashboard
        </p>

        <h1 className="text-4xl font-bold md:text-6xl">Edit Article</h1>

        <p className="mt-5 max-w-2xl text-gray-400">
          Update your article content, category, cover image, and publish
          status.
        </p>
      </section>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleUpdate("published");
        }}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm text-gray-400">Title</label>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-2xl border border-emerald-400/20 bg-white/[0.04] px-5 py-4 outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">Category</label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-2xl border border-emerald-400/20 bg-[#1f1f27] px-5 py-4 outline-none focus:border-emerald-400"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Cover Image URL
          </label>

          <input
            type="text"
            value={coverImage}
            onChange={(event) => setCoverImage(event.target.value)}
            className="w-full rounded-2xl border border-emerald-400/20 bg-white/[0.04] px-5 py-4 outline-none focus:border-emerald-400"
            placeholder="https://example.com/cover.jpg"
          />

          {coverImage && (
            <div className="mt-4 overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/[0.04]">
              <img
                src={coverImage}
                alt="Cover preview"
                className="h-64 w-full object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">Excerpt</label>

          <textarea
            rows={3}
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            className="w-full rounded-2xl border border-emerald-400/20 bg-white/[0.04] px-5 py-4 outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">Content</label>

          <RichTextEditor content={content} onChange={setContent} />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleUpdate("draft")}
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-gray-300 transition hover:border-emerald-400 hover:text-emerald-400 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save as Draft"}
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 disabled:opacity-50"
          >
            {isSaving ? "Publishing..." : "Publish Update"}
          </button>

          {status === "published" && (
            <Link
              href={`/notes/${createSlug(title)}`}
              className="rounded-full border border-emerald-400/30 px-6 py-3 text-sm text-emerald-400 transition hover:bg-emerald-400 hover:text-black"
            >
              View Article
            </Link>
          )}
        </div>
      </form>
    </main>
  );
}