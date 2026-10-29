---
name: pull-request-workflow
description: The team's branch, commit, pull request, review and merge workflow — GitFlow, branch and commit naming, PR title/body/labels/reviewers, the changelog fragment, the 1000-line rule and stacked PRs; use before cutting a branch, committing, opening or updating a PR, or answering a review.
---

# Pull request workflow

Every teammate, and every tool they use, follows this file for branches, commits and pull
requests. It stands on its own: nothing here depends on a personal tool.

Everything that reaches git or GitHub is **English** — branch names, commit messages, PR titles,
PR bodies and PR comments. Everything in Jira is **Spanish**, because the backlog is written
in Spanish. User-facing copy inside the app is Spanish (`AGENTS.md`).

| Fact            | Value                                                                    |
| --------------- | ------------------------------------------------------------------------ |
| Repository      | `lenokeckler/arenal-watersports`                                         |
| Integration     | `develop` (protected)                                                    |
| Production      | `main` (protected)                                                       |
| Merge method    | Squash only; the head branch is deleted on merge                         |
| Who merges      | The author, once a teammate approved and labelled it `QA Approved`       |
| Stories         | `docs/proyecto/historias-de-usuario.md` — `US-ACC-01`, epics `EP-ACC-01` |
| Jira            | `https://arenal-watersports.atlassian.net/browse/AWS-<n>`                |
| Package manager | npm                                                                      |

## 1. GitFlow

```
hotfix         <-->  main
main            -->  masterToDev  -->  develop
develop        <-->  feat/<mod>-<NN>/us-<NN>-<slug>   working branches
develop         -->  release/x.y.z  -->  main
release/x.y.z  <-->  qafix
```

| Branch                       | Comes from  | PR into     |
| ---------------------------- | ----------- | ----------- |
| `feat/*`, `fix/*`, `chore/*` | `develop`   | `develop`   |
| `release/x.y.z`              | `develop`   | `main`      |
| `qafix`                      | `release/*` | `release/*` |
| `masterToDev`                | `main`      | `develop`   |
| `hotfix`                     | `main`      | `main`      |

- Every working branch is cut from a freshly pulled `develop` and its PR targets `develop` (or
  the branch below it, in a stack — §6).
- **Nothing targets `main` except `release/*` and `hotfix`.** Never open a story PR against
  `main`, never push to `main` or `develop`, never force-push either of them.

```bash
# ✅
git switch develop && git pull --ff-only
git switch -c feat/acc-01/us-01-login-form

# ❌ working on develop, or cutting from a stale local copy
git switch develop && git commit -am "add login"
```

## 2. Branch names

**One story = one branch = one PR.** The branch names the epic and the story it delivers, then a
short English kebab-case slug: `feat/<mod>-<NN>/us-<NN>-<slug>`.

- **Epic** = its id lowercased without `EP-`: `EP-ACC-01` → `acc-01`.
- **Story** = `us-` plus its number inside the module, two digits: `US-ACC-01` → `us-01`.
- **Type**: `feat/` delivers a story, `fix/` corrects one, with the same shape. Work that belongs to
  no story goes in `chore/<slug>`.

| Story                                  | Branch                             |
| -------------------------------------- | ---------------------------------- |
| `US-ACC-01` Ingreso (`EP-ACC-01`)      | `feat/acc-01/us-01-login-form`     |
| `US-RES-28` Devoluciones (`EP-RES-07`) | `feat/res-07/us-28-refunds`        |
| Defect in `US-ACC-02`                  | `fix/acc-01/us-02-blocked-message` |
| Tooling, no story                      | `chore/playwright-tooling`         |

```
✅ feat/acc-01/us-01-login-form   feat/res-07/us-28-refunds   chore/playwright-tooling
❌ feat/acc-01                     no story, and it blocks every feat/acc-01/... branch
❌ feat/acc-01/us-01-02-login      two stories on one branch
❌ feat/us-acc-01-login            no epic
❌ feature/login   <username>/login   feat/acc-01/us-01-inicio-de-sesion
```

