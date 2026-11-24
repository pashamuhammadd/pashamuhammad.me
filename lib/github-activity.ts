export const GITHUB_USERNAME = "pashamuhammadd";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

type GitHubCommit = {
  sha?: string;
  message?: string;
};

export type GitHubEvent = {
  id: string;
  type: string;
  repo?: { name?: string };
  created_at: string;
  public?: boolean;
  payload?: {
    ref_type?: string;
    ref?: string;
    head?: string;
    before?: string;
    commits?: GitHubCommit[];
    action?: string;
    number?: number;
    pull_request?: {
      title?: string;
      merged?: boolean;
      html_url?: string;
      number?: number;
    };
    issue?: { title?: string; html_url?: string };
    forkee?: { full_name?: string };
    release?: { tag_name?: string; name?: string; html_url?: string };
  };
};

export type LogKind =
  | "push"
  | "create"
  | "pr"
  | "issue"
  | "star"
  | "fork"
  | "release"
  | "public";

export type LogLine = {
  id: string;
  timestamp: string;
  command: string;
  detail?: string[];
  isPrivate: boolean;
  kind: LogKind;
  /** owner/name, only set for public repositories */
  repo?: string;
  /** github.com link, only set for public repositories */
  url?: string;
  /** short human summary used by the home page feed */
  summary?: string;
};

const PRIVATE_LABEL = "private repository";

function truncate(text: string, max: number) {
  const firstLine = text.split("\n")[0].trim();
  return firstLine.length > max ? `${firstLine.slice(0, max - 1)}…` : firstLine;
}

