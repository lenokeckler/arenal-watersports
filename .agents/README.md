# Agent skills (single source of truth)

Task-scoped coding standards for Arenal Water Sports live here as Agent Skills:

```text
.agents/skills/<skill-name>/SKILL.md
```

## How agents discover them

Every IDE/agent entrypoint routes through root `AGENTS.md`, which catalogs these skills and requires matching `SKILL.md` files to be read before work.

| Entrypoint                        | Purpose                                                |
| --------------------------------- | ------------------------------------------------------ |
| `AGENTS.md`                       | Cross-tool contract + skill router                     |
| `CLAUDE.md`                       | Imports `AGENTS.md`                                    |
| `.github/copilot-instructions.md` | Instructs Copilot to read `AGENTS.md` + skills         |
| `.cursor/rules/skills.mdc`        | Always-on Cursor rule pointing at `AGENTS.md` + skills |

## Adding a skill

1. Add `.agents/skills/<kebab-name>/SKILL.md` with `name` and `description` frontmatter.
2. Register it in the skill catalog inside `AGENTS.md`.
3. Do **not** copy the skill body into IDE bridge files.
