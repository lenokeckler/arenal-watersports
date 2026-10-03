---
name: story-workflow
description: Per-story workflow for this repository — pick a user story from docs/proyecto/historias-de-usuario.md, confirm it, cut its branch, open its draft PR, implement it through the agent roles, land small commits, and hand off for review. One story, one branch, one PR. Use when starting, resuming, or closing a US-<mod>-<NN> story or an EP-<mod>-<NN> epic.
---

# Story workflow

This is the step-by-step sequence for building one of this project's 114 user
stories. It never duplicates a rule that already has a home:

- Everything about branches, commits, PR title/body/labels/reviewers, the
  CHANGELOG line, the 1000-line rule and stacked PRs lives in
  `.agents/skills/pull-request-workflow/SKILL.md`. This skill agrees with it
  everywhere and points to it instead of repeating it.
- Everything about running the actual implementation through the agent
  pipeline — stages, handoffs, the fix loop, checkpoint commits — lives in
  `.agents/skills/agent-dev/SKILL.md`.

**One story = one branch = one PR.** Never two stories on the same branch.

Talk to the user in whatever language they write in. **Everything that lands
in the repo or on GitHub is English** — commit messages, PR titles, PR bodies,
PR comments, branch names (`AGENTS.md`). Everything in Jira is Spanish, because
the backlog it was built from is Spanish. User-facing copy inside the app is
Spanish too, by the project contract.

No attribution anywhere: no `Co-Authored-By`, no "Generated with", no session
link — not in commits, PR bodies, comments, tags or release notes. No comments
or docstrings in code (`.agents/skills/structure-standards/SKILL.md`).

## Sources

| Thing            | Where                                                                                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Story source     | `docs/proyecto/historias-de-usuario.md` — 114 stories, 25 epics, RNF-001..RNF-052                                                                                                                                   |
| Backlog          | `docs/proyecto/product-backlog.md` — epic view, owner, status                                                                                                                                                       |
| Story reader     | `npm run story -- <US-ID\|EP-ID\|--list>` — prints the story text; see `scripts/story.mjs`                                                                                                                          |
| Jira             | `https://arenal-watersports.atlassian.net/browse/AWS-<n>` — status moved by `.github/workflows/jira-sync.yml`; story text copied from the document by `.github/workflows/stories-to-jira.yml`. Never edited by hand |
| Personal tracker | Optional. A developer may keep a local progress file outside the repository; nothing in this workflow depends on one existing                                                                                       |

## Step 0 — Pick the story

1. If the user gave an ID, use it. Otherwise ask which story is next, or read
   `docs/proyecto/product-backlog.md` for the next open one in owner order.
2. If a story is already in progress on an open branch (`git branch --list
'feat/*'`, `gh pr list --state open`), confirm with the user whether to
   finish it or start the new one instead. Never start a second story in
   parallel on a different branch without saying so.
3. Read the full story: `npm run story -- <US-ID>`. Its **Criterios de
   aceptación** are the acceptance criteria for both the PR and the
   implementer. `npm run story -- <EP-ID>` prints every story of an epic;
   `npm run story -- --list` prints the whole index.
4. Read the RNFs (`RNF-001`..`RNF-052`, at the end of the story document) that
   apply to the story's area.
5. **Confirm with the user which story you are about to do before cutting the
   branch.**

### Story not in the document

If `npm run story` reports the id does not exist, that is not a failure: ask
the user for the acceptance criteria and confirm them back, then proceed with
those instead of inventing anything.

### An epic is several stories, and each one is its own branch and PR

The document nests stories under epics: an epic like `EP-ACC-01` contains
several `US-ACC-0N` stories. When the user points at an epic, treat **each
`US-` story as its own branch and its own PR**, taken one at a time. There is
no epic branch: never carry two stories on one branch, and never collapse an
epic into one PR.

## The scope rule — nothing outside the story

**Only what a story asks for gets built.** The story's **Criterios de
aceptación** are the whole scope: not a floor to build on, not a suggestion.
No extra sections, no "while I'm here" features, no value-add nobody
requested, no placeholder content invented to fill a layout.

- If something looks necessary but has no story, **ask before writing it**.
  The answer may be a new story, or it may be no.
