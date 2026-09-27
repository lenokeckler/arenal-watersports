import { pathToFileURL } from "node:url";

const JIRA_PROJECT = "AWS";

const STATUS = {
  IN_PROGRESS: "En proceso",
  DONE: "Finalizada",
};

const STATUS_CATEGORY = {
  NEW: "new",
  DONE: "done",
};

const EVENT = {
  STARTED: "started",
  MERGED: "merged",
};

const STORY_BRANCH_PATTERN =
  /^feat\/([a-z]{3})-(\d{2})\/us-(\d{2})(?:-|$)/;

export const parseStoryBranch = (branch) => {
  const match = STORY_BRANCH_PATTERN.exec(branch);
  if (!match) {
    return null;
  }
  const [, module, epic, story] = match;
  const moduleCode = module.toUpperCase();
  return {
    storyId: `US-${moduleCode}-${story}`,
    branchPrefix: `feat/${module}-${epic}/us-${story}-`,
  };
};

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
    return response.status === 204 ? null : response.json();
  };

  const search = (jql, fields) =>
    request(
      `/search/jql?jql=${encodeURIComponent(jql)}&fields=${fields.join(",")}`
    ).then((result) => result.issues);

  return { request, search };
};

const findStory = async (jira, storyId) => {
  const issues = await jira.search(
    `project = ${JIRA_PROJECT} AND summary ~ "\\"${storyId}\\""`,
    ["summary", "status", "parent"]
  );
  return (
    issues.find((issue) =>
      issue.fields.summary.startsWith(`${storyId} `)
    ) ?? null
  );
};

const findIssue = (jira, key) =>
  jira.request(`/issue/${key}?fields=summary,status`);

const transition = async (jira, issue, statusName) => {
  if (issue.fields.status.name === statusName) {
    return;
  }
  const { transitions } = await jira.request(
    `/issue/${issue.key}/transitions`
  );
  const target = transitions.find(
    (candidate) => candidate.to.name === statusName
  );
  if (!target) {
    throw new Error(
      `${issue.key} has no transition to ${statusName}`
    );
  }
  await jira.request(`/issue/${issue.key}/transitions`, {
    method: "POST",
    body: JSON.stringify({ transition: { id: target.id } }),
  });
  console.log(
    `${issue.key} ${issue.fields.summary}: ${issue.fields.status.name} -> ${statusName}`
  );
};

const isNew = (issue) =>
  issue.fields.status.statusCategory.key ===
  STATUS_CATEGORY.NEW;

const startStory = async (jira, story) => {
  if (isNew(story)) {
    await transition(jira, story, STATUS.IN_PROGRESS);
  }
  if (!story.fields.parent) {
    return;
  }
  const epic = await findIssue(
    jira,
    story.fields.parent.key
  );
  if (isNew(epic)) {
    await transition(jira, epic, STATUS.IN_PROGRESS);
  }
};

const finishEpicWhenComplete = async (jira, epicKey) => {
  const pending = await jira.search(
    `parent = ${epicKey} AND statusCategory != ${STATUS_CATEGORY.DONE}`,
    ["summary"]
  );
  if (pending.length > 0) {
    return;
  }
  await transition(
    jira,
    await findIssue(jira, epicKey),
    STATUS.DONE
  );
};

const finishStory = async (
  jira,
  story,
  openBranches,
  branchPrefix
) => {
  const openParts = openBranches.filter((branch) =>
    branch.startsWith(branchPrefix)
  );
  if (openParts.length > 0) {
    console.log(
      `${story.key} stays open: ${openParts.join(", ")} still open`
    );
    return;
  }
  await transition(jira, story, STATUS.DONE);
  if (story.fields.parent) {
    await finishEpicWhenComplete(
      jira,
      story.fields.parent.key
    );
  }
};

const main = async () => {
  const event = readEnv("EVENT");
  const branch = readEnv("BRANCH");
  const parsed = parseStoryBranch(branch);
  if (!parsed) {
    console.log(
      `${branch} is not a story branch; nothing to sync`
    );
    return;
  }

  const jira = createJiraClient({
    baseUrl: readEnv("JIRA_BASE_URL"),
    email: readEnv("JIRA_EMAIL"),
    token: readEnv("JIRA_API_TOKEN"),
  });
  const story = await findStory(jira, parsed.storyId);
  if (!story) {
    throw new Error(
      `No Jira issue found for ${parsed.storyId}`
    );
  }

  if (event === EVENT.STARTED) {
    await startStory(jira, story);
    return;
  }
  if (event === EVENT.MERGED) {
    const openBranches = (process.env.OPEN_BRANCHES ?? "")
      .split(",")
      .filter(Boolean);
    await finishStory(
      jira,
      story,
      openBranches,
      parsed.branchPrefix
    );
    return;
  }
  throw new Error(`Unknown event ${event}`);
};

const isEntryPoint =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntryPoint) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
