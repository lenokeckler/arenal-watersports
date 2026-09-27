#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = join(
  dirname(fileURLToPath(import.meta.url)),
  ".."
);
const STORIES_FILE_ENV = "STORIES_FILE";
const DEFAULT_STORIES_FILE = join(
  REPO_ROOT,
  "docs/proyecto/historias-de-usuario.md"
);
const JIRA_PROJECT = "AWS";

const LIST_FLAG = "--list";
const USAGE = `Read a user story from docs/proyecto/historias-de-usuario.md.

Usage:
    node scripts/story.mjs US-ACC-01   one story
    node scripts/story.mjs EP-ACC-01   every story of an epic
    node scripts/story.mjs --list      index of modules, epics and stories`;

const MODULE_PATTERN = /^##\s+Módulo\s+(.*)$/;
const EPIC_PATTERN = /^###\s+(EP-[A-Z]+-\d+)\s+—\s+(.*)$/;
const STORY_PATTERN = /^####\s+(US-[A-Z]+-\d+)\s+—\s+(.*)$/;
const HEADING_PATTERN = /^#{1,4}\s/;
const SEPARATOR = "---";

export const resolveStoriesFile = (env = process.env) =>
  env[STORIES_FILE_ENV] || DEFAULT_STORIES_FILE;

export const readStoryLines = (filePath) => {
  if (!existsSync(filePath)) {
    throw new Error(
      `Story document not found at ${filePath}`
    );
  }
  return readFileSync(filePath, "utf8").split("\n");
};

export const buildIndex = (lines) => {
  const entries = [];
  let currentModule = "";
  let currentEpic = "";
  for (const line of lines) {
    const moduleMatch = MODULE_PATTERN.exec(line);
    const epicMatch = EPIC_PATTERN.exec(line);
    const storyMatch = STORY_PATTERN.exec(line);
    if (moduleMatch) {
      currentModule = moduleMatch[1];
    } else if (epicMatch) {
      currentEpic = `${epicMatch[1]} ${epicMatch[2]}`;
    } else if (storyMatch) {
      entries.push({
        module: currentModule,
        epic: currentEpic,
        storyId: storyMatch[1],
        name: storyMatch[2],
      });
    }
  }
  return entries;
};

const isBlockEnd = (line) =>
  line.trim() === SEPARATOR || HEADING_PATTERN.test(line);

export const collapseBlankLines = (block) => {
  const collapsed = [];
  for (const rawLine of block) {
    const line = rawLine.replace(/\s+$/, "");
    const isBlank = line.trim() === "";
    const previousIsBlank =
      collapsed.length === 0 ||
      collapsed[collapsed.length - 1].trim() === "";
    if (isBlank && previousIsBlank) {
      continue;
    }
    collapsed.push(line);
  }
  while (
    collapsed.length > 0 &&
    collapsed[collapsed.length - 1].trim() === ""
  ) {
    collapsed.pop();
  }
  return collapsed;
};

export const storyBlock = (lines, storyId) => {
  const block = [];
  let capturing = false;
  for (const line of lines) {
    const match = STORY_PATTERN.exec(line);
    if (match && match[1] === storyId) {
      capturing = true;
      block.push(line);
      continue;
    }
    if (capturing && isBlockEnd(line)) {
      break;
    }
    if (capturing) {
      block.push(line);
    }
  }
  return collapseBlankLines(block);
};

export const epicStoryIds = (lines, epicId) =>
  buildIndex(lines)
    .filter((entry) => entry.epic.split(" ")[0] === epicId)
    .map((entry) => entry.storyId);

const jiraNote = (id) =>
  "Jira: not tracked in this file — .github/scripts/jira-sync.mjs finds the " +
  `issue by searching project ${JIRA_PROJECT} for a summary starting with "${id} ".`;

const printStory = (lines, storyId) => {
  console.log(storyBlock(lines, storyId).join("\n"));
  console.log();
  console.log(jiraNote(storyId));
};

const printIndex = (lines) => {
  for (const entry of buildIndex(lines)) {
    console.log(
      `${entry.module} | ${entry.epic} | ${entry.storyId} — ${entry.name}`
    );
  }
};

const printEpic = (lines, epicId) => {
  const storyIds = epicStoryIds(lines, epicId);
  if (storyIds.length === 0) {
    throw new Error(
      `No epic ${epicId} in the story document`
    );
  }
  console.log(jiraNote(epicId));
  console.log();
  for (const storyId of storyIds) {
    printStory(lines, storyId);
    console.log();
  }
};

const main = () => {
  const [rawTarget] = process.argv.slice(2);
  if (!rawTarget) {
    console.error(USAGE);
    process.exitCode = 1;
    return;
  }
  const target =
    rawTarget === LIST_FLAG
      ? LIST_FLAG
      : rawTarget.toUpperCase();
  const lines = readStoryLines(resolveStoriesFile());

  if (target === LIST_FLAG) {
    printIndex(lines);
    return;
  }
  if (target.startsWith("EP-")) {
    printEpic(lines, target);
    return;
  }
  if (storyBlock(lines, target).length === 0) {
    throw new Error(
      `No story ${target} in the story document`
    );
  }
  printStory(lines, target);
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