- If a criterion depends on something that does not exist yet (another
  story's screen, a table not in the schema), leave that part pending and say
  so in the report. Do not invent a substitute.
- Never write the acceptance criteria yourself when the document already has
  them. Read `historias-de-usuario.md` first; a self-written spec is not a
  source of truth. Never implement a screen or a rule from memory or by
  analogy.
- This applies to every agent role in the pipeline. `design-director` may not
  add sections, `implementer` may not add features, and neither may "improve"
  the scope.

```
✅ Criterion says "show the error next to the field" → build exactly that, nothing more
❌ "A summary panel would help here" → built without a story (ask instead)
```

## Step 1 — Branch and draft PR

Follow `.agents/skills/pull-request-workflow/SKILL.md` §1–§4 exactly: cut the
branch from a fresh `develop`, named `feat/<mod>-<NN>/us-<NN>-<slug>`; measure
the branch's size before adding work; open the PR as a draft right after the
starter commit, before the story code. The starter commit, the first push and
opening the PR are each asked for first (§3 of that skill): show what goes up,
then wait for a yes.

**Resolving reviewers for this repository**: the whole team minus the PR's
author.

```bash
gh api repos/lenokeckler/arenal-watersports/collaborators --jq '.[].login'
```

Drop the author's own login from that list before passing it to
`gh pr create --reviewer`.

## Step 2 — Implement through the agent pipeline

**Writing the story's code by hand instead of going through the pipeline is a
defect of this workflow, not a shortcut.** Every story goes through
`.agents/skills/agent-dev/SKILL.md`, whole. No exceptions for "small" stories,
for stories that look like one file, or for being in a hurry.

**If your tool can run subagents**, invoke the roles in `.claude/agents/` in
the order `agent-dev` describes. **If it cannot**, do each stage yourself in
the same order, reading the referenced skill before each one.

Hand the pipeline: the full story text, its acceptance criteria (copied
verbatim), the RNFs that apply, and the verification commands from `AGENTS.md`
(`npx prettier --check .`, `npm run lint`, `npm run typecheck`,
`npm run test:run`, `npm run build`, plus `npm run test:e2e` for any story with
UI).

### The whole loop runs, every time

| Stage                             | When it is mandatory for a story in this repository                                                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `design-director`                 | Any story that renders or changes UI — handed the story's Stitch screen as the visual reference (`styles-standards`) |
| `code-architect`                  | Any story touching more than one module, introducing folders, or touching Supabase access                            |
| `implementer`                     | Always — it is the only role allowed to write the story's code                                                       |
| `standards-auditor` ‖ `qa-tester` | **Always.** Run in parallel                                                                                          |
| Fix loop                          | Until zero critical and zero high findings, capped at 3 rounds                                                       |
| `qa-tester` last                  | It closes every round, including the final one                                                                       |
| Playwright E2E + screenshots      | Every story that renders or changes UI — `.agents/skills/pull-request-workflow/SKILL.md` §7                          |

- **Never skip the review round.** A story with passing checks and no audit is
  not done. Green `lint` + `build` is not a substitute for `standards-auditor`.
- **Tests are a deliverable, not a follow-up.** `qa-tester` writes unit tests
  with the Page Object Model of `.agents/skills/unit-testing-standards/SKILL.md`
  for every piece of logic the story adds. A story arriving at review with
  untested logic goes back.
- **E2E and tests never touch the hosted Supabase project.** Local stack only
  (`npm run db:start`), seeded local accounts only.
- **Report the stages by name.** The report says which stages ran, which were
  skipped and why, the findings resolved and the medium/low debt left open.
  "I ran the pipeline" is not a report.

Name every applicable `.agents/skills/<name>/SKILL.md` **by full path** in
every handoff — a role that is not handed the path does not open the file.

## Step 3 — Small, focused commits

Follow `.agents/skills/agent-dev/SKILL.md` Stage 3.5. The branch already
carries one story, so a commit is one focused piece of it — something a
reviewer can read on its own. The default ladder is **constants + models →
validators → data access → builders/mappers → state → UI**, each rung its own
`implementer` handoff, its own verification run, its own commit question.

Plan the cut before implementing, not after the diff exists.

## Step 4 — Keep the PR body current

After each push, refresh the PR body's five headings following
`.agents/skills/pull-request-workflow/SKILL.md` §4: the commit hash under
_What does this PR do?_, fresh captures under _Screenshot_ for a UI story, the
criteria ticked or left open under _Developer Notes_.

## Step 5 — Ready for review, then wait

Run the pre-flight checks of `.agents/skills/pull-request-workflow/SKILL.md`
§5 and §8. When they pass:

1. Ask before taking it out of draft, then `gh pr ready <n>`.
2. Swap `In Progress` for `Waiting for QA` in the same step.
3. Confirm the whole team minus the author is still requested.
4. Stop here. Report the PR and what was done.

**The author merges their own PR, and no AI tool merges anything.** Once a teammate
has approved it with an `APPROVED` review and the `QA Approved` label, and its base is
`develop`, the author merges it by hand with _Squash and merge_ and owns whatever it
breaks — `.agents/skills/pull-request-workflow/SKILL.md` §9.

**Work does not stop while a PR waits for review.** Start the next story; a
different epic almost always has no dependency on the open one.

Do not chase reviewers with comments or mentions. An open PR labelled
`Waiting for QA` is the whole ask.

## Mistakes this workflow exists to prevent

- Opening a PR against `main`, or merging anything anywhere.
- Opening a PR with invented reviewers.
- Writing anything that lands in the repo or on GitHub in the wrong language.
- Implementing a story by hand instead of through the agent pipeline, or
  calling it done with the review round skipped because lint and build were
  green.
- Shipping a UI story without its Playwright spec and its mobile + desktop
  screenshots.
- Carrying two stories on one branch or one PR, cutting an epic branch, or
  landing a whole story as one giant commit.
- Pointing anything — E2E, seed, test — at the hosted Supabase project.
