---
name: agent-dev
description: Runs a non-trivial task through the specialized agent roles in the right order — design-director, code-architect, implementer, then standards-auditor and qa-tester in parallel, with a bounded fix loop that qa-tester always closes, committing task by task instead of one bulk commit. Use for any non-trivial coding task in this repository — implementing a story, fixing a bug, refactoring a module, auditing code quality, or shipping UI. Skips stages that do not apply.
---

# Agent Dev

Delegation runs from **this** thread. Never spawn an agent whose job is to
delegate — you own the sequencing.

**If your tool can run subagents**, delegate each stage below to the role in
`.claude/agents/<role>.md`. **If it cannot**, do every stage yourself, in the
same order, reading the referenced skill by path before each one — the
sequence and the gates are the point, not which process runs them.

## Preflight — before any stage

Two checks, once per invocation. Both are cheap, and skipping either one wastes
the run: a pipeline promised around a missing agent stalls halfway, and an agent
never pointed at the project's rules produces work that has to be redone.

**Which agent roles actually exist here.** This skill names five —
`design-director`, `code-architect`, `implementer`, `standards-auditor`,
`qa-tester` — defined in `.claude/agents/*.md`. List what your tool can actually
run before promising a pipeline: if a role has no runnable agent in your tool,
say so in the triage line and either do that stage yourself or fold it into the
nearest stage that can run. Never announce a stage that cannot run.

**What conventions this project already declares.** Read `AGENTS.md` at the
repository root first — it is the cross-tool contract and it names every
applicable `.agents/skills/<name>/SKILL.md` **by path** in its catalog. Those
paths outrank this skill's defaults and outrank an agent's own judgment.
Summarizing a skill instead of citing its path is not a substitute: an agent
reads its handoff first, and a file it was not pointed at does not get opened.

## Stage 0 — Triage (you, no agent)

Classify the request, then state in one line which stages will run and why.
Never launch anything before this line.

| Request                               | Stages                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| Feature, multi-module                 | `code-architect` → `implementer` → review loop                                  |
| Feature, single obvious file          | `implementer` → review loop                                                     |
| Bug fix                               | `qa-tester` (reproduce only) → `implementer` → review loop                      |
| Refactor                              | `standards-auditor` (baseline) → `code-architect` → `implementer` → review loop |
| Audit only                            | `standards-auditor`, stop. No edits                                             |
| UI work with no design system defined | `design-director` → `implementer` → review loop                                 |
| Design direction only                 | `design-director`, stop                                                         |
| Test writing only                     | `qa-tester`, stop                                                               |

"Review loop" means the parallel `standards-auditor` ‖ `qa-tester` round,
followed by the bounded fix loop below.

Skip a stage whenever its input already exists — an approved structure, an
existing design system, a reproduction already in hand. Say what you skipped.

Passing `--no-loop` in the invocation runs one pass and reports; no fix rounds.

## Stage 1 — `design-director`

Runs only when the task touches UI **and** tokens, type scale, spacing, or
motion are undefined for what is being built.

Delivers: token values, layout spec, motion spec, handoff notes.
Gate to next: the implementer can build without inventing a visual decision.

## Stage 2 — `code-architect`

Runs when the change touches more than one module, introduces modules, or is a
refactor.

Delivers: target structure, contracts, dependency direction, ordered steps.
Gate to next: every proposed unit has a one-sentence purpose and a defined
interface. Without contracts, do not proceed — the implementer will improvise.

## Stage 3 — `implementer`

Always runs when code changes. Hand it: the requirement, the architecture plan
(if stage 2 ran), the design spec (if stage 1 ran), and the acceptance criteria
— copied verbatim from their source, never authored by an agent.

Gate to next: the project's build, typecheck, and formatter pass. Auditing or
testing broken code produces noise, not findings.

**Where the commands come from**, in order of precedence:

1. The exact commands the invoking skill handed over (`npm run lint`,
   `npm run typecheck`, `npm run test:run`, `npm run build`, and so on — see
   `AGENTS.md`). Use them verbatim.
2. Otherwise, read them off `package.json` scripts. State which ones you found.
3. Never invent a command, and never install a tool to make a check possible.
   If a check has no runner in the project, say the check was skipped and why.

Never run a test command in watch mode — `npm run test:run`, not `npm test`.

## Stage 3.5 — Checkpoint commits

Applies whenever the work has more than one distinct unit — a task list, several
acceptance criteria, or a change spanning multiple files. Long tasks are the norm,
not the exception: one giant commit at the end is a defect.

Break the work into the smallest units that leave the tree in a working state, and
state the list before starting, marking which one is next:

