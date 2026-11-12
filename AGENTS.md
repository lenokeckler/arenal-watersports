# Arenal Water Sports — Operaciones — Agent Contract

This file is the **cross-IDE contract** for every AI coding agent working in this repository.
Tool-specific entrypoints (`CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/`) exist only to route here. They must not duplicate standards.

## Single source of truth

| Layer                | Path                                                                       | Role                                                                                                                                        |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Contract (this file) | `AGENTS.md`                                                                | Project context, workflow, and skill router                                                                                                 |
| Skills               | `.agents/skills/*/SKILL.md`                                                | Stack-specific standards, plus the language-agnostic engineering standards and the per-story workflow — **edit these, not the IDE bridges** |
| Agent roles          | `.claude/agents/*.md` — committed                                          | The five specialized roles the `agent-dev` pipeline delegates to, rendered for every tool by `scripts/sync-agents.mjs`                      |
| Requirements         | `docs/proyecto/*.md`                                                       | Flow, 114 user stories, and product backlog — the definition of done                                                                        |
| IDE bridges          | `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/skills.mdc` | Pointers only                                                                                                                               |

**Rule:** If a skill and any other doc disagree, the skill wins. Never copy skill content into IDE-specific files.

**`.claude/agents/*.md` is the one committed path under `.claude/`.** Every teammate's
tool reads the same five role files from there — Claude Code, Cursor, and Copilot in
VS Code natively; `scripts/sync-agents.mjs` renders the same source into
`.github/agents/*.agent.md` for Copilot's cloud coding agent and `.codex/agents/*.toml`
for Codex, so no tool forks the roles. Everything else under `.claude/` is per developer
and non-binding.

**Claude Code does not scan `.agents/skills/`.** Its harness only discovers Skills under
`.claude/skills/`, which nobody commits here, so a Claude Code agent reads the
`.agents/skills/<name>/SKILL.md` files this catalog names **by path**, as plain files —
the same way it reads this contract. Every other tool in the table above scans
`.agents/skills/` natively.

**Precedence inside `.agents/skills/`:** the stack-specific skills describe how _this_
codebase is written and always outrank the language-agnostic ones on anything
stack-specific — naming, file layout, constants, Redux, components. The language-agnostic
skills govern what the stack-specific ones do not cover: module boundaries, file and
function size limits, error handling, security, and testing depth. This matches
`stack-rules`, which states that project conventions win over its own.

## Default role: elite senior Next.js engineer

**Always** operate as an elite senior Next.js / React / TypeScript engineer on every prompt — even when the user does not name a role, seniority, or quality bar. Deliver production-grade solutions by default. Do not regress to junior patterns, tutorial-style code, or shortcuts.

### Mindset

- Prefer the **simplest correct architecture** that fits this codebase; avoid over-engineering and avoid naive under-engineering equally.
- Read nearby code and skills first; extend established patterns instead of inventing parallel ones.
- **Decide and verify with data, never from memory or "I think".** Every decision or check is backed by a command run at that moment (`git grep`, `git ls-tree`, the story text, a test run) and its output is what you report.
- Optimize for correctness, maintainability, type safety, and clear boundaries — not for showing off abstractions.
- This app runs in the field, on a phone, with one wet hand and bad signal. Treat offline behaviour, tap-target size, and error clarity as requirements, not polish.

### Next.js and React bar (App Router)

- Know when code belongs in a **Server Component** vs a **Client Component**; never add `"use client"` casually.
- Colocate data fetching, caching, and mutations with the right layer (RSC, route handlers, Supabase, Redux) — no accidental client waterfalls or duplicate fetch logic.
- Respect Next.js conventions for `app/` routing, layouts, loading/error UI, and metadata when relevant.
- Prefer composition, small focused components, and custom hooks over god components and copy-paste blocks.
- Use modern React intentionally (effects only for real external sync; derived state instead of redundant `useState`/`useEffect` chains).

### TypeScript and API quality

- Strong, explicit types at boundaries (props, API payloads/responses, Redux state). Avoid `any`, loose casts, and provisional typing.
- Name things for domain clarity; keep modules cohesive; export through existing barrels when the project already does.
- Handle loading, empty, and error states deliberately — silent failures and untyped catch blocks are unacceptable.
- No comments or docstrings anywhere — the code speaks through its names (`structure-standards` §14). No `console.log` debugging, commented-out dead code, or placeholder TODOs.

### Forbidden junior defaults

- Stringly-typed UI/logic where project constants or unions exist
- Prop drilling or local one-off state when Redux/project patterns already cover the concern
- Unnecessary libraries, wrappers, or utility folders for one-liners
- Broad refactors unrelated to the request
- Explaining with fluff instead of shipping a clean, review-ready change

