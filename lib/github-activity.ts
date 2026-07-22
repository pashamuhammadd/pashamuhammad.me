export const GITHUB_USERNAME = "pashamuhammadd";

type GitHubCommit = {
  sha?: string;
  message?: string;
};

type GitHubEvent = {
  id: string;
  type: string;
  repo?: { name?: string };
  created_at: string;
  public?: boolean;
  payload?: {
    ref_type?: string;
    ref?: string;
    commits?: GitHubCommit[];
    action?: string;
    number?: number;
    pull_request?: { title?: string; merged?: boolean };
    issue?: { title?: string };
    forkee?: { full_name?: string };
    release?: { tag_name?: string };
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
};

function truncate(text: string, max: number) {
  const firstLine = text.split("\n")[0].trim();
  return firstLine.length > max ? `${firstLine.slice(0, max - 1)}…` : firstLine;
}

function formatEvent(event: GitHubEvent): Omit<LogLine, "isPrivate"> | null {
  const repo = event.repo?.name ?? "unknown/repo";
  const payload = event.payload ?? {};

  switch (event.type) {
    case "PushEvent": {
      const commits = payload.commits ?? [];
      if (commits.length === 0) return null;

      return {
        id: event.id,
        timestamp: event.created_at,
        command: `git push ${repo}`,
        kind: "push",
        detail: commits
          .slice(0, 5)
          .map(
            (c) => `${(c.sha ?? "").slice(0, 7)} ${truncate(c.message ?? "", 72)}`
          ),
      };
    }

    case "CreateEvent": {
      if (payload.ref_type === "repository") {
        return {
          id: event.id,
          timestamp: event.created_at,
          command: `git init ${repo}`,
          kind: "create",
        };
      }

      if (payload.ref_type === "branch" && payload.ref) {
        return {
          id: event.id,
          timestamp: event.created_at,
          command: `git checkout -b ${payload.ref} (${repo})`,
          kind: "create",
        };
      }

      return null;
    }

    case "PullRequestEvent": {
      const title = truncate(payload.pull_request?.title ?? "", 60);

      if (payload.action === "opened") {
        return {
          id: event.id,
          timestamp: event.created_at,
          command: `gh pr create ${repo}#${payload.number}`,
          kind: "pr",
          detail: [`"${title}"`],
        };
      }

      if (payload.action === "closed" && payload.pull_request?.merged) {
        return {
          id: event.id,
          timestamp: event.created_at,
          command: `gh pr merge ${repo}#${payload.number}`,
          kind: "pr",
          detail: [`"${title}"`],
        };
      }

      return null;
    }

    case "IssuesEvent": {
      if (payload.action !== "opened") return null;

      return {
        id: event.id,
        timestamp: event.created_at,
        command: `gh issue create ${repo}#${payload.number}`,
        kind: "issue",
        detail: [`"${truncate(payload.issue?.title ?? "", 60)}"`],
      };
    }

    case "WatchEvent":
      return {
        id: event.id,
        timestamp: event.created_at,
        command: `star ${repo}`,
        kind: "star",
      };

    case "ForkEvent":
      return {
        id: event.id,
        timestamp: event.created_at,
        command: `fork ${repo} -> ${payload.forkee?.full_name ?? "new-fork"}`,
        kind: "fork",
      };

    case "ReleaseEvent":
      return {
        id: event.id,
        timestamp: event.created_at,
        command: `gh release publish ${repo} ${payload.release?.tag_name ?? ""}`,
        kind: "release",
      };

    case "PublicEvent":
      return {
        id: event.id,
        timestamp: event.created_at,
        command: `chmod +public ${repo}`,
        kind: "public",
      };

    default:
      return null;
  }
}

export type GitHubActivityResult = {
  lines: LogLine[];
  errorMessage?: string;
  usingToken: boolean;
};

export async function getGitHubActivity(): Promise<GitHubActivityResult> {
  const token = process.env.GITHUB_TOKEN;

  // Without a token, GitHub only ever returns public activity, no matter
  // which endpoint we call. With a token that belongs to this same
  // account, the non-/public endpoint also includes private repo
  // activity, so we switch endpoints based on whether a token is set.
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

    const ownRepoPrefix = `${GITHUB_USERNAME}/`;

    const lines = events
      .filter((event) => (event.repo?.name ?? "").startsWith(ownRepoPrefix))
      .map((event) => {
        const formatted = formatEvent(event);
        if (!formatted) return null;
        return { ...formatted, isPrivate: event.public === false };
      })
      .filter((line): line is LogLine => line !== null)
      .slice(0, 40);

    return { lines, usingToken: Boolean(token) };
  } catch {
    return {
      lines: [],
      errorMessage: "could not reach GitHub",
      usingToken: Boolean(token),
    };
  }
}
