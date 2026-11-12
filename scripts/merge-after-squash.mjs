#!/usr/bin/env node
import {
  execFileSync,
  spawnSync,
} from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = join(
  dirname(fileURLToPath(import.meta.url)),
  ".."
);
const DEVELOP = "origin/develop";
const REAL_MERGE =
  "Run a real merge instead (git merge origin/develop) and resolve every conflict by hand keeping both sides. Never git merge -s ours.";

export const MERGED_STATE = "MERGED";

export const REFUSAL = {
  DIRTY:
    "Commit or stash your changes first: the working tree is not clean.",
  PARENT_NOT_MERGED: `The parent pull request is not merged yet, so there is no squash to clear. ${REAL_MERGE}`,
  MISSING_PARENT_HEAD: `This branch does not hold the final head of the parent pull request: the parent changed after this branch merged it. ${REAL_MERGE}`,
  DEVELOP_MOVED: `develop holds more than the parent pull request: someone else merged in between. ${REAL_MERGE}`,
};

const USAGE =
  "Usage: npm run merge:after-squash -- <parent pull request number>";

export const decideSquashMerge = ({
  clean,
  containsParent,
  parentState,
  sameTree,
}) => {
  if (!clean) {
    return REFUSAL.DIRTY;
  }
  if (parentState !== MERGED_STATE) {
    return REFUSAL.PARENT_NOT_MERGED;
  }
  if (!containsParent) {
    return REFUSAL.MISSING_PARENT_HEAD;
  }
  if (!sameTree) {
    return REFUSAL.DEVELOP_MOVED;
  }
  return null;
};

export const squashMergeMessage = (parentTitle) =>
  `Merge develop after squash of ${parentTitle}`;

const run = (command, args) =>
  execFileSync(command, args, {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });

const succeeds = (args) =>
  spawnSync("git", args, { cwd: REPO_ROOT }).status === 0;

const readParent = (parentNumber) =>
  JSON.parse(
    run("gh", [
      "pr",
      "view",
      parentNumber,
      "--json",
      "state,headRefOid,title",
    ])
  );

const mergeAfterSquash = (parentNumber) => {
  if (!/^\d+$/.test(parentNumber ?? "")) {
    throw new Error(USAGE);
  }
  run("git", ["fetch", "origin"]);
  const parent = readParent(parentNumber);
  run("git", [
    "fetch",
    "origin",
    `refs/pull/${parentNumber}/head`,
  ]);
  succeeds(["update-index", "-q", "--refresh"]);
  const refusal = decideSquashMerge({
    clean: run("git", ["status", "--porcelain"]) === "",
    containsParent: succeeds([
      "merge-base",
      "--is-ancestor",
      parent.headRefOid,
      "HEAD",
    ]),
    parentState: parent.state,
    sameTree: succeeds([
      "diff",
      "--quiet",
      parent.headRefOid,
      DEVELOP,
    ]),
  });
  if (refusal) {
    throw new Error(refusal);
  }
  const treeBefore = run("git", [
    "rev-parse",
    "HEAD^{tree}",
  ]).trim();
  run("git", [
    "merge",
    "-s",
    "ours",
    DEVELOP,
    "-m",
    squashMergeMessage(parent.title),
  ]);
  const treeAfter = run("git", [
    "rev-parse",
    "HEAD^{tree}",
  ]).trim();
  if (treeBefore !== treeAfter) {
    throw new Error(
      "The tree changed during the merge; undo it with git reset --hard ORIG_HEAD"
    );
  }
  console.log(
    "False conflict cleared, tree unchanged. Push with: git push origin HEAD"
  );
};

const isEntryPoint =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntryPoint) {
  try {
    mergeAfterSquash(process.argv[2]);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
