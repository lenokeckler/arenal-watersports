#!/usr/bin/env node
import { isDeepStrictEqual } from "node:util";
import { pathToFileURL } from "node:url";

import {
  buildIndex,
  readStoryLines,
  resolveStoriesFile,
  storyBlock,
} from "./story.mjs";

const JIRA_PROJECT = "AWS";
const STORY_ISSUE_TYPE = "Historia";
const DESCRIPTION_START = "**Historia de usuario:**";
const BULLET = "- ";
const NESTED_BULLET_INDENT = "  ";
const INLINE_MARK_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`)/;
const SEARCH_PAGE_SIZE = 100;
const DRY_RUN_FLAG = "--dry-run";

const textNode = (text, mark) =>
  mark
    ? { type: "text", text, marks: [{ type: mark }] }
    : { type: "text", text };

export const inlineNodes = (line) =>
  line
    .split(INLINE_MARK_PATTERN)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith("**")) {
        return textNode(part.slice(2, -2), "strong");
      }
      if (part.startsWith("`")) {
        return textNode(part.slice(1, -1), "code");
      }
      return textNode(part);
    });

const paragraph = (lines) => ({
  type: "paragraph",
  content: lines.flatMap((line, index) => [
    ...(index > 0 ? [{ type: "hardBreak" }] : []),
    ...inlineNodes(line.trim()),
  ]),
});

const bulletList = (items) => ({
  type: "bulletList",
  content: items.map(({ text, children }) => ({
    type: "listItem",
    content: [
      paragraph([text]),
      ...(children.length > 0
        ? [bulletList(children)]
        : []),
    ],
  })),
});

const isBullet = (line) => line.startsWith(BULLET);

const isListLine = (line) =>
  isBullet(line) ||
  (line.startsWith(NESTED_BULLET_INDENT) &&
    line.trim() !== "");

const readList = (lines, start) => {
  const items = [];
  let index = start;
  while (index < lines.length && isListLine(lines[index])) {
    const line = lines[index];
    const nested = line.trim();
    if (isBullet(line)) {
      items.push({
        text: line.slice(BULLET.length),
        children: [],
      });
    } else if (nested.startsWith(BULLET)) {
      items.at(-1).children.push({
        text: nested.slice(BULLET.length),
        children: [],
      });
    } else {
      items.at(-1).text += ` ${nested}`;
    }
    index += 1;
  }
  return { node: bulletList(items), next: index };
};

const readParagraph = (lines, start) => {
  const collected = [];
  let index = start;
  while (
    index < lines.length &&
    lines[index].trim() !== "" &&
    !isBullet(lines[index])
  ) {
    collected.push(lines[index]);
    index += 1;
  }
  return { node: paragraph(collected), next: index };
};

export const descriptionLines = (block) => {
  const start = block.indexOf(DESCRIPTION_START);
  return start === -1 ? [] : block.slice(start);
};

export const toDocument = (lines) => {
  const content = [];
  let index = 0;
  while (index < lines.length) {
    if (lines[index].trim() === "") {
      index += 1;
      continue;
    }
    const { node, next } = isBullet(lines[index])
      ? readList(lines, index)
      : readParagraph(lines, index);
    content.push(node);
    index = next;
  }
  return { type: "doc", version: 1, content };
};

export const storySummary = (entry) =>
  `${entry.storyId} — ${entry.name}`;

const readEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
};

const createJiraClient = ({ baseUrl, email, token }) => {
  const authorization = `Basic ${Buffer.from(`${email}:${token}`).toString("base64")}`;

  const request = async (path, options = {}) => {
    const response = await fetch(
      `${baseUrl}/rest/api/3${path}`,
      {
        ...options,
        headers: {
          Authorization: authorization,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Jira ${options.method ?? "GET"} ${path} failed: ${response.status} ${await response.text()}`
      );
    }
    return response.status === 204 ||
      response.headers.get("content-length") === "0"
      ? null
      : response.json();
  };

  const searchAll = async (jql, fields) => {
    const issues = [];
    let nextPageToken;
    do {
      const page = await request("/search/jql", {
        method: "POST",
        body: JSON.stringify({
          jql,
          fields,
          maxResults: SEARCH_PAGE_SIZE,
          ...(nextPageToken ? { nextPageToken } : {}),
        }),
      });
      issues.push(...page.issues);
      nextPageToken = page.nextPageToken;
    } while (nextPageToken);
    return issues;
  };

  return { request, searchAll };
};

const issuesById = (issues) =>
  new Map(
    issues.map((issue) => [
      issue.fields.summary.split(" ")[0],
      issue,
    ])
  );

const createStory = (jira, entry, epic, description) =>
  jira.request("/issue", {
    method: "POST",
    body: JSON.stringify({
      fields: {
        project: { key: JIRA_PROJECT },
        issuetype: { name: STORY_ISSUE_TYPE },
        summary: storySummary(entry),
        description,
        ...(epic ? { parent: { key: epic.key } } : {}),
      },
    }),
  });

const updateStory = (jira, issue, fields) =>
  jira.request(`/issue/${issue.key}?notifyUsers=false`, {
    method: "PUT",
    body: JSON.stringify({ fields }),
  });

const changedFields = (issue, summary, description) => ({
  ...(issue.fields.summary === summary ? {} : { summary }),
  ...(isDeepStrictEqual(
    issue.fields.description,
    description
  )
    ? {}
    : { description }),
});

const main = async () => {
  const dryRun = process.argv.includes(DRY_RUN_FLAG);
  const lines = readStoryLines(resolveStoriesFile());
  const jira = createJiraClient({
    baseUrl: readEnv("JIRA_BASE_URL"),
    email: readEnv("JIRA_EMAIL"),
    token: readEnv("JIRA_API_TOKEN"),
  });
  const issues = issuesById(
    await jira.searchAll(`project = ${JIRA_PROJECT}`, [
      "summary",
      "description",
    ])
  );

  let changes = 0;
  for (const entry of buildIndex(lines)) {
    const summary = storySummary(entry);
    const description = toDocument(
      descriptionLines(storyBlock(lines, entry.storyId))
    );
    const issue = issues.get(entry.storyId);
    if (!issue) {
      const epic = issues.get(entry.epic.split(" ")[0]);
      console.log(`${entry.storyId}: create`);
      changes += 1;
      if (!dryRun) {
        await createStory(jira, entry, epic, description);
      }
      continue;
    }
    const fields = changedFields(
      issue,
      summary,
      description
    );
    if (Object.keys(fields).length === 0) {
      continue;
    }
    console.log(
      `${issue.key} ${entry.storyId}: update ${Object.keys(fields).join(", ")}`
    );
    changes += 1;
    if (!dryRun) {
      await updateStory(jira, issue, fields);
    }
  }
  console.log(
    `${changes} ${dryRun ? "pending" : "applied"} change(s)`
  );
};

const isEntryPoint =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntryPoint) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