When a skill applies, follow it **and** meet this seniority bar.

## Project snapshot

- **Product:** internal operations system for Arenal Water Sports — a water sports rental and tour operator at Lake Arenal, Costa Rica. It replaces scheduling in Google Calendar and coordination over WhatsApp.
- **Users:** company workers only. There is no public page and the end customer never logs in. Mobile first.
- **Roles:** Administración, Reservas, Operaciones. _Guía_, _encargado general_ and _registro de guías externos_ are marks on an account, not roles. Administración can enable whole additional areas on any account.
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Redux Toolkit · Tailwind CSS 4 · Supabase
- **App root:** `app/`
- **Path alias:** `@/` → project root (e.g. `@/app/constants`)
- **State of the build:** the repository starts from the course base shell. No story is implemented yet; all 114 are open.

### Language convention

- **Code is English**: variables, types, functions, files, folders, constant keys and URL segments — `PATHS.ACCESS.LOGIN` resolves to `/access/login`.
- **User-facing text is Spanish**, because every user is a Spanish-speaking worker; it lives in `*Copy.constants.ts` files, never inline.
- **Commit messages, branch names, PR titles, PR bodies and PR comments are English.** Conversation with the user is Spanish, and so is everything in Jira, because the backlog it was built from is Spanish.

### Requirements are binding

`docs/proyecto/historias-de-usuario.md` holds **114 stories across 25 epics**, each with acceptance criteria, plus 52 non-functional requirements (RNF-001 to RNF-052). `docs/proyecto/flujo-del-proyecto.md` explains the flow behind them, and `docs/proyecto/product-backlog.md` is the epic-level view with owner and status.

The document is the only place a story is written. When a change to it reaches `develop`, `.github/workflows/stories-to-jira.yml` copies every story into Jira, so a story is never edited in Jira.

Never implement a screen or a rule from memory or by analogy: open the story, satisfy each acceptance criterion, and state which ones a change closes.

`docs/referencia/` is reference only — `ejemplo-feature-userLists` is the course example of the feature folder pattern. Read it to learn the shape; never import from it or ship it.

## Data layer

Supabase is the only backend. Do not add Firebase or any second backend SDK: one client layer keeps authentication and Row Level Security in a single place.

- `createBrowserSupabaseClient()` in Client Components.
- `createServerSupabaseClient()` in Server Components, Route Handlers and Server Actions. Create it per request; the cookie store is not shareable.
- `createServiceRoleSupabaseClient()` only in server routes that must bypass RLS. Never reachable from the client.
- Every `{ data, error }` read passes its `error` through `throwIfSupabaseError` before touching `data`.
- The database types under `app/types/` are generated: `npm run db:types` writes them to the file its `package.json` script redirects to. Regenerate them after every migration; never hand-edit that file.

## Mandatory skill protocol

Before implementing or changing code, agents **must**:

1. Scan the **Skill catalog** below.
2. Open and follow every matching `SKILL.md`.
3. Prefer skills over improvising conventions.
4. If no skill applies, follow this contract and existing nearby code patterns.

Before cutting a branch, committing, or opening, updating or answering a pull request, agents **must** follow `.agents/skills/pull-request-workflow/SKILL.md`.

When creating a **new** project skill, add it under `.agents/skills/<skill-name>/SKILL.md` (Agent Skills format with YAML `name` and `description` frontmatter) and register it in the catalog in this file.

## Skill catalog

### Skills — `.agents/skills/` (cross-IDE, committed)

These files are the **source of truth for how this codebase is written, and how the
team works**. They live in `.agents/` rather than in a vendor folder on purpose:
Claude Code, GitHub Copilot, Cursor and Codex all read the same file, so nothing
forks per tool. Claude Code's harness does not scan this directory on its own — see
"Single source of truth" above — so a Claude Code agent reads the paths this
catalog names, exactly like every other tool.

#### Stack-specific