Never create a bare `feat/acc-01` branch: git stores branches as paths, so it cannot hold
`feat/acc-01` and `feat/acc-01/us-01-...` at the same time.

**The name is right from the start.** Never rename a branch that has an open PR: GitHub closes the
PR and it cannot be reopened on the new name. A wrong name costs a new PR.

## 3. Commits

One short English sentence in the imperative, capitalised, no prefix, no trailing period — no
body, no trailers. The branch and the PR title already say which epic and story the work belongs
to, so the commit only says what was done.

- **The PR's first commit** is `Start <topic>` and adds the PR's changelog fragment (§5), so it is
  never empty.
- **Small, focused commits**: each one does one thing a reviewer can read on its own.
- **Fixes after a review are new commits** on the same branch. Never amend or rebase commits a
  reviewer has already commented on, and never force-push over them: line comments detach and
  the reviewer loses the before/after. `--force-with-lease` is acceptable only on a branch with
  zero reviews and zero comments.

```
✅ Start login form
✅ Add username and password login form
✅ Cover password rules shown before typing
✅ Show field errors next to the field that caused them

❌ feat(acc-01/us-01): add login form            no prefix: the branch carries the story
❌ add login form.                               not capitalised, trailing period
❌ Agrega formulario de ingreso                  Spanish
❌ Changes                                       says nothing
```

After the squash merge, `develop` keeps one commit per PR named after its title, so
`git log --grep "ACC-01.01"` finds a story and `--grep "ACC-01"` its epic.

### Ask before every commit and every push

The developer reviews every change before it is recorded and before it leaves the machine. An AI
tool never commits or pushes on its own:

- **Before each commit**, show the files that go into it, one line each with what changed, the
  real output of Prettier, lint, typecheck, tests and build, and the proposed message. Then ask,
  and wait for a yes. One question per commit.
- **Before each push**, show the branch, its base, the commits that will go up
  (`git log --oneline origin/<branch>..HEAD`, or `origin/<base>..HEAD` on a first push) and
  `git diff --stat` over them. Then ask, and wait for a yes. One question per push.
- **Opening a PR, taking it out of draft, and changing its labels or reviewers** are GitHub writes:
  each one is asked the same way, never bundled with a push.
- A yes covers the one commit or push it was asked for. It never carries over to the next one, and
  there is no mode that skips the question.

## 4. Pull requests

### Order: branch → draft PR → commits

Open the PR **as a draft** right after the starter commit, before the story code. Check first
that the branch has no open PR (`gh pr list --head <branch> --state open`).

### Title

`<MOD>-<NN>.<US>: <Topic>`: module letters and epic number from the epic id (`EP-ACC-01` →
`ACC-01`), a dot, the story number (`US-ACC-01` → `01`), a colon followed by one space, and an
English topic with only its first word capitalised. The module prefix is mandatory: every module's first epic is `01`.

A defect in a story puts its type after the colon; a PR that belongs to no story starts with the
type:

```
✅ ACC-01.01: Login form
✅ RES-07.28: Refunds
✅ ACC-01.02: fix - Blocked account message reveals the username
✅ chore - Team pull request workflow

❌ ACC-01: Login                         no story number
❌ EP-ACC-01 — US-ACC-01 a US-ACC-08     one story per PR
❌ 01.01: Login form                     no module prefix
❌ ACC-01.01 : Login form                space before the colon
❌ ACC-01.01:Login form                  no space after the colon
❌ ACC-01.01: Login Form                 every word capitalised
```

Changing a title is free (it touches nothing else); renaming the branch is not (§2). When the
title changes, update the PR's changelog fragment too.

### Body

The five headings of `.github/pull_request_template.md`, verbatim, in this order, content in
English:

1. **What does this PR do?** — what the story delivers, plus the size table
   (production lines, test lines, and what it depends on: `develop` or the branch below).
2. **How should this be manually tested?** — the branch, `npm run db:start` if it reads
   Supabase, `npm run dev`, the seeded local account, the exact route on a phone-width viewport
   first, and what is expected. Then the automated checks actually run.
