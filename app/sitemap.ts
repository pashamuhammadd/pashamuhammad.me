import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pashamuhammad.me";

  const { data: articles, error } = await supabase
    .from("articles")
    .select("slug, published_at, updated_at, created_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("sitemap: failed to load articles", error.message);
  }

  const articleEntries: MetadataRoute.Sitemap = (articles ?? []).map(
    (article) => ({
      url: `${baseUrl}/notes/${article.slug}`,
      lastModified: new Date(
        article.updated_at || article.published_at || article.created_at
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...articleEntries,
  ];
}
