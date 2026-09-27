---
name: prettier-standards
description: Enforces every option in .prettierrc.json when writing or formatting files. Use when authoring code, fixing format drift, or updating the Prettier config.
---

# Prettier Standards

This skill is the **single source of truth** for how agents apply `.prettierrc.json`.

`.prettierrc.json` is canonical for formatting. This skill must stay in lockstep with it. If they disagree, **fix the skill to match the config** in the same change — do not invent a wider `printWidth` or skip a wrap.

`eslint-standards` still owns lint semantics. Quotes and semicolons **agree** with this config (double quotes, `semi: true`). Wrapping, indentation, trailing commas, and JSX attribute line breaks belong **here**. After lint is clean, still run Prettier — ESLint will not enforce `printWidth` or `singleAttributePerLine`.

---

## 1. Mandatory protocol

Whenever you create or edit a Prettier-supported file (JS/TS/TSX, JSON, CSS, Markdown, and others Prettier handles):

1. Write code that already matches **every** option below. Do not dump 80–100 character lines and hope a later format pass saves it.
2. After the edit, format the **touched files** and leave them identical to Prettier output:

```bash
npx prettier --write <touched-files>
```

3. Do not format the entire tree unless the user asked or they requested a PR-ready format pass (`npx prettier . --write`). Keep diffs scoped.
4. If you change `.prettierrc.json` or `.prettierignore`, update this skill in the same change.
5. Never add `// prettier-ignore` / `prettier-ignore` unless the user explicitly asked.

Do not hand-format against Prettier (tabs, single quotes, 80-col JSX, attributes crammed on one line). If you are unsure whether a line wraps, run Prettier — its output wins.

### Scope

|         |                                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------------- |
| Config  | `.prettierrc.json`                                                                                                         |
| Ignore  | `.prettierignore` (`node_modules/`, `.next/`, `dist/`, `coverage/`, lockfiles, env files, IDE folders, minified assets, …) |
| Command | `npx prettier --write <touched-files>`                                                                                     |

---

## 2. Configured options

From `.prettierrc.json`:

| Option                   | Value   | Requirement                                                                                                                                                    |
| ------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `semi`                   | `true`  | Semicolons on every statement.                                                                                                                                 |
| `singleQuote`            | `false` | Double quotes in JS/TS. JSX follows this (`jsxSingleQuote` is unset).                                                                                          |
| `tabWidth`               | `2`     | Two spaces per indent level. Never tabs.                                                                                                                       |
| `trailingComma`          | `"es5"` | Trailing commas in objects, arrays, and destructuring. **No** trailing commas in function/call argument lists. Type-parameter lists may have a trailing comma. |
| `printWidth`             | `60`    | Wrap at **60** columns. This is narrower than the Prettier default (80). Treat 60 as the wrap target.                                                          |
| `singleAttributePerLine` | `true`  | Two or more JSX/HTML attributes: **one attribute per line**. Closing `>` sits on its own line (`bracketSameLine` default is `false`).                          |

Unspecified options keep Prettier defaults this repo already relies on: spaces not tabs, `bracketSpacing: true` (`{ foo: bar }`), `arrowParens: "always"` (`(value) => value`), LF line endings.

---

## 3. Quotes, semicolons, indent

**Incorrect:**

```ts
const label = "ready";
const count = 1;
```

**Correct:**

```ts
const label = "ready";
const count = 1;
```

---

## 4. `printWidth: 60`

Do not write long one-liners. Break signatures, imports, props, and JSX **before** 60 characters rather than after.

**Incorrect:**

```tsx
const StatusBadge = ({
  label,
  isActive,
}: StatusBadgeProps): JSX.Element => (
  <span className={isActive ? "active" : "idle"}>
    {label}
  </span>
);
```

**Correct:**

```tsx
const StatusBadge = ({
  label,
  isActive,
}: StatusBadgeProps): JSX.Element => (
  <span className={isActive ? "active" : "idle"}>
    {label}
  </span>
);
```

Prettier’s `printWidth` is a target, not a hard cap. A few lines may exceed 60 when wrapping would be worse. **Do not** use that as permission to author 80+ character lines. Write for 60, then let `npx prettier --write` settle remaining wraps.

---

## 5. `singleAttributePerLine: true`

One JSX attribute may stay on the opening tag if it fits `printWidth`. Two or more attributes each get their own line. Spread counts as an attribute.

**Incorrect:**

```tsx
<button
  className={className}
  disabled={isDisabled}
  type="button"
>
  {label}
</button>
```

**Correct:**

```tsx
<button
  className={className}
  disabled={isDisabled}
  type="button"
>
  {label}
</button>
```

Single attribute, still short enough:

```tsx
<span className={className}>{label}</span>
```

---

## 6. `trailingComma: "es5"`

**Incorrect:**

```ts
const options = {
  retry: true,
  timeoutMs: 300,
};

const loadUser = (
  id: string,
  locale: string
): Promise<User> => fetchUser(id);
```

**Correct:**

```ts
const options = {
  retry: true,
  timeoutMs: 300,
};

const loadUser = (
  id: string,
  locale: string
): Promise<User> => fetchUser(id);

const Card = ({
  title,
  onClose,
}: CardProps): JSX.Element => (
  <section>{title}</section>
);
```

Objects, arrays, and destructured params take a trailing comma. Plain parameter / argument lists do not.

---

## 7. Checklist

Before finishing a formatted-file change:

- [ ] Double quotes; semicolons; 2-space indent; no tabs
- [ ] Lines authored toward 60 columns (`printWidth`)
- [ ] Multi-attribute JSX: one attribute per line; `>` on its own line
- [ ] ES5 trailing commas (objects/arrays/destructure yes; call args no)
- [ ] `npx prettier --write <touched-files>` has been run
- [ ] No `prettier-ignore` unless the user asked