3. **Screenshot** — mobile first, then desktop, for every state that changed; or
   `N/A — this change does not touch the interface`.
4. **Developer Notes** — the acceptance criteria as a checklist (ticked when the PR leaves
   draft; a criterion carried elsewhere names that PR), decisions a reviewer needs, and debt left
   open on purpose.
5. **Ticket** — the story's Markdown link into its Jira issue:
   `- [US-ACC-01](https://arenal-watersports.atlassian.net/browse/AWS-30)`. Read the `AWS-` key
   from Jira; never compute it from an offset.

Never drop, translate or reorder a heading: an empty one says `N/A` and why.

### Reviewers and labels

- **Reviewers: the whole team minus the author**, on every PR.
- **Labels on create: `In Progress` + `Enhancement`** (`Bugfix` for a defect, `Hotfix` for a
  hotfix branch).
- **Leaving draft**: `gh pr ready`, and swap `In Progress` for `Waiting for QA` in the same step.
  The two never sit together.
- **`QA Approved`** and **`Code Review Rejected`** are set by the reviewer, never by the author.
- **`OnHold`** means the PR cannot be run, reviewed or merged on its own yet — it needs a PR from
  another stack or code not yet on `develop`. It is not for a story with criteria deliberately
  left to a later PR. `OnHold` and `Waiting for QA` never sit together.

```bash
gh pr create --draft --base develop \
  --title "ACC-01.01: Login form" \
  --body-file pr-body.md \
  --reviewer <teammate-1>,<teammate-2> \
  --label "In Progress" --label "Enhancement"

gh pr ready <n>
gh pr edit <n> --remove-label "In Progress" --add-label "Waiting for QA"
```

A PR leaves draft only when its CI is green and its diff adds its own changelog fragment (§5).

## 5. CHANGELOG — one fragment per PR, in its own diff

Every PR writes **exactly one changelog line in a file of its own**, a fragment, in its starter
commit. Two PRs never edit the same file, so a merge never leaves the next PR with a changelog
conflict, and no approval is lost to one.

- **Where:** `changelog/unreleased/feature/` for stories and chores, `changelog/unreleased/bugfix/`
  for fixes.
- **Name:** the branch with every `/` turned into `-`, plus `.md` — `feat/acc-01/us-01-login-form`
  writes `changelog/unreleased/feature/feat-acc-01-us-01-login-form.md`.
- **Content:** one line, without the leading `- `: the PR title, an em dash, what changed, and the
  story plus its Jira key.

```text
changelog/unreleased/feature/feat-acc-01-us-01-login-form.md
ACC-01.01: Login form — username and password login screen at /access/login (US-ACC-01 · AWS-30)

changelog/unreleased/feature/chore-playwright-tooling.md
chore - Playwright tooling — Playwright configuration and capture helper

changelog/unreleased/bugfix/fix-acc-01-us-02-blocked-message.md
ACC-01.02: fix - Blocked account message reveals the username — the message no longer shows it (US-ACC-02 · AWS-31)
```

- **`CHANGELOG.md` is not edited in a feature PR.** Only the `release/*` PR changes it: there,
  `npm run changelog` moves every fragment into its `# UNRELEASED` sections and deletes the files.
- A fragment inherited from a lower PR of a stack **does not count**: a reviewer reads each diff
  alone. Never move a fragment from one PR to another.
- **CI checks it** on every pull request (`npm run changelog:check -- origin/<base>`): exactly one
  new fragment, one line, and `CHANGELOG.md` untouched. Run it locally before leaving draft.

```bash
npm run changelog:check -- origin/develop
```

## 6. Size: the 1000-line rule, and stacked PRs

### The rule is a gate, measured before writing

A PR stays **under 1000 changed lines**, code and tests together, because that is the number the
reviewer sees. 1000–1500 is heavy; past 1500 two topics got mixed.

It is measured **before each new piece of work goes onto a branch**, not at the end:

```bash
git diff --shortstat origin/<base>...HEAD
```

