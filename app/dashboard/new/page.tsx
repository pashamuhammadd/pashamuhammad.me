"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function NewArticlePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Founder Notes");
  const [coverImage, setCoverImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setCheckingAuth(false);
    }

    checkAuth();
  }, [router]);

  async function handleSave(status: "draft" | "published") {
    if (!title.trim()) {
      alert("Title wajib diisi.");
      return;
    }

    setIsSaving(true);

    const slug = createSlug(title);

    const { error } = await supabase.from("articles").insert({
      title,
      slug,
      category,
      cover_image: coverImage,
      excerpt,
      content,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    });

    setIsSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  if (checkingAuth) {
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

        <h1 className="text-4xl font-bold md:text-6xl">Create New Article</h1>

        <p className="mt-5 max-w-2xl text-gray-400">
          Write and publish articles without editing code.
        </p>
      </section>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSave("published");
        }}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm text-gray-400">Title</label>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-2xl border border-emerald-400/20 bg-white/[0.04] px-5 py-4 outline-none focus:border-emerald-400"
            placeholder="Building Lifetopia World"
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

          <p className="mt-2 text-xs text-gray-500">
            Use an image URL from Cloudinary, Supabase Storage, or any public
            image link.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">Excerpt</label>

          <textarea
            rows={3}
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            className="w-full rounded-2xl border border-emerald-400/20 bg-white/[0.04] px-5 py-4 outline-none focus:border-emerald-400"
            placeholder="Short description..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">Content</label>

          <RichTextEditor content={content} onChange={setContent} />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("draft")}
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-gray-300 transition hover:border-emerald-400 hover:text-emerald-400 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 disabled:opacity-50"
          >
            {isSaving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>
    </main>
  );
}