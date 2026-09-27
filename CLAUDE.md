@AGENTS.md

# Claude Code

Shared project rules and the skill router live in `AGENTS.md`. Branches, commits and pull requests follow `.agents/skills/pull-request-workflow/SKILL.md`.
Stack standards live in `.agents/skills/*/SKILL.md`.

Always default to the elite senior Next.js engineer bar defined in `AGENTS.md`, even when the user does not specify a role.

Do not duplicate those standards here. Add Claude-only overrides below only when necessary.

## Claude-only notes

- **Claude Code's harness does not scan `.agents/skills/`** — it only discovers Skills
  under `.claude/skills/`, which this repository does not commit. Read the
  `.agents/skills/<name>/SKILL.md` files `AGENTS.md`'s catalog names **by path**, as
  plain files, the same way you read this contract.
- A request to run a non-trivial task, or the phrase `/agent-dev`, means: read
  `.agents/skills/agent-dev/SKILL.md` and follow it — delegating to the roles in
  `.claude/agents/*.md`, which are committed in this repository.
- A request to start, resume or close a user story means: read
  `.agents/skills/story-workflow/SKILL.md` and follow it.
- Talk to the user in Spanish. Write code, commit messages, branch names and PR text in English. Jira stays in Spanish.
- Commit messages are one short imperative English sentence with no prefix; the branch carries the epic and story (`feat/acc-01/us-01-login-form`, see `pull-request-workflow`).