`<base>` is `develop`, or the branch below in a stack. **At 1000 or more, the new work does not go
on that branch**: cut a stacked branch from it, and say why in one line — _"At 1240 of a 1000
budget, so this goes on a stacked branch."_ Do not ask whether to pile on.

Plan the split **before** writing code: estimate the story (tests run 3–5× the production size).
A story that will not fit is split by layer (contracts and models → pure rules → data access →
state → UI), each part its own stacked branch and PR, numbered after the story:
`feat/res-07/us-28-01-refund-rules` titled `RES-07.28.01: Refund rules`, then
`feat/res-07/us-28-02-refund-screen` titled `RES-07.28.02: Refund screen`. Small commits give you
the seams to cut on.

### Stack only on a real code dependency

A PR's base decides **what its diff shows**, not where the code lands: everything still ends on
`develop`. A branch that imports code living only in another open PR does not compile against
`develop`, so it is stacked on that PR's branch. The test is objective — three commands:

```bash
git switch -c probe <branch> && git rebase develop && npm run typecheck
```

Compiles → base it on `develop`. Does not compile → stack it on the branch it depends on. Delete
the probe afterwards (`git switch <branch> && git branch -D probe`).

```
✅ stacked — refunds imports charge code that exists only in the charges PR
feat/res-07/us-26-charges     base develop                      RES-07.26: Charges
feat/res-07/us-28-refunds     base feat/res-07/us-26-charges    RES-07.28: Refunds

❌ stacked for convenience — an 8-line layout fix that imports nothing from the stack
fix/res-07/us-26-layout       base feat/res-07/us-28-refunds
```

Two PRs being open at the same time is not a dependency. Independent work — a different module,
a small fix — goes to `develop` and merges on its own; stacked, it waits behind everything below
it.

### Depth, merge order and retargeting

- A healthy stack is **3 to 6** deep. A longer one means the bottom is not being reviewed and
  merged; fix that, never by re-pointing the stack at `develop` (that brings back the giant
  diff).
- The root PR says it is a stack, read bottom-up.
- **Merge bottom-up only.** Nothing in the middle goes first.
- When the bottom PR merges, the repository deletes its branch and GitHub **retargets the next PR
  to `develop` on its own**. Never delete or rename a branch that has an open PR.
- A retarget alone does not start CI. The next PR already ran CI against its old base; when
  `develop` is merged into it, that push runs CI against `develop` before it merges.
- A lower branch that must change after review propagates up with `git merge`, never with rebase
  plus force-push: `git switch feat/res-07/us-28-refunds && git merge feat/res-07/us-26-charges --no-edit`.

### The squash false conflict

Squash-merging the bottom PR makes the next one show a conflict that is not real: its lower
commits are already on `develop`, flattened into one. Prove it and clear it with an ours-merge —
no force-push, the tree does not change:

```bash
git switch <child-branch> && git pull --ff-only
git diff --quiet <merged-parent-head-sha> origin/develop && echo "same tree"   # must print
git merge -s ours origin/develop -m "Merge develop after squash of <parent PR title>"
git diff --quiet origin/<child-branch> HEAD && echo "tree unchanged"          # must print
git push origin HEAD
```

The parent head SHA comes from `gh pr view <parent> --json headRefOid` (the branch is gone). If
`same tree` does not print, someone else landed on `develop` in between: stop and resolve by hand
— a fragment never conflicts, so look for a real code overlap.

## 7. UI stories ship end-to-end coverage

A story that renders or changes a screen ships, besides its unit tests:

- a Playwright spec `e2e/specs/<feature>.e2e.ts`, driven through a page object
  `e2e/pages/<Feature>.page.ts` whose navigation method is `goTo` (`structure-standards`);
- a capture script `e2e/screenshots/<feature>.screenshots.ts` that writes every state at the
  mobile viewport and at desktop into `playwright-screenshots/`.

The captures go into the PR's _Screenshot_ section, mobile first. **They are never committed**
(`playwright-screenshots/` is gitignored). E2E runs against the local Supabase stack
(`npm run db:start`) with seeded local accounts — never the hosted project. Only a story with no
screen (pure domain, a server-only route, a migration) is exempt, and its PR says so.