```
Units of work:
  1. <unit>          <- next
  2. <unit>
  3. <unit>
```

After finishing each unit, report in exactly this shape:

1. **What the unit closes, and against which acceptance criteria.** List them, marking each
   one met or pending. A pending criterion is said out loud, never hidden.
2. **The files touched, one line each, with what changed in that file** — path plus change,
   so the user can go read the diff. Not a summary paragraph.
3. **The real output of the formatter, linter, typechecker, tests and build**, in that
   order. Never report a check as passed that did not run; say plainly when one was skipped
   and why.
4. **Ask whether to commit that unit and move on to the next**, then wait for the answer.
   Do not chain three units and ask once at the end. Ask in the language the user is
   writing in.

On yes, commit with a message following `.agents/skills/pull-request-workflow/SKILL.md`
(one short English imperative sentence, no prefix, no trailers), then continue.
**Everything written into the repo is English** — commit messages, code, docs,
PR text — even when the conversation is in another language. Only the
conversation follows the user's language.

**Each unit is its own `implementer` handoff.** Never hand the whole task to one
`implementer` run and split the diff afterwards: the agent builds every unit in one pass,
the user sees nothing until it is all there, and the review round then reads one pile.
Decide the units first, hand the agent the full list marked with the one unit in scope,
run the verification, report, ask, commit — and only then launch the next handoff. A unit
that is smaller than it looks (a constants file plus its models) is still a unit.

Rules:

- **Correcting work that is already committed is its own unit.** When a decision taken
  mid-task invalidates something that already landed, that correction gets its own commit,
  made before the new work's commits — never folded into the new unit, and never hidden by
  amending the old one. Amending is an option only while the history is unpublished or
  unreviewed; it costs a force-push and it erases the fact that the decision changed. Offer
  both and let the user choose; default to the visible correction.
- One unit of work = one commit. Never squash unrelated units into one commit.
- Never commit a tree that does not build.
- Every commit is asked for, every time, as `.agents/skills/pull-request-workflow/SKILL.md`
  §3 describes. There is no auto-commit mode and no answer that turns the question off.
- When an invoking skill already asks the commit question, this stage does not ask it a
  second time — one prompt per unit, one owner — but the question is never skipped.
- Pushing, opening or readying a PR, and merging are never done by this stage. Each push
  is asked for separately, as §3 of the pull-request workflow describes.

## Non-negotiables the implementer must not break

These are cheap to get right while writing and expensive to fix in review. State them in
the `implementer` handoff every time:

- **Types, interfaces and enums do not live in the file that renders or executes.** They go
  to wherever the surrounding code already puts them — `models/` in this repository
  (`.agents/skills/structure-standards/SKILL.md`). The consuming file imports its types; it
  does not declare them. This holds even for a one-field type used in a single place.
- **No hardcoded values.** Ids, labels, routes, paths, URLs, strings repeated across files,
  numbers with meaning: all of them belong to `.agents/skills/constants-standards/SKILL.md`.
  A module-level constant declared **inside the same file** does not count as extracting it —
  it is the same literal, moved four lines up. The test is _where the value is declared_, not
  whether it has a name. This pattern repeats: check **every** file of the change for it,
  not just the one that prompted the rule.
- **Nothing is implemented that the task did not ask for.** Extra sections, extra fields,
  helpful defaults nobody requested — all of it gets reported, not built.
- **No comments in the code, ever** (`.agents/skills/structure-standards/SKILL.md` §14). No
  JSDoc on components, hooks, props, services or tests, no `//` restating what the next line
  does, no commented-out code, no `TODO`. A name or a smaller function carries the intent.
  Before reporting a unit, grep the diff for `^\s*(//|/\*|\*)` (URLs and directives such as
  `"use client"` excluded) and remove every hit that does not carry a why the code cannot
  show. This applies to `qa-tester`'s test files as well: the test name is the documentation.

Repeat these in the handoff even when a project skill also says them: the agent reads the
handoff first.

## When the work is large, review as it lands

A task that will touch more than ~30 files does not get one review pass at the end. Run the
review round on each unit as it closes, before the next one starts.

The reason is not tidiness, it is what the reviewers can see. Duplication between parallel
modules is obvious the moment the second one exists and invisible while each is being
written; a leaking abstraction is cheap to fix before ten files depend on it. Auditing one
big pile also means the fix round reopens files that were already finished, which is how a
"done" unit becomes unfinished again.

The units are the same ones Stage 3.5 commits: usually pure logic, then server, then state,
then UI. Decide them before Stage 3 starts, not after the diff exists.

## Stages 4 + 5 — Review round, in parallel

