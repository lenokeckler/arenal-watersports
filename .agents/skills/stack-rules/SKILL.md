---
name: stack-rules
description: React/TypeScript idioms — typing rules, components, hooks, styling tokens, theming, i18n, accessibility, motion, performance, and structure. This repository is Next.js/React/TypeScript only, so `references/react-ts.md` is the one reference that applies. Use after `.agents/skills/code-standards/SKILL.md`, when writing or reviewing any `.ts`/`.tsx` file.
---

# Stack Rules

Stack-specific conventions. These sit **on top of** `.agents/skills/code-standards/SKILL.md`,
which holds the language-agnostic rules — never in place of it.

## How to use

1. Load `references/react-ts.md` before writing or reviewing any `.ts`, `.tsx`, or `.mjs`
   file in this repository.
2. If the project's own conventions in `.agents/skills/*` contradict a rule here, the
   project skill wins. Note the divergence; do not silently "fix" the codebase to match
   this file.

## Reference

| Stack                                                            | File                     |
| ---------------------------------------------------------------- | ------------------------ |
| React + TypeScript (and TS/JS generally, including Node scripts) | `references/react-ts.md` |

## Universal, regardless of stack

- Use the project's existing package manager and lockfile (npm). Never switch it.
- Never introduce a new framework, state library, or build tool without asking.
- Match the formatter and linter already configured (`eslint.config.mjs`,
  `.prettierrc.json`) and run them before finishing.
- **Never install anything.** Use only the tools the project or the machine already
  provides. If a check needs a tool that is missing, do it by reading the code and say
  plainly in the report that the check was manual.
- New files go where the existing convention puts them — `.agents/skills/route-structure/SKILL.md`
  and `.agents/skills/component-architecture/SKILL.md` say where. Never invent a parallel
  directory structure.
