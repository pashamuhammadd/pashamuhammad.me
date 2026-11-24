import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { extractOgImage, getOgImage } from "../lib/og-preview.ts";

const realFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = realFetch; });

test("reads og:image in either attribute order and resolves relative URLs", () => {
  assert.equal(
    extractOgImage('<meta property="og:image" content="https://a.com/og.png"/>', "https://a.com"),
    "https://a.com/og.png"
  );
  assert.equal(
    extractOgImage("<meta content='/img/og.jpg' property='og:image'>", "https://b.io/page"),
    "https://b.io/img/og.jpg"
  );
  assert.equal(
    extractOgImage('<meta name="twitter:image" content="https://c.fun/x?a=1&amp;b=2">', "https://c.fun"),
    "https://c.fun/x?a=1&b=2"
  );
});

test("prefers og:image over twitter:image and ignores non-http schemes", () => {
  const html = '<meta name="twitter:image" content="https://t.png"><meta property="og:image" content="https://o.png">';
  assert.equal(extractOgImage(html, "https://x.com"), "https://o.png/");
  assert.equal(extractOgImage('<meta property="og:image" content="javascript:alert(1)">', "https://x.com"), null);
});

test("returns null when the site has no preview image", () => {
  assert.equal(extractOgImage("<html><head><title>x</title></head></html>", "https://x.com"), null);
});

test("returns null on HTTP errors and network failures", async () => {
  globalThis.fetch = async () => new Response("nope", { status: 500 });
  assert.equal(await getOgImage("https://down.example"), null);
  globalThis.fetch = async () => { throw new TypeError("fetch failed"); };
  assert.equal(await getOgImage("https://down.example"), null);
});