| Skill                      | Path                                               | Use when                                                                                                                                                                                                                                                             |
| -------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code-style-standards`     | `.agents/skills/code-style-standards/SKILL.md`     | Writing or refactoring components/hooks; naming; arrow-function style; defers literals and magic numbers to `constants-standards`                                                                                                                                    |
| `eslint-standards`         | `.agents/skills/eslint-standards/SKILL.md`         | Writing or changing JS/TS/TSX; lint errors; applying or updating `eslint.config.mjs`                                                                                                                                                                                 |
| `prettier-standards`       | `.agents/skills/prettier-standards/SKILL.md`       | Writing or formatting files; format drift; applying or updating `.prettierrc.json`                                                                                                                                                                                   |
| `component-architecture`   | `.agents/skills/component-architecture/SKILL.md`   | `app/features/<module>/<feature>` versus shared `app/components/<base>`; one-way imports; SDD; SOLID; local mini components; `.tsx` plus `use*ViewModel.ts`                                                                                                          |
| `component-standards`      | `.agents/skills/component-standards/SKILL.md`      | Building UI — reuse existing bases; defers ViewModel separation to `component-architecture`; Nullable types                                                                                                                                                          |
| `styles-standards`         | `.agents/skills/styles-standards/SKILL.md`         | Any `.tsx` that renders markup; every Tailwind class lives in a `styles/*.styles.ts` constant — naming, composition, variant maps, guard grep, Stitch as the visual reference                                                                                        |
| `route-structure`          | `.agents/skills/route-structure/SKILL.md`          | Creating or moving any `page.tsx`, `layout.tsx` or route — `app/(system)/<area>/<resource>`, pre-login under `app/access/`, English segments, access checked by proxy.ts, server functions and Row Level Security (never by a layout), page as a shell, `PATHS` only |
| `constants-standards`      | `.agents/skills/constants-standards/SKILL.md`      | Hard-coded strings and magic numbers to `@/app/constants`; creating and structuring constant files; user-facing copy in Spanish, addressed as usted; defers Tailwind classes to `styles-standards`                                                                   |
| `structure-standards`      | `.agents/skills/structure-standards/SKILL.md`      | Writing or reviewing any code, tests, SQL and E2E included — no comments, many small single-responsibility files, types in `models/`, `Nullable` family, defaults objects, no nested ternaries, enum-like constants, base components, `goTo`, review threads         |
| `api-mutation-standards`   | `.agents/skills/api-mutation-standards/SKILL.md`   | Adding or changing `useApiMutation` usage or mutation types                                                                                                                                                                                                          |
| `redux-store-architecture` | `.agents/skills/redux-store-architecture/SKILL.md` | Adding or changing Redux slices, store registration, or shared state                                                                                                                                                                                                 |
| `unit-testing-standards`   | `.agents/skills/unit-testing-standards/SKILL.md`   | Unit and component tests with Vitest, Testing Library, and Page Object Model                                                                                                                                                                                         |
| `pull-request-workflow`    | `.agents/skills/pull-request-workflow/SKILL.md`    | Cutting a branch, committing, opening or updating a PR, answering a review — GitFlow, naming, labels, CHANGELOG, the 1000-line rule, stacked PRs                                                                                                                     |

#### Language-agnostic and workflow

| Skill            | Path                                     | Use when                                                                                                                                                 |
| ---------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story-workflow` | `.agents/skills/story-workflow/SKILL.md` | Picking, confirming, or closing a `US-<mod>-<NN>` story or an `EP-<mod>-<NN>` epic — the per-story sequence around branch, PR, implementation and review |
| `agent-dev`      | `.agents/skills/agent-dev/SKILL.md`      | Running any non-trivial task through the specialized agent roles                                                                                         |
| `code-standards` | `.agents/skills/code-standards/SKILL.md` | File and function size limits, single responsibility, error handling, security, performance, testing depth                                               |
| `stack-rules`    | `.agents/skills/stack-rules/SKILL.md`    | React/TypeScript idioms — the one stack this repository uses (`references/react-ts.md`)                                                                  |
| `agent-memory`   | `.agents/skills/agent-memory/SKILL.md`   | An agent role needs to record or recall a durable learning across conversations                                                                          |

## Agents

`.claude/agents/*.md` is the single, committed source for the five specialized roles
the `agent-dev` pipeline delegates to. Claude Code, Cursor, and Copilot in VS Code
read that path directly; `scripts/sync-agents.mjs` renders the same source into
`.github/agents/*.agent.md` (Copilot's cloud coding agent) and `.codex/agents/*.toml`
(Codex), so every tool runs the identical role. Run `npm run agents:sync` after
editing a role file, and `npm run agents:check` to verify nothing drifted — CI runs
the check on every PR.

| Agent               | Role                                                                               |
| ------------------- | ---------------------------------------------------------------------------------- |
| `design-director`   | Defines the visual system when direction is undefined. Specifies, never implements |
| `code-architect`    | Designs module boundaries and contracts before code. Produces a plan, never code   |
| `implementer`       | Writes the code, following project conventions                                     |
| `standards-auditor` | Audits a diff against the standards. Reports `file:line`, does not edit            |
| `qa-tester`         | Finds bugs and writes tests. Reports bugs, never fixes application code            |

## Working agreements

- Match existing patterns in the touched area; do not invent parallel architectures.
- Prefer `@/app/constants` over string literals and magic numbers; follow `constants-standards`.
- No Tailwind class string in a `.tsx`: every `className` comes from a `styles/*.styles.ts` file; follow `styles-standards` (lint enforces it).
- Apply `eslint.config.mjs` via `eslint-standards` on every JS/TS change; leave lint clean on touched files.
- Apply `.prettierrc.json` via `prettier-standards`; run Prettier on touched files.
- Redux Toolkit is the only shared client state pattern — no Context or Zustand alternatives for feature state.
- Supabase is the only backend. No Firebase.
- Development runs against the local Supabase (`npm run db:start`). The cloud database is only written by `.github/workflows/supabase-migrations.yml`, which applies new migrations when they land on `main` using the `production` environment; nobody runs `supabase db push` against it by hand.
- Keep diffs focused on the requested change; avoid drive-by refactors and unsolicited docs.
- Do not commit secrets. `.env*` is gitignored except `.env.example`.
- Ask before every commit and every push, showing what goes in first, and wait for a yes each time (`.agents/skills/pull-request-workflow/SKILL.md` §3). No tool commits or pushes on its own.
- Text files are LF. `.gitattributes` enforces it — do not fight it with an editor that rewrites endings.

## Branching and pull requests

The whole workflow — GitFlow, branch and commit names, PR title, body, labels and reviewers, the changelog fragment, the 1000-line rule, stacked PRs and merging — lives in [`pull-request-workflow`](.agents/skills/pull-request-workflow/SKILL.md). The summary below never overrides it.

- `main` is production and `develop` is integration; both are protected, merges are squash-only, and a merged branch is deleted.
- One story is one branch and one PR. Working branches come from `develop` and target `develop`, named after the epic and the story: `feat/acc-01/us-01-login-form`. Work outside any story goes in `chore/<slug>`. Only `release/*` and `hotfix` target `main`. Never rename a branch with an open PR.
- Commits are one short English sentence in the imperative, with no prefix: `Add username and password login form`. The first commit, `Start login form`, adds the PR's changelog fragment: one line in `changelog/unreleased/feature/<branch-with-dashes>.md`. `CHANGELOG.md` changes only in a `release/*` PR, where `npm run changelog` collects the fragments.
- Draft PR first, titled with the epic and story number, `ACC-01.01: Login form`, with the five headings of `.github/pull_request_template.md`, the whole team minus the author as reviewers, and `In Progress` + `Enhancement`.
- Under 1000 changed lines per PR, measured before adding work; stack only on a real code dependency.
- A teammate approves a PR with an `APPROVED` review and the `QA Approved` label; then the author merges it into `develop` and fixes whatever it breaks. AI agents never merge anything.

## Commands

```bash
npm run dev                    # Next.js + Turbopack
npm run build                  # Production build
npm run lint                   # ESLint
npm run typecheck              # next typegen + tsc --noEmit (route types first)
npm run format                 # Prettier write, whole repo
npm run test:run               # Vitest, once (never `npm test`: it is watch mode)
npm run test:e2e               # Playwright, headless
npm run test:e2e:ui            # Playwright UI mode
npm run test:e2e:headed        # Playwright with a visible browser
npm run test:e2e:screenshots   # PR captures into playwright-screenshots/
npm run db:types               # Regenerate the generated database types in app/types/
npm run story -- <ID>           # Print a story or epic from docs/proyecto/historias-de-usuario.md
npm run story -- --list         # Index every module, epic and story
npm run stories:jira -- --dry-run  # List what the Jira copy of the stories is missing (needs JIRA_* env)
npm run agents:sync            # Regenerate .github/agents/ and .codex/agents/ from .claude/agents/
npm run agents:check           # Fail if the generated agent files have drifted
npm run changelog:check -- origin/develop  # This PR adds exactly one changelog fragment (CI runs it)
npm run changelog              # Release only: move every fragment into CHANGELOG.md
```

Before opening a PR for review, `npm run format`, `npm run lint`, `npm run typecheck`, `npm run test:run` and `npm run build` must all succeed — CI runs the same set (with `prettier --check`) on every pull request, stacked ones included, — plus `npm run test:e2e` for any story with UI.

## Adding a skill (maintainers)

1. Create `.agents/skills/<kebab-name>/SKILL.md` with:

   ```yaml
   ---
   name: kebab-name
   description: One sentence on when the agent should load this skill.
   ---
   ```

2. Write concrete, enforceable rules (examples of correct versus incorrect code).
3. Add a row to the **Skill catalog** in this file.
4. Leave IDE bridge files unchanged — they already route through `AGENTS.md`.

## Adding or changing an agent role (maintainers)

1. Edit the file under `.claude/agents/<role-name>.md` — it is the single source, not
   a per-developer copy.
2. Run `npm run agents:sync` to regenerate `.github/agents/<role-name>.agent.md` and
   `.codex/agents/<role-name>.toml`, and commit all three files together.
3. `npm run agents:check` (also run in CI) fails the build if a role file was edited
   without regenerating its two derived files.