## 8. Before asking for review

```bash
npx prettier --check .
npm run lint
npm run typecheck
npm run test:run          # never `npm test`: watch mode
npm run build
npm run test:e2e          # every UI story
```

CI runs the first five, plus the changelog check, on every pull request — whatever its base, so a stacked PR is checked from its first push — and again on every push to `develop` and `main`. A newer push to the same PR cancels the run it replaces. A red PR does not leave draft.

Then run the review guards over the PR's own files — the pre-flight greps of
`structure-standards`, the `className` guard of `styles-standards` and the usted guard of
`constants-standards` §9 — and confirm the diff adds this PR's changelog fragment (§5). A PR that
renders a screen is also compared with its Stitch screen for palette and style
(`styles-standards`, _Visual reference — Stitch_). Every hit is fixed or named in _Developer
Notes_ with the reason it stays; a rule a reviewer has to point out costs a full review round.

```bash
git diff --name-only origin/<base>...HEAD
npm run changelog:check -- origin/<base>
```

## 9. Review and merge

- **Every teammate is a reviewer.** Each PR requests the whole team minus the author; one review is
  enough. A reviewer usually comes from a neighbouring area — reservations with charges,
  dispatch with catalogue, app structure with access — but anyone may take it.
- **The reviewer approves and labels.** An `APPROVED` review plus the `QA Approved` label, together.
  The author never approves or labels their own PR; `develop` and `main` require one approval.
- **The author merges their own PR** into `develop`, by hand, with _Squash and merge_, once it has
  `QA Approved`, an `APPROVED` review and base `develop`. Whatever the merge breaks, the author
  fixes in a new PR. A PR stacked on an unmerged parent waits whatever its labels say.
- **AI tools never merge anything.** The merge button is always pressed by a person.
- **Say it when a PR touches sensitive ground.** A PR that changes `supabase/migrations/`,
  `.github/` or the skills and agents (`.agents/`, `.claude/`, `AGENTS.md`) says so in
  _Developer Notes_, so the reviewer reads it with extra care.
- **Deleting is guarded.** The `Deletion guard` check fails a PR that deletes or renames a
  migration, or deletes a file another author added. Deleting your own files needs nothing. When
  every flagged deletion is intended, the repository owner adds the `Approved deletion` label; any
  later push removes it, so the new commits are approved again.
- `develop` reaches `main` only through a `release/*` PR.
- After a review: fix **every** thread and every other occurrence of the same pattern in the PR,
  push new commits, reply in each thread saying what changed, and swap `Code Review Rejected` /
  `OnHold` back to `Waiting for QA`. A thread with no reply reads as not addressed.
- Do not chase reviewers with comments or mentions: an open PR labelled `Waiting for QA` is the
  whole ask.
- One thing in progress per person: one Jira issue _In Progress_, one PR labelled `In Progress`.
  Getting approved PRs merged comes before starting new work.

## 10. Checklist

- [ ] Branch cut from a fresh `develop` (or the branch it truly depends on), named `feat/<mod>-<NN>/us-<NN>-<slug>`, one story
- [ ] `git diff --shortstat origin/<base>...HEAD` measured before adding work; under 1000
- [ ] Starter commit `Start <topic>` with this PR's changelog fragment (`npm run changelog:check` passes)
- [ ] Draft PR, correct title, five headings, every story linked to its `AWS-` issue
- [ ] Whole team minus the author as reviewers; `In Progress` + `Enhancement`
- [ ] Small commits, one short English imperative sentence each, no prefix
- [ ] Every commit and every push shown and approved first (§3)
- [ ] UI story: spec + page object + mobile/desktop captures in the body, none committed
- [ ] Prettier, lint, typecheck, unit tests, build and E2E green
- [ ] `structure-standards` pre-flight and `styles-standards` guard clean over the PR's files
- [ ] Ready: `gh pr ready`, `In Progress` → `Waiting for QA`
- [ ] Review fixes as new commits, every thread answered
- [ ] Merged by the author only after an `APPROVED` review and `QA Approved` from a teammate
