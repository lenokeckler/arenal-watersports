#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = join(
  dirname(fileURLToPath(import.meta.url)),
  ".."
);
const GITHUB_API = "https://api.github.com";
const PAGE_SIZE = 100;
const DELETED_STATUS = "D";
const RENAMED_STATUS_PREFIX = "R";
const MIGRATION_PATH_PATTERN =
  /^supabase\/migrations\/[^/]+\.sql$/;
const LABELED_EVENT = "labeled";
const UNLABELED_EVENT = "unlabeled";

export const APPROVAL_LABEL = "Approved deletion";

export const isMigrationPath = (path) =>
  MIGRATION_PATH_PATTERN.test(path);

export const parseDeletions = (nameStatus) =>
  nameStatus
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("\t"))
    .filter(
      ([status, path]) =>
        status === DELETED_STATUS ||
        (status.startsWith(RENAMED_STATUS_PREFIX) &&
          isMigrationPath(path))
    )
    .map(([, path]) => path);

export const findBlockedDeletions = (
  deletions,
  pullAuthor
) =>
  deletions.filter(
    (deletion) =>
      isMigrationPath(deletion.path) ||
      deletion.owner !== pullAuthor
  );

export const pickOriginPull = (pulls, sha) =>
  pulls.find((pull) => pull.merge_commit_sha === sha) ??
  null;

export const isApprovedBy = (events, approver) => {
  const approvalEvents = events.filter(
    (event) =>
      [LABELED_EVENT, UNLABELED_EVENT].includes(
        event.event
      ) && event.label?.name === APPROVAL_LABEL
  );
  const last = approvalEvents.at(-1);
  return (
    last?.event === LABELED_EVENT &&
    last.actor?.login === approver
  );
};

const describeOrigin = (deletion) =>
  deletion.owner
    ? `added by @${deletion.owner}${deletion.pullNumber ? ` in #${deletion.pullNumber}` : ""}`
    : "added by an unknown author";

export const formatBlockedDeletions = (blocked, approver) =>
  [
    `This pull request deletes ${blocked.length} file(s) it may not delete: a migration, or a file another author added.`,
    ...blocked.map(
      (deletion) =>
        `  ${deletion.path} (${describeOrigin(deletion)})`
    ),
    `If every deletion is intended, @${approver} adds the "${APPROVAL_LABEL}" label. New commits remove it again.`,
  ].join("\n");

const git = (args) =>
  execFileSync("git", args, {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });

const requireEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
};

const fetchJson = async (path, token) => {
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `GitHub API ${path} answered ${response.status}`
    );
  }
  return response.json();
};

const fetchAllPages = async (path, token) => {
  const items = [];
  for (let page = 1; ; page += 1) {
    const batch = await fetchJson(
      `${path}?per_page=${PAGE_SIZE}&page=${page}`,
      token
    );
    items.push(...batch);
    if (batch.length < PAGE_SIZE) {
      return items;
    }
  }
};

const addingCommit = (base, path) =>
  git([
    "log",
    "--diff-filter=A",
    "--format=%H",
    "-1",
    base,
    "--",
    path,
  ]).trim();

const resolveOrigin = async (sha, repository, token) => {
  if (!sha) {
    return { owner: null, pullNumber: null };
  }
  const originPull = pickOriginPull(
    await fetchJson(
      `/repos/${repository}/commits/${sha}/pulls`,
      token
    ),
    sha
  );
  if (originPull) {
    return {
      owner: originPull.user.login,
      pullNumber: originPull.number,
    };
  }
  const commit = await fetchJson(
    `/repos/${repository}/commits/${sha}`,
    token
  );
  return {
    owner: commit.author?.login ?? null,
    pullNumber: null,
  };
};

const resolveDeletions = async (
  paths,
  base,
  repository,
  token
) => {
  const origins = new Map();
  const deletions = [];
  for (const path of paths) {
    const sha = addingCommit(base, path);
    if (!origins.has(sha)) {
      origins.set(
        sha,
        await resolveOrigin(sha, repository, token)
      );
    }
    deletions.push({ path, ...origins.get(sha) });
  }
  return deletions;
};

const check = async () => {
  const base = requireEnv("BASE_REF");
  const repository = requireEnv("GITHUB_REPOSITORY");
  const token = requireEnv("GITHUB_TOKEN");
  const pullNumber = requireEnv("PR_NUMBER");
  const pullAuthor = requireEnv("PR_AUTHOR");
  const approver = requireEnv("APPROVER");

  const paths = parseDeletions(
    git(["diff", "--name-status", "-M", `${base}...HEAD`])
  );
  const deletions = await resolveDeletions(
    paths,
    base,
    repository,
    token
  );
  const blocked = findBlockedDeletions(
    deletions,
    pullAuthor
  );
  if (blocked.length === 0) {
    console.log(
      `Deletion guard OK: ${paths.length} deleted file(s), all added by @${pullAuthor}`
    );
    return;
  }
  const events = await fetchAllPages(
    `/repos/${repository}/issues/${pullNumber}/events`,
    token
  );
  if (isApprovedBy(events, approver)) {
    console.log(
      `Deletion guard OK: @${approver} approved ${blocked.length} deletion(s)`
    );
    return;
  }
  throw new Error(
    formatBlockedDeletions(blocked, approver)
  );
};

const isEntryPoint =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntryPoint) {
  check().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
