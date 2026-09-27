#!/usr/bin/env node
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = join(
  dirname(fileURLToPath(import.meta.url)),
  ".."
);
const SOURCE_DIR = join(REPO_ROOT, ".claude", "agents");
const GITHUB_AGENTS_DIR = join(
  REPO_ROOT,
  ".github",
  "agents"
);
const CODEX_AGENTS_DIR = join(
  REPO_ROOT,
  ".codex",
  "agents"
);
const CHECK_FLAG = "--check";

const FRONTMATTER_PATTERN =
  /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
const FIELD_PATTERN = /^([a-zA-Z_]+):\s*(.*)$/;

const parseAgentFile = (filePath) => {
  const raw = readFileSync(filePath, "utf8");
  const match = FRONTMATTER_PATTERN.exec(raw);
  if (!match) {
    throw new Error(
      `${filePath} has no --- frontmatter block`
    );
  }
  const [, frontmatter, rawBody] = match;
  const fields = {};
  for (const line of frontmatter.split("\n")) {
    const fieldMatch = FIELD_PATTERN.exec(line);
    if (fieldMatch) {
      fields[fieldMatch[1]] = fieldMatch[2].trim();
    }
  }
  if (!fields.name || !fields.description) {
    throw new Error(
      `${filePath} is missing name or description`
    );
  }
  return { ...fields, body: rawBody.trim() };
};

const listSourceAgents = () =>
  readdirSync(SOURCE_DIR)
    .filter((entry) => entry.endsWith(".md"))
    .map((entry) =>
      parseAgentFile(join(SOURCE_DIR, entry))
    );

const renderGithubAgent = ({
  name,
  description,
  tools,
  body,
}) => {
  const toolsLine = tools ? `tools: ${tools}\n` : "";
  return `---\nname: ${name}\ndescription: ${description}\n${toolsLine}---\n\n${body}\n`;
};

const toTomlQuotedString = (value) => JSON.stringify(value);

const renderCodexAgent = ({ name, description, body }) =>
  `name = ${toTomlQuotedString(name)}\n` +
  `description = ${toTomlQuotedString(description)}\n` +
  `developer_instructions = '''\n${body}\n'''\n`;

const targetsFor = (agent) => [
  {
    path: join(GITHUB_AGENTS_DIR, `${agent.name}.agent.md`),
    content: renderGithubAgent(agent),
  },
  {
    path: join(CODEX_AGENTS_DIR, `${agent.name}.toml`),
    content: renderCodexAgent(agent),
  },
];

const readIfExists = (filePath) => {
  try {
    return readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
};

const write = () => {
  mkdirSync(GITHUB_AGENTS_DIR, { recursive: true });
  mkdirSync(CODEX_AGENTS_DIR, { recursive: true });
  const agents = listSourceAgents();
  for (const agent of agents) {
    for (const target of targetsFor(agent)) {
      writeFileSync(target.path, target.content, "utf8");
    }
  }
  console.log(
    `Generated ${agents.length} agent(s) into .github/agents/ and .codex/agents/.`
  );
};

const check = () => {
  const agents = listSourceAgents();
  const stale = agents
    .flatMap(targetsFor)
    .filter(
      (target) =>
        readIfExists(target.path) !== target.content
    );
  if (stale.length > 0) {
    console.error(
      "Generated agent files are out of date. Run `npm run agents:sync`:"
    );
    for (const target of stale) {
      console.error(`  ${target.path}`);
    }
    process.exitCode = 1;
    return;
  }
  console.log(`${agents.length} agent(s) are in sync.`);
};

const main = () => {
  if (process.argv.includes(CHECK_FLAG)) {
    check();
    return;
  }
  write();
};

const isEntryPoint =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntryPoint) {
  main();
}
