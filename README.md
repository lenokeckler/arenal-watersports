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

### What you need installed

- Git and a GitHub account that accepted the invitation to this repository
- Node.js 22 or newer (`node -v`)
- Docker Desktop, running: the local Supabase lives in containers

### First run

```bash
git clone https://github.com/lenokeckler/arenal-watersports.git
cd arenal-watersports
git switch develop
npm ci
npm run db:start             # first time downloads the Supabase images; takes a few minutes
npx supabase status -o env   # prints the local URL and keys as NAME=value lines
npx playwright install chromium   # the browser the end-to-end tests run in
cp .env.example .env.local
```

Fill `.env.local` with the values `npx supabase status -o env` printed:

| Variable                        | Value from `supabase status -o env`  |
| ------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | `API_URL` (`http://127.0.0.1:54321`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `ANON_KEY`                           |
| `SUPABASE_SERVICE_ROLE_KEY`     | `SERVICE_ROLE_KEY`                   |

```bash
npm run dev                  # http://localhost:3000
```

The local database is built from `supabase/migrations/` and filled from `supabase/seed.sql`. It
already has one Administración account for the login screen: username `admin`, password
`Arenal.2026`. That password only exists in the local database.

### Check that everything works

```bash
npm run lint && npm run typecheck && npm run test:run && npm run build
npm run test:e2e             # end-to-end tests on a phone and a desktop viewport
npm run db:test              # rebuilds the local database and runs the pgTAP tests
npm run db:reset             # reloads the seeded data, including the admin account
```

`npm run db:test` starts from an empty database without the seed, so run `npm run db:reset`
afterwards to get the seeded data and the `admin` account back.

### Before your first story

1. Find your stories in Jira (filter the backlog by your avatar) or in the `Dueño / Voluntario`
   column of `docs/proyecto/product-backlog.md`.
2. Read the story: `npm run story -- US-ACC-01`.
3. Follow `.agents/skills/story-workflow/SKILL.md`: branch from `develop`, draft pull request,
   small commits. Every commit and every push is shown and approved before it happens.

Develop against the local database only. The cloud database is updated by
`.github/workflows/supabase-migrations.yml` when migrations reach `main`.

### Daily

```bash
git switch develop && git pull
npm run db:start             # if Docker was restarted
npm run dev
```

After pulling new migrations, `npm run db:reset` rebuilds the local database from scratch.

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
