#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = join(
  dirname(fileURLToPath(import.meta.url)),
  ".."
);
const CHANGELOG_FILE = "CHANGELOG.md";
const UNRELEASED_DIR = "changelog/unreleased";
const UNRELEASED_HEADING = "# UNRELEASED";
const FRAGMENT_EXTENSION = ".md";
const BRANCH_SEPARATOR = "/";
const FILE_SEPARATOR = "-";
const LIST_MARKER = "- ";
const CHECK_FLAG = "--check";
const RELEASE_BRANCH_PREFIX = "release/";
const ADDED_STATUS = "A";

export const CHANGELOG_SECTION = {
  BUGFIX: { directory: "bugfix", heading: "## Bugfix" },
  FEATURE: { directory: "feature", heading: "## Feature" },
};

const SECTIONS = [
  CHANGELOG_SECTION.FEATURE,
  CHANGELOG_SECTION.BUGFIX,
];

const FRAGMENT_PATH_PATTERN = new RegExp(
  `^${UNRELEASED_DIR}/(${SECTIONS.map(
    (section) => section.directory
  ).join("|")})/[^/]+\\${FRAGMENT_EXTENSION}$`
);

const USAGE = `Changelog fragments: one file per pull request in ${UNRELEASED_DIR}/.

Usage:
    node scripts/changelog.mjs                  release: move every fragment into ${CHANGELOG_FILE}
    node scripts/changelog.mjs --check <base>   pull request: exactly one new fragment, ${CHANGELOG_FILE} untouched`;

export const fragmentFileName = (branch) =>
  `${branch.split(BRANCH_SEPARATOR).join(FILE_SEPARATOR)}${FRAGMENT_EXTENSION}`;

export const parseFragment = (text, fileName) => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length !== 1) {
    throw new Error(
      `${fileName} must hold exactly one line, found ${lines.length}`
    );
  }
  if (lines[0].startsWith(LIST_MARKER)) {
    throw new Error(
      `${fileName} holds the line without the leading "${LIST_MARKER.trim()}"`
    );
  }
  return lines[0];
};

const findSectionIndex = (lines, heading) => {
  const unreleased = lines.indexOf(UNRELEASED_HEADING);
  const next = lines.findIndex(
    (line, index) => index > unreleased && /^# /.test(line)
  );
  const end = next === -1 ? lines.length : next;
  const index = lines.indexOf(heading, unreleased);
  return index !== -1 && index < end ? index : -1;
};

export const insertEntries = (
  changelog,
  section,
  entries
) => {
  if (entries.length === 0) {
    return changelog;
  }
  const lines = changelog.split("\n");
  if (!lines.includes(UNRELEASED_HEADING)) {
    lines.unshift(UNRELEASED_HEADING, "");
  }
  let index = findSectionIndex(lines, section.heading);
  if (index === -1) {
    const unreleased = lines.indexOf(UNRELEASED_HEADING);
    lines.splice(
      unreleased + 1,
      0,
      "",
      section.heading,
      ""
    );
    index = unreleased + 2;
  }
  const items = entries.map(
    (entry) => `${LIST_MARKER}${entry}`
  );
  lines.splice(index + 2, 0, ...items);
  return lines.join("\n");
};

export const checkPullRequestFiles = (changes, headRef) => {
  if (headRef.startsWith(RELEASE_BRANCH_PREFIX)) {
    return [];
  }
  const errors = [];
  const fragments = changes.filter(
    (change) =>
      change.status === ADDED_STATUS &&
      FRAGMENT_PATH_PATTERN.test(change.path)
  );
  if (fragments.length !== 1) {
    errors.push(
      `Add exactly one changelog fragment in ${UNRELEASED_DIR}/feature/ or ${UNRELEASED_DIR}/bugfix/, named ${fragmentFileName(headRef)}; found ${fragments.length}`
    );
  }
  if (
    changes.some((change) => change.path === CHANGELOG_FILE)
  ) {
    errors.push(
      `${CHANGELOG_FILE} changes only in a release/* pull request; write the line in a fragment instead`
    );
  }
  return errors;
};

const readFragments = (section) => {
  const directory = join(
    REPO_ROOT,
    UNRELEASED_DIR,
    section.directory
  );
  if (!existsSync(directory)) {
    return [];
  }
  return readdirSync(directory)
    .filter((name) => name.endsWith(FRAGMENT_EXTENSION))
    .sort()
    .map((name) => ({
      entry: parseFragment(
        readFileSync(join(directory, name), "utf8"),
        name
      ),
      path: join(directory, name),
    }));
};

const release = () => {
  const changelogPath = join(REPO_ROOT, CHANGELOG_FILE);
  let changelog = readFileSync(changelogPath, "utf8");
  const moved = [];
  SECTIONS.forEach((section) => {
    const fragments = readFragments(section);
    changelog = insertEntries(
      changelog,
      section,
      fragments.map((fragment) => fragment.entry)
    );
    moved.push(...fragments);
  });
  writeFileSync(changelogPath, changelog);
  moved.forEach((fragment) => rmSync(fragment.path));
  console.log(
    `Moved ${moved.length} fragment(s) into ${CHANGELOG_FILE}`
  );
};

const readChanges = (base) =>
  execFileSync(
    "git",
    [
      "diff",
      "--name-status",
      "--no-renames",
      `${base}...HEAD`,
    ],
    { cwd: REPO_ROOT, encoding: "utf8" }
  )
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [status, path] = line.split("\t");
      return { path, status };
    });

const currentBranch = () =>
  process.env.GITHUB_HEAD_REF ||
  execFileSync(
    "git",
    ["rev-parse", "--abbrev-ref", "HEAD"],
    {
      cwd: REPO_ROOT,
      encoding: "utf8",
    }
  ).trim();

const check = (base) => {
  if (!base) {
    throw new Error(USAGE);
  }
  const changes = readChanges(base);
  const errors = checkPullRequestFiles(
    changes,
    currentBranch()
  );
  changes
    .filter((change) =>
      FRAGMENT_PATH_PATTERN.test(change.path)
    )
    .filter((change) => change.status === ADDED_STATUS)
    .forEach((change) =>
      parseFragment(
        readFileSync(join(REPO_ROOT, change.path), "utf8"),
        change.path
      )
    );
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
  console.log("Changelog fragment OK");
};

const main = () => {
  const [flag, base] = process.argv.slice(2);
  if (flag === CHECK_FLAG) {
    check(base);
    return;
  }
  if (flag) {
    throw new Error(USAGE);
  }
  release();
};

const isEntryPoint =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntryPoint) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
