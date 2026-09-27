---
name: agent-memory
description: Policy for how a subagent reads and writes its persistent file-based memory — what to save, what never to save, the file format, the MEMORY.md index, and how to verify a recalled memory before acting on it. Load when an agent needs to record a durable learning or recall prior context across conversations.
---

# Agent Memory Policy

Single source of truth for subagent memory. Agents reference this file instead
of carrying their own copy of the rules.

Your memory lives in your home directory, under
`.claude/agent-memory/<your-agent-name>/`. Write to it directly. If the
directory does not exist yet, create it — you are the first run of this
agent. If your tool has no persistent, file-based memory location, say so once
and skip this policy — never simulate memory inside a conversation.

This is agent-scoped memory, separate from the main thread's memory. Its
frontmatter format is the one specified below, not the main thread's.

## Memory types

| Type        | Contents                                                                  | Save when                                                                            |
| ----------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `user`      | Role, expertise, goals, collaboration preferences                         | You learn something about who the user is that changes how you should work with them |
| `feedback`  | Guidance on how to approach work — corrections _and_ confirmed approaches | The user corrects you, or explicitly validates a non-obvious choice                  |
| `project`   | Ongoing work, goals, constraints, incidents                               | You learn who is doing what, why, or by when. Convert relative dates to absolute     |
| `reference` | Pointers to external systems (dashboards, trackers, docs)                 | You learn where information lives outside the repo                                   |

Save confirmations, not only corrections. An agent that records only failures
drifts away from approaches the user already approved.

## What never goes in memory

- Code structure, conventions, file paths — derivable by reading the project
- Git history or who changed what — `git log` is authoritative
- Bug fixes and debugging recipes — the fix is in the code
- Anything already in a CLAUDE.md
- Ephemeral state: in-progress work, current conversation context

These exclusions hold even when asked directly to save. If asked to store one of
them, ask what was _surprising_ about it and save that instead.

## Format

One fact per file, e.g. `feedback_testing.md`:

```
---
name: SLUG_HERE
description: ONE_LINE_SUMMARY_HERE
type: user | feedback | project | reference
---

THE_FACT_HERE. For feedback and project, follow with **Why:** and **How to apply:** lines.
```

Then add one line to `MEMORY.md`: `- [Title](file.md) — one-line hook`.

`MEMORY.md` is an index, never a container. No frontmatter, no memory content,
one line per entry, under ~150 characters each. It is always loaded into
context, so keep it short.

## Discipline

- Check for an existing file covering the topic before writing a new one.
  Update rather than duplicate.
- Delete memories that turn out to be wrong or stale.
- Organize by topic, not chronologically.
- Keep `name`, `description`, and `type` in sync with the body.

## Before acting on a recalled memory

A memory naming a file, function, or flag is a claim about the past, not the
present. Before recommending it: check the path exists, grep for the symbol.
If a memory conflicts with what you observe now, trust the observation and
update the memory.

If the user says to ignore memory, proceed as if `MEMORY.md` were empty — do not
apply, cite, or mention it.

## Memory vs other persistence

- Steps and progress in the current conversation → tasks, not memory.
- Alignment on an approach before implementing → a plan, not memory.
- Memory is only for what will still matter in a future conversation.

Since this memory is user-scoped, keep entries general enough to apply across
projects.
