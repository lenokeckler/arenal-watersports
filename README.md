# Arenal Water Sports — Operaciones

Internal operations system for Arenal Water Sports, a water sports rental and tour
operator at Lake Arenal, Costa Rica. It replaces scheduling in Google Calendar and
coordination over WhatsApp with one place where the information lives.

Company workers are the only users: there is no public page and the end customer
never logs in. The application is built for the phone first, because most of the
work happens at the dock.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Redux Toolkit · Tailwind CSS 4 · Supabase

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Supabase keys
npm run dev
```

The application runs on http://localhost:3000.

## Commands

```bash
npm run dev              # Next.js + Turbopack
npm run build            # Production build
npm run lint             # ESLint
npm run typecheck        # tsc --noEmit
npm run format           # Prettier write
npm run test:run         # Vitest, once
npm run db:types         # Regenerate app/types/Database.ts from Supabase
npm run story -- US-ACC-01   # Print one story from docs/proyecto/historias-de-usuario.md
```

Before opening a pull request, format, lint, typecheck, tests and build must all pass.

## Where things are

| What                                                                       | Where                                        |
| -------------------------------------------------------------------------- | -------------------------------------------- |
| Agent contract and skill router                                            | `AGENTS.md`                                  |
| Skills — stack standards, engineering standards and the per-story workflow | `.agents/skills/*/SKILL.md`                  |
| Agent roles (`agent-dev` pipeline)                                         | `.claude/agents/*.md`                        |
| Requirements: flow, 114 stories, backlog                                   | `docs/proyecto/`                             |
| Feature folder pattern example                                             | `docs/referencia/ejemplo-feature-userLists/` |

## How each tool picks this up

Every tool reads `AGENTS.md` first, directly or through a one-line pointer
(`CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/skills.mdc`). From
there:

- **Claude Code, Cursor, GitHub Copilot in VS Code, and Codex** all read
  `.agents/skills/*/SKILL.md` for the coding standards and the per-story workflow.
  Claude Code's harness is the one exception — it does not scan `.agents/skills/`
  on its own, so `AGENTS.md` and `CLAUDE.md` tell it to open those files by path.
- **Claude Code, Cursor, and Copilot in VS Code** read the five agent roles directly
  from `.claude/agents/*.md`.
- **Copilot's cloud coding agent** reads `.github/agents/*.agent.md`, and **Codex**
  reads `.codex/agents/*.toml` — both generated from `.claude/agents/*.md` by
  `npm run agents:sync` (verified in CI by `npm run agents:check`).

## Branching

`main` is the trunk, `develop` is the integration branch, and every user story gets
its own branch off `develop` plus one pull request. Nothing is committed straight to
`main` or `develop`.
