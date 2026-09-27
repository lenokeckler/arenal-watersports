---
name: code-standards
description: Language-agnostic engineering standards for writing or reviewing code — architecture and module boundaries, SOLID, single responsibility, naming and zero hardcoded values, file and function size limits, error handling, security, performance, and testing. Use when implementing a feature, refactoring, reviewing a diff, deciding where code should live, or when asked whether code follows good practices.
---

# Code Standards

Non-negotiable rules for any code you write or approve, in any language.
Depth and worked examples live in `references/` — load a reference only when
the task actually touches that topic.

## Hard limits

| Rule                        | Limit                                  |
| --------------------------- | -------------------------------------- |
| File length                 | 150 lines                              |
| Function / method length    | 40 lines                               |
| Function parameters         | 4 (beyond that, pass an object/struct) |
| Nesting depth               | 3 levels                               |
| Responsibilities per module | 1                                      |

Exceeding a limit is a signal to split, never something to justify in a comment.
Generated files, lockfiles, and vendored code are exempt.

**Counting nesting depth.** The function body is depth 0. In a script with
top-level statements outside any function, the script body itself is depth 0 —
it is never exempt from the limit. Each enclosing control-flow block adds one: `if` / `else`, `for`, `while`, `until`, `case` /
`switch`, `try` / `catch`, `with`, and the body of a nested function, closure,
or callback. Count the deepest point in the function, not the average.

- A `case` / `switch` counts as **one** level in total, not one per arm or branch.
- `else if` chained onto an `if` is the **same** level, not a new one.
- Line continuations, pipes, redirections, heredocs, and long expressions are
  not nesting.
- A guard clause that returns early does not nest what follows it — that is the
  intended fix when a function is too deep.

Depth 3 means three enclosing blocks are acceptable and a fourth is not.

## The core rules

1. **One reason to change.** Every file, class, and function has a single
   responsibility. If its description needs "and", split it.
2. **No hardcoded values.** No magic numbers, no inline strings for messages,
   paths, keys, URLs, or limits. Named constants, config, or i18n keys.
3. **Depend on abstractions.** High-level code must not import concrete
   low-level implementations. Inject the dependency; do not reach for a global.
4. **Errors are explicit.** No swallowed exceptions, no bare `catch {}`, no
   ignored return codes. Fail fast on unrecoverable state.
5. **No duplicated logic.** Second occurrence is a warning, third is a defect.
   Extract to a shared unit with a name that states intent.
6. **Names reveal intent.** A reader must not need the implementation to know
   what a symbol does. No abbreviations, no `data`, `info`, `tmp`, `handle`.
7. **Important logic is tested.** Business rules, parsing, state transitions,
   and error paths get tests. Trivial accessors do not.

## Before writing code

- Read the surrounding code first. Match its conventions over your preferences.
- Never guess project structure. If it is unclear where something belongs, ask.
- Prefer extending an existing module over creating a parallel one.

## Before declaring work done

Verify each item; fix anything that fails rather than reporting it:

- [ ] Within every limit in the table above
- [ ] No magic numbers or hardcoded strings
- [ ] Each new unit has one responsibility, stated in one sentence
- [ ] Every fallible call handles its failure path
- [ ] No duplicated logic introduced
- [ ] Names readable without the implementation
- [ ] Tests exist for the important logic added
- [ ] No leftover TODO, commented-out code, or debug output

## References

| File                         | Load when                                                  |
| ---------------------------- | ---------------------------------------------------------- |
| `references/architecture.md` | Designing modules, layers, boundaries, applying SOLID      |
| `references/naming.md`       | Naming symbols, extracting constants, killing magic values |
| `references/errors.md`       | Code touches IO, APIs, parsing, or any fallible operation  |
| `references/security.md`     | Code handles input, output, credentials, or user data      |
| `references/performance.md`  | Writing loops, queries, async flows, or hot paths          |
| `references/testing.md`      | Writing or reviewing tests                                 |

Language-specific idioms are **not** here — see `.agents/skills/stack-rules/SKILL.md`.