Launch **both in a single message** so they run concurrently. They are
independent: one is static analysis, one executes.

**`standards-auditor`** — audits the diff against `.agents/skills/code-standards/SKILL.md`
and the applicable `.agents/skills/*` project standards. Reports `file:line` with severity.
Does not edit.

**`qa-tester`** — finds bugs, and **writes unit tests** with the Page Object Model of
`.agents/skills/unit-testing-standards/SKILL.md`. Tests are a required deliverable, not
optional:

- New logic ships with tests: business rules, parsing, state transitions,
  error paths
- Every bug fix ships with a regression test that fails before and passes after
- The suite is actually run (`npm run test:run`) and its real output reported
- It reports bugs; it never fixes application code

Pass both agents the findings already dismissed in earlier rounds so resolved
items do not reappear.

## Stage 6 — Fix loop

```
implementer (fixes ONLY the reported findings)
    → qa-tester revalidates
    → still critical/high?  →  repeat
```

Rules:

- **Cap: 3 rounds.** On exhaustion, stop and report what remains, by severity.
  Never loop indefinitely.
- **Convergence check:** if a round does not reduce the finding count, stop.
  That is a design problem, not an implementation one — return to
  `code-architect` and say so.
- The fixer touches only what was reported. Adjacent problems get noted, not
  fixed.
- `qa-tester` always runs last in every round. It closes the pipeline.
- **Medium and low findings do not gate the exit, but they are never dropped.** Carry
  them to the final report as accepted debt: `file:line`, severity, one-line fix. The
  user decides whether they get fixed now, later, or never — silence is not that decision.

## Exit criteria

All must hold before reporting done:

- [ ] Zero critical findings, zero high findings
- [ ] Test suite runs and passes — with the real output shown
- [ ] Unit tests exist for the important logic added
- [ ] Formatter, linter, and typechecker clean
- [ ] Every stage that ran is accounted for in the summary
- [ ] Work landed as small scoped commits, not one bulk commit
- [ ] Remaining medium/low findings are listed, not silently dropped

If any fail after the round cap, report the state honestly. Never present a
pipeline as complete when a gate did not pass.

## Handoffs

Each agent gets: objective, explicit scope, acceptance criteria, constraints,
expected output format, and the relevant output of the previous stage. Never
hand an agent a vague scope, and never give two agents overlapping scope.

Five rules; leaving any one out of a handoff forces a stage to be redone:

- **Name the project's rule files by path**, and say what each one governs for this task.
  An agent reads its handoff first; a path it was not given is a file it never opens.
- **Mark settled decisions as settled.** An agent that is not told a choice is closed will
  re-open it — swapping a route, dropping a requirement as "out of scope", renaming a
  module. Say which decisions are the user's and already made, then check the result
  against them before moving to the next stage.
- **Working artifacts go to `.agents/tmp/`, never into the repository.** Design specs,
  architecture plans and review notes are inputs to the next stage, not deliverables:
  give the agent an explicit path under `.agents/tmp/` in the handoff (it is gitignored),
  or it will either write into the project or hand the document back in its reply. The
  only documents that belong in the repo are the ones the project's own conventions
  require. **An agent deletes only the files it created, never the whole `.agents/tmp/`
  directory or another agent's files** — say so in every handoff that allows cleanup, because
  an agent told only to "clean up its artifacts" may wipe artifacts other stages still need,
  and agent transcripts are not a reliable backup. ✅ "Delete only `.agents/tmp/qa/`, which
  you created." ❌ "Clean up the scratchpad when you are done."
- **Acceptance criteria are copied from the source, never authored by an agent.** When the
  task comes with criteria — a story, a ticket, a spec — they are pasted verbatim. An agent
  writing its own criteria is how work gets built that nobody asked for.
- **Scope is a boundary, not a floor.** Anything that looks necessary but is not in the
  criteria is reported back as a question, not built. This binds every stage: a designer
  may not add sections, an implementer may not add features, and neither may "improve" the
  scope on the way past.

## Final report

```
Stages run:   which, and why the others were skipped
Result:       what changed, file by file
Findings:     resolved / remaining, by severity
Debt:         medium+low left open, as file:line + one-line fix
Tests:        added, and suite status with real output
Open:         anything the round cap left unfinished
```

## Keeping this file useful

Everything here is a rule that runs on every invocation, which is why it stays
in one file. If it grows past roughly 400 lines, that is the signal to split:
the workflow and the rules that apply _always_ stay in `SKILL.md`, and what is
only consulted _sometimes_ — long examples, per-stack specifics, extended
rationale — moves to `references/`, loaded on demand. A file where
everything weighs the same is a file where the critical rules stop standing out.
