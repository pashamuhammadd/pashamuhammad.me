import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error.message);
    return null;
  }

  return data;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "This article could not be found on Pasha Muhammad's notes.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = article.title;
  const description =
    article.excerpt ||
    stripHtml(article.content || "").slice(0, 155) ||
    "Founder notes by Pasha Muhammad about Web3, gaming, startups, AI, and digital ventures.";

  const url = `https://pashamuhammad.me/notes/${slug}`;
  const image = article.cover_image || "/og-image.png";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Pasha Muhammad",
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: article.published_at || article.created_at,
      modifiedTime:
        article.updated_at || article.published_at || article.created_at,
      authors: ["Pasha Muhammad"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@mochnuribrahimpasha",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function NoteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#1f1f27] px-4 py-8 text-white sm:px-6 md:px-12 lg:px-16">
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Notes
        </Link>

        <div className="mt-12 rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-6 sm:p-7">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Article not found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
            No published article found for slug:{" "}
            <span className="text-emerald-400">{slug}</span>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#1f1f27] px-4 py-8 text-white sm:px-6 md:px-12 lg:px-16">
      <nav className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Notes
        </Link>

        <Link href="/" className="text-lg font-bold md:text-xl">
          pashamuhammad<span className="text-emerald-400">.me</span>
        </Link>
      </nav>

      <article className="mx-auto max-w-4xl">
        {article.cover_image ? (
          <div className="mb-7 overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/[0.04]">
            <img
              src={article.cover_image}
              alt={article.title}
              className="h-[180px] w-full object-cover sm:h-[220px] md:h-[280px]"
            />
          </div>
        ) : (
          <div className="mb-7 flex h-[180px] items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/10 sm:h-[220px] md:h-[260px]">
            <div className="flex flex-col items-center text-emerald-400">
              <ImageIcon size={34} />
              <span className="mt-3 text-xs">No Cover Image</span>
            </div>
          </div>
        )}

        <div className="mb-5">
          <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-400">
            {article.category}
          </span>
        </div>

        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base">
            {article.excerpt}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-500 md:text-sm">
          <span className="flex items-center gap-2">
            <CalendarDays size={15} />
            {article.published_at
              ? new Date(article.published_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Coming Soon"}
          </span>

          <span className="flex items-center gap-2">
            <Clock size={15} />
            Founder Note
          </span>
        </div>

        <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-5 sm:p-6 md:p-8">
          <div
            className="article-content break-words text-sm leading-relaxed sm:text-base"
            dangerouslySetInnerHTML={{
              __html: article.content || "<p>No content available yet.</p>",
            }}
          />
        </div>
      </article>
    </main>
  );
}