function branchFromRef(ref?: string) {
  return ref?.replace(/^refs\/heads\//, "") || undefined;
}

type Formatted = Omit<LogLine, "isPrivate">;

function formatEvent(event: GitHubEvent): Formatted | null {
  const repo = event.repo?.name ?? "unknown/repo";
  const repoUrl = `https://github.com/${repo}`;
  const payload = event.payload ?? {};
  const base = { id: event.id, timestamp: event.created_at, repo };

  switch (event.type) {
    case "PushEvent": {
      const branch = branchFromRef(payload.ref);
      const commits = payload.commits ?? [];
      // Since 2025 the public Events API no longer includes commit lists on
      // PushEvent; it only carries `head` and `before`. Support both shapes.
      const head = payload.head ?? commits[commits.length - 1]?.sha;
      if (!head && commits.length === 0) return null;

      const url =
        payload.before && head && !/^0+$/.test(payload.before)
          ? `${repoUrl}/compare/${payload.before.slice(0, 12)}...${head.slice(0, 12)}`
          : head
            ? `${repoUrl}/commit/${head}`
            : repoUrl;

      return {
        ...base,
        kind: "push",
        url,
        command: `git push ${repo}${branch ? ` ${branch}` : ""}`,
        summary: commits.length
          ? truncate(commits[commits.length - 1]?.message ?? "", 72)
          : `Pushed to ${branch ?? "a branch"}${head ? ` at ${head.slice(0, 7)}` : ""}`,
        detail: commits.length
          ? commits
              .slice(0, 5)
              .map(
                (c) =>
                  `${(c.sha ?? "").slice(0, 7)} ${truncate(c.message ?? "", 72)}`
              )
          : head
            ? [`${head.slice(0, 7)} on ${branch ?? "branch"}`]
            : undefined,
      };
    }

    case "CreateEvent": {
      if (payload.ref_type === "repository") {
        return {
          ...base,
          kind: "create",
          url: repoUrl,
          command: `git init ${repo}`,
          summary: "Created the repository",
        };
      }

      if (payload.ref_type === "branch" && payload.ref) {
        return {
          ...base,
          kind: "create",
          url: `${repoUrl}/tree/${payload.ref}`,
          command: `git checkout -b ${payload.ref} (${repo})`,
          summary: `Started branch ${payload.ref}`,
        };
      }

      if (payload.ref_type === "tag" && payload.ref) {
        return {
          ...base,
          kind: "create",
          url: `${repoUrl}/releases/tag/${payload.ref}`,
          command: `git tag ${payload.ref} (${repo})`,
          summary: `Tagged ${payload.ref}`,
        };
      }

      return null;
    }

    case "PullRequestEvent": {
      const number = payload.number ?? payload.pull_request?.number;
      const title = payload.pull_request?.title
        ? truncate(payload.pull_request.title, 60)
        : undefined;
      const url =
        payload.pull_request?.html_url ??
        (number ? `${repoUrl}/pull/${number}` : repoUrl);
      // Newer payloads use action "merged"; older ones use "closed" + merged.
      const merged =
        payload.action === "merged" ||
        (payload.action === "closed" && payload.pull_request?.merged);

      if (payload.action === "opened" || merged) {
        const verb = merged ? "merge" : "create";
        return {
          ...base,
          kind: "pr",
          url,
          command: `gh pr ${verb} ${repo}#${number ?? "?"}`,
          summary: `${merged ? "Merged" : "Opened"} pull request #${number ?? "?"}${title ? `: ${title}` : ""}`,
          detail: title ? [`"${title}"`] : undefined,
        };
      }

      return null;
    }

    case "IssuesEvent": {
      if (payload.action !== "opened") return null;
      const title = truncate(payload.issue?.title ?? "", 60);

      return {
        ...base,
        kind: "issue",
        url: payload.issue?.html_url ?? `${repoUrl}/issues`,
        command: `gh issue create ${repo}#${payload.number ?? "?"}`,
        summary: `Opened issue${title ? `: ${title}` : ""}`,
        detail: title ? [`"${title}"`] : undefined,
      };
    }

    case "WatchEvent":
      return {
        ...base,
        kind: "star",
        url: repoUrl,
        command: `star ${repo}`,
      };

    case "ForkEvent":
      return {
        ...base,
        kind: "fork",
        url: repoUrl,
        command: `fork ${repo} -> ${payload.forkee?.full_name ?? "new-fork"}`,
      };

    case "ReleaseEvent": {
      const tag = payload.release?.tag_name ?? "";
      return {
        ...base,
        kind: "release",
        url: payload.release?.html_url ?? `${repoUrl}/releases`,
        command: `gh release publish ${repo} ${tag}`.trim(),
        summary: `Released ${payload.release?.name || tag || "a new version"}`,
      };
    }

    case "PublicEvent":
      return {
        ...base,
        kind: "public",
        url: repoUrl,
        command: `chmod +public ${repo}`,
        summary: "Made the repository public",
      };

    default:
      return null;
  }
}

/**
 * Strip everything that could identify a private repository before the line
 * leaves the server: name, branch, commit messages, links.
 */
function redactPrivate(line: Formatted): LogLine {
  const verbs: Record<LogKind, string> = {
    push: "git push",
    create: "git checkout -b",
    pr: "gh pr",
    issue: "gh issue",
    star: "star",
    fork: "fork",
    release: "gh release publish",
    public: "chmod +public",
  };

  return {
    id: line.id,
    timestamp: line.timestamp,
    kind: line.kind,
    command: `${verbs[line.kind]} <${PRIVATE_LABEL}>`,
    isPrivate: true,
  };
}

/** Pure transform from raw GitHub events to log lines. Exported for tests. */
export function parseEvents(events: GitHubEvent[], limit = 40): LogLine[] {
  const ownRepoPrefix = `${GITHUB_USERNAME}/`;

  return events
    .filter((event) => (event.repo?.name ?? "").startsWith(ownRepoPrefix))
    .map((event): LogLine | null => {
      const formatted = formatEvent(event);
      if (!formatted) return null;
      return event.public === false
        ? redactPrivate(formatted)
        : { ...formatted, isPrivate: false };
    })
    .filter((line): line is LogLine => line !== null)
    .slice(0, limit);
}

export type GitHubActivityResult = {
  lines: LogLine[];
  errorMessage?: string;
  usingToken: boolean;
};

export async function getGitHubActivity(
  options: { publicOnly?: boolean } = {}
): Promise<GitHubActivityResult> {
  // publicOnly skips the token entirely. Authenticated requests return the
  // owner's private (often org) activity even on /events/public, which can
  // push all public activity out of the 100-event window.
  const token = options.publicOnly ? undefined : process.env.GITHUB_TOKEN;

  // Without a token, GitHub only ever returns public activity, no matter
  // which endpoint we call. With a token that belongs to this same
  // account, the non-/public endpoint also includes private repo
  // activity (redacted by parseEvents before it reaches the browser).
  const endpoint = token
    ? `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`
    : `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "pashamuhammad-dev-log",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(endpoint, {
      headers,
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return {
        lines: [],
        errorMessage: `GitHub API returned ${response.status}`,
        usingToken: Boolean(token),
      };
    }

    const events = (await response.json()) as GitHubEvent[];
    if (!Array.isArray(events)) {
      return {
        lines: [],
        errorMessage: "unexpected response from GitHub",
        usingToken: Boolean(token),
      };
    }

    return { lines: parseEvents(events), usingToken: Boolean(token) };
  } catch {
    return {
      lines: [],
      errorMessage: "could not reach GitHub",
      usingToken: Boolean(token),
    };
  }
}

/* ------------------------------------------------------------------ */
/* Home page feed                                                       */
/* ------------------------------------------------------------------ */

export type ProjectRef = { name: string; url: string };

/** Public repositories that map to a project listed in Selected work. */
export const REPO_PROJECTS: Record<string, ProjectRef> = {
  [`${GITHUB_USERNAME}/cuanweb3`]: { name: "CuanWeb3", url: "https://cuanweb3.com" },
  [`${GITHUB_USERNAME}/nimia-games`]: { name: "Nimia Studio", url: "https://nimiastudio.com" },
  [`${GITHUB_USERNAME}/lifetopia-platform`]: { name: "Lifetopia World", url: "https://lifetopiaworld.io" },
  [`${GITHUB_USERNAME}/railsight`]: { name: "RailSight", url: "https://railsight.xyz" },
  [`${GITHUB_USERNAME}/pashamuhammad.me`]: { name: "Pasha Muhammad", url: "https://pashamuhammad.me" },
};

export type ActivityHighlight = {
  id: string;
  timestamp: string;
  kind: "release" | "pr" | "push" | "create";
  repo: string;
  project?: string;
  url: string;
  summary: string;
};

const HIGHLIGHT_PRIORITY: Record<ActivityHighlight["kind"], number> = {
  release: 0,
  pr: 1,
  push: 2,
  create: 3,
};

/**
 * Pick the most meaningful public items: releases and pull requests first,
 * then pushes, then new branches/repos. At most one push per repository so a
 * busy afternoon does not crowd out everything else. Result is newest first.
 */
export function pickHighlights(lines: LogLine[], limit = 5): ActivityHighlight[] {
  const candidates = lines.filter(
    (line): line is LogLine & { kind: ActivityHighlight["kind"]; repo: string; url: string } =>
      !line.isPrivate &&
      Boolean(line.repo && line.url) &&
      line.kind in HIGHLIGHT_PRIORITY
  );

  const seenPushRepos = new Set<string>();
  // Lines arrive newest first, so the first one seen wins.
  const deduped = candidates.filter((line) => {
    if (line.kind === "release") return true;
    // one entry per pull request (merged beats opened), one push/branch per repo
    const key = line.kind === "pr" ? `pr:${line.url}` : `${line.kind}:${line.repo}`;
    if (seenPushRepos.has(key)) return false;
    seenPushRepos.add(key);
    return true;
  });

  return deduped
    .map((line, index) => ({ line, index }))
    .sort(
      (a, b) =>
        HIGHLIGHT_PRIORITY[a.line.kind] - HIGHLIGHT_PRIORITY[b.line.kind] ||
        a.index - b.index
    )
    .slice(0, limit)
    .map(({ line }) => ({
      id: line.id,
      timestamp: line.timestamp,
      kind: line.kind,
      repo: line.repo,
      project: REPO_PROJECTS[line.repo]?.name,
      url: line.url,
      summary: line.summary ?? line.command,
    }))
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}
