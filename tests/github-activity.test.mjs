// Run with: npm test  (Node >= 22.18 strips TypeScript types natively)
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  getGitHubActivity,
  parseEvents,
  pickHighlights,
} from "../lib/github-activity.ts";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
  delete process.env.GITHUB_TOKEN;
});

// Shapes copied from the live public Events API (Nov 2026): PushEvent has
// no `commits`, PullRequestEvent uses action "merged" and has no title.
const publicEvents = [
  {
    id: "1",
    type: "PushEvent",
    public: true,
    created_at: "2026-11-23T14:23:12Z",
    repo: { name: "pashamuhammadd/cuanweb3" },
    payload: {
      ref: "refs/heads/main",
      head: "ee23c3c15a908dd6d9b01d2b69d4ff6dc1d8436e",
      before: "2e3df3b81eb3e0ade6f58fe3e2d08b15fa311e7a",
    },
  },
  {
    id: "1b",
    type: "PushEvent",
    public: true,
    created_at: "2026-11-23T10:00:00Z",
    repo: { name: "pashamuhammadd/cuanweb3" },
    payload: { ref: "refs/heads/main", head: "aaaaaaa1", before: "bbbbbbb2" },
  },
  {
    id: "2",
    type: "PullRequestEvent",
    public: true,
    created_at: "2026-11-03T04:47:53Z",
    repo: { name: "pashamuhammadd/nimia-games" },
    payload: { action: "merged", number: 2, pull_request: { number: 2 } },
  },
  {
    id: "3",
    type: "ReleaseEvent",
    public: true,
    created_at: "2026-10-01T00:00:00Z",
    repo: { name: "pashamuhammadd/railsight" },
    payload: {
      release: {
        tag_name: "v1.0.0",
        html_url: "https://github.com/pashamuhammadd/railsight/releases/tag/v1.0.0",
      },
    },
  },
  {
    id: "4",
    type: "DeleteEvent",
    public: true,
    created_at: "2026-11-03T05:00:00Z",
    repo: { name: "pashamuhammadd/nimia-games" },
    payload: {},
  },
  {
    id: "5",
    type: "PushEvent",
    public: true,
    created_at: "2026-11-02T00:00:00Z",
    repo: { name: "someone-else/repo" },
    payload: { ref: "refs/heads/main", head: "cccccc" },
  },
];

const privateEvent = {
  id: "9",
  type: "PushEvent",
  public: false,
  created_at: "2026-11-24T00:00:00Z",
  repo: { name: "pashamuhammadd/secret-client-app" },
  payload: {
    ref: "refs/heads/feature/client-x",
    head: "deadbeefdeadbeef",
    commits: [{ sha: "deadbeef", message: "Add client X billing" }],
  },
};

test("parses current Events API shapes (no commits / merged action)", () => {
  const lines = parseEvents(publicEvents);
  const kinds = lines.map((l) => `${l.kind}:${l.id}`);
  assert.deepEqual(kinds, ["push:1", "push:1b", "pr:2", "release:3"]);

  const push = lines[0];
  assert.equal(
    push.url,
    "https://github.com/pashamuhammadd/cuanweb3/compare/2e3df3b81eb3...ee23c3c15a90"
  );
  assert.match(push.summary, /Pushed to main at ee23c3c/);

  const pr = lines[2];
  assert.equal(pr.url, "https://github.com/pashamuhammadd/nimia-games/pull/2");
  assert.equal(pr.summary, "Merged pull request #2");
});

test("private events are redacted before leaving the server", () => {
  const [line] = parseEvents([privateEvent]);
  assert.equal(line.isPrivate, true);
  assert.equal(line.repo, undefined);
  assert.equal(line.url, undefined);
  assert.equal(line.detail, undefined);
  const serialized = JSON.stringify(line);
  for (const leak of ["secret-client-app", "client-x", "billing", "deadbeef"]) {
    assert.ok(!serialized.includes(leak), `leaked ${leak}`);
  }
});

test("highlights: public only, release/PR prioritized, one push per repo, newest first", () => {
  const lines = parseEvents([privateEvent, ...publicEvents]);
  const items = pickHighlights(lines, 5);
  assert.deepEqual(
    items.map((i) => i.id),
    ["1", "2", "3"]
  );
  assert.equal(items[0].project, "CuanWeb3");
  assert.equal(items[1].project, "Nimia Studio");
  assert.ok(items.every((i) => i.url.startsWith("https://github.com/pashamuhammadd/")));

  const limited = pickHighlights(lines, 2);
  assert.deepEqual(limited.map((i) => i.kind).sort(), ["pr", "release"]);
});

test("normal response through getGitHubActivity uses the public endpoint without a token", async () => {
  let calledUrl = "";
  let sentAuth;
  globalThis.fetch = async (url, init) => {
    calledUrl = String(url);
    sentAuth = init?.headers?.Authorization;
    return new Response(JSON.stringify(publicEvents), { status: 200 });
  };
  const result = await getGitHubActivity();
  assert.match(calledUrl, /\/events\/public/);
  assert.equal(sentAuth, undefined);
  assert.equal(result.errorMessage, undefined);
  assert.equal(result.lines.length, 4);
});

test("empty response yields no lines and no error", async () => {
  globalThis.fetch = async () => new Response("[]", { status: 200 });
  const result = await getGitHubActivity();
  assert.deepEqual(result.lines, []);
  assert.equal(result.errorMessage, undefined);
  assert.deepEqual(pickHighlights(result.lines), []);
});

test("HTTP error and network failure yield an honest error", async () => {
  globalThis.fetch = async () => new Response("rate limited", { status: 403 });
  const http = await getGitHubActivity();
  assert.deepEqual(http.lines, []);
  assert.equal(http.errorMessage, "GitHub API returned 403");

  globalThis.fetch = async () => {
    throw new TypeError("fetch failed");
  };
  const network = await getGitHubActivity();
  assert.equal(network.errorMessage, "could not reach GitHub");
});

test("token is never included in the returned payload", async () => {
  process.env.GITHUB_TOKEN = "ghp_supersecret";
  globalThis.fetch = async () =>
    new Response(JSON.stringify([privateEvent, ...publicEvents]), { status: 200 });
  const result = await getGitHubActivity();
  assert.ok(!JSON.stringify(result).includes("ghp_supersecret"));
  assert.ok(!JSON.stringify(result).includes("secret-client-app"));
});

test("publicOnly never sends the token, even when one is configured", async () => {
  process.env.GITHUB_TOKEN = "ghp_supersecret";
  let calledUrl = "";
  let sentAuth;
  globalThis.fetch = async (url, init) => {
    calledUrl = String(url);
    sentAuth = init?.headers?.Authorization;
    return new Response(JSON.stringify(publicEvents), { status: 200 });
  };
  const result = await getGitHubActivity({ publicOnly: true });
  assert.match(calledUrl, /\/events\/public/);
  assert.equal(sentAuth, undefined);
  assert.equal(result.usingToken, false);
});

test("a pull request appears once, with its latest state", () => {
  const opened = {
    ...publicEvents[2],
    id: "2a",
    created_at: "2026-11-03T04:40:00Z",
    payload: { action: "opened", number: 2, pull_request: { number: 2 } },
  };
  const items = pickHighlights(parseEvents([publicEvents[2], opened]));
  assert.equal(items.length, 1);
  assert.equal(items[0].summary, "Merged pull request #2");
});
