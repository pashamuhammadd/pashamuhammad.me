/**
 * Read the Open Graph preview image a project site publishes for SEO.
 * Runs on the server only; results are cached for a day. Returns null when
 * the site has no og:image/twitter:image or cannot be reached, so the UI can
 * show its default preview instead.
 */

const META_KEYS = ["og:image:secure_url", "og:image", "og:image:url", "twitter:image", "twitter:image:src"];

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** Pure HTML parser, exported for tests. */
export function extractOgImage(html: string, pageUrl: string): string | null {
  const head = html.slice(0, 200_000);
  const found = new Map<string, string>();

  for (const tag of head.match(/<meta\b[^>]*>/gi) ?? []) {
    const attrs: Record<string, string> = {};
    for (const [, name, , dq, sq, bare] of tag.matchAll(
      /([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g
    )) {
      attrs[name.toLowerCase()] = dq ?? sq ?? bare ?? "";
    }
    const key = (attrs.property ?? attrs.name ?? "").toLowerCase();
    if (META_KEYS.includes(key) && attrs.content && !found.has(key)) {
      found.set(key, decodeEntities(attrs.content.trim()));
    }
  }

  for (const key of META_KEYS) {
    const raw = found.get(key);
    if (!raw) continue;
    try {
      const resolved = new URL(raw, pageUrl);
      if (resolved.protocol === "https:" || resolved.protocol === "http:") {
        return resolved.toString();
      }
    } catch {
      // ignore malformed URLs and try the next key
    }
  }
  return null;
}

export async function getOgImage(pageUrl: string): Promise<string | null> {
  try {
    const response = await fetch(pageUrl, {
      headers: {
        Accept: "text/html",
        "User-Agent": "Mozilla/5.0 (compatible; pashamuhammad.me link preview)",
      },
      signal: AbortSignal.timeout(6000),
      next: { revalidate: 86_400 },
    });
    if (!response.ok) return null;
    return extractOgImage(await response.text(), response.url || pageUrl);
  } catch {
    return null;
  }
}
