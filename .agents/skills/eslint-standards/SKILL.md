---
name: eslint-standards
description: Enforces every rule in eslint.config.mjs when writing or changing JS/TS/TSX. Use when authoring code, fixing lint errors, or updating the ESLint config.
---

# ESLint Standards

This skill is the **single source of truth** for how agents apply `eslint.config.mjs`.

`eslint.config.mjs` is canonical for the linter. This skill must stay in lockstep with it. If they disagree, **fix the skill to match the config** in the same change — do not weaken or skip a rule.

`code-style-standards` defers here for anything ESLint covers (quotes, semicolons, arrow bodies/callbacks, `console`, unused vars, control-flow shape). Naming and `const` component/hook declarations still come from `code-style-standards`.

`prettier-standards` owns wrapping, indent, trailing commas, and JSX attribute line breaks (`.prettierrc.json`). Quotes and semicolons match that config. After ESLint is clean, still run Prettier — lint does not enforce `printWidth` or `singleAttributePerLine`.

---

## 1. Mandatory protocol

Whenever you create or edit `**/*.{js,jsx,mjs,cjs,ts,tsx}`:

1. Write code that satisfies **every** rule in this skill (and therefore in `eslint.config.mjs`).
2. After the edit, run ESLint on the touched files and **zero** remaining errors before finishing:

```bash
npx eslint <touched-files>
# or project-wide
npm run lint
```

3. Prefer `npx eslint <touched-files> --fix` for auto-fixable violations, then repair anything still reported by hand.
4. If you change `eslint.config.mjs`, update this skill in the same change (rule list, options, examples, checklist).

Do not leave `console.log`, unused variables, `var`, `==`, or other violations “for later.” Do not disable a rule with an inline comment unless the user explicitly asked and the exception is documented at the site.

### Scope

|         |                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------- |
| Files   | `**/*.{js,jsx,mjs,cjs,ts,tsx}`                                                                        |
| Ignores | `node_modules/**`, `.next/**`, `dist/**`, `coverage/**`, `functions/lib/**`, `functions/.eslintrc.js` |
| Base    | `js.configs.recommended`, `tseslint.configs.recommended`                                              |
| Plugins | `eslint-plugin-react-hooks` (`recommended`)                                                           |

Honor TypeScript recommended as well — in particular **no `any`**, no unused `@ts-` escapes, and no implicit `require()` in TS. Unused vars are overridden below.

---

## 2. Formatting

| Rule                              | Requirement                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `quotes`                          | Double quotes (`"`). Never single quotes.                                                                 |
| `semi`                            | Semicolons required.                                                                                      |
| `padding-line-between-statements` | Blank line after the last `import` before any non-import statement. Consecutive imports may sit together. |

**Incorrect:**

```ts
import { useState } from "react";
const [value, setValue] = useState("");
```

```ts
import { STRING } from "@/app/constants";

const label = "hello";
```

**Correct:**

```ts
import { useState } from "react";

const [value, setValue] = useState("");
```

```ts
import { STRING } from "@/app/constants";

const label = "hello";
```

---

## 3. Arrows, templates, and bodies

| Rule                    | Requirement                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| `prefer-arrow-callback` | Callbacks are arrows, not `function () {}`.                                                                    |
| `arrow-body-style`      | `"as-needed"` — expression body when the function only `return`s; braces only when there are other statements. |
| `prefer-template`       | Template literals instead of `string + string`.                                                                |

**Incorrect:**

```ts
items.map(function (item) {
  return item.id;
});

const fullName = firstName + " " + lastName;

const getLabel = (id: string): string => {
  return `item-${id}`;
};
```

**Correct:**

```ts
items.map((item) => item.id);

const fullName = `${firstName} ${lastName}`;

const getLabel = (id: string): string => `item-${id}`;

const loadLabel = async (id: string): Promise<string> => {
  const label = await fetchLabel(id);
  return label;
};
```

React with a single return uses parentheses, not a block + `return`:

```tsx
const StatusBadge = ({
  label,
}: StatusBadgeProps): JSX.Element => <span>{label}</span>;
```

Use a block body when hooks, lets, or multiple statements are required.

---

## 4. Bindings, unused, and order

| Rule                                               | Requirement                                                                                         |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `no-var`                                           | `const` / `let` only.                                                                               |
| `prefer-const`                                     | `const` unless the binding is reassigned.                                                           |
| `no-unused-vars`                                   | Off (core).                                                                                         |
| `@typescript-eslint/no-unused-vars`                | Error. Unused args may be prefixed with `_` (`argsIgnorePattern: "^_"`).                            |
| `no-use-before-define`                             | Declare a value before it is used. Arrow `const`s are not hoisted — helpers go **above** consumers. |
| `no-shadow`                                        | Do not reuse an outer name in an inner scope.                                                       |
| `no-redeclare` / `@typescript-eslint/no-redeclare` | Off — do not invent a substitute policy.                                                            |
| `no-multi-assign`                                  | One assignment per statement.                                                                       |
| `default-param-last`                               | Defaulted parameters come last.                                                                     |

**Incorrect:**

```ts
const Card = (): JSX.Element => <p>{formatTitle(title)}</p>;

const formatTitle = (value: string): string => value.trim();

const handler = (id: string, unusedFlag: boolean): void => {
  submit(id);
};

let count = 0;
count = getCount();
```

**Correct:**

```ts
const formatTitle = (value: string): string => value.trim();

const Card = (): JSX.Element => <p>{formatTitle(title)}</p>;

const handler = (id: string, _unusedFlag: boolean): void => {
  submit(id);
};

const count = getCount();
```

---

## 5. Control flow and equality

| Rule                | Requirement                                                       |
| ------------------- | ----------------------------------------------------------------- |
| `eqeqeq`            | `===` / `!==` only.                                               |
| `curly`             | Braces on every `if` / `else` / `for` / `while` / `do`.           |
| `no-else-return`    | No `else` after `return`.                                         |
| `consistent-return` | Either every branch returns a value, or none do.                  |
| `default-case-last` | `default` is the last `switch` clause.                            |
| `no-lonely-if`      | `else { if` becomes `else if`.                                    |
| `no-useless-return` | No trailing `return;` that does nothing.                          |
| `block-scoped-var`  | Do not rely on a `var` leaking across blocks (use `const`/`let`). |
| `for-direction`     | Loop updates must move toward the end condition.                  |

**Incorrect:**

```ts
if (status == "ready") return label;

if (isValid) {
  return payload;
} else {
  return fallback;
}

if (isAdmin) {
  grant();
} else {
  if (isEditor) {
    grantLimited();
  }
}
```

**Correct:**

```ts
if (status === "ready") {
  return label;
}

if (isValid) {
  return payload;
}

return fallback;

if (isAdmin) {
  grant();
} else if (isEditor) {
  grantLimited();
}
```

---

## 6. Side effects, emptiness, and async

| Rule                          | Requirement                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `no-console`                  | No `console.*`. Route errors through UI, thrown errors, or existing app logging — never `console.log` / `console.error`. |
| `no-empty`                    | No empty blocks. Remove the block; a comment does not excuse it (`structure-standards` §14).                             |
| `no-empty-function`           | No empty functions. Name the intentional no-op instead of commenting it.                                                 |
| `no-new`                      | Do not `new` a constructor for side effects while discarding the instance.                                               |
| `no-return-assign`            | Do not assign in a `return`.                                                                                             |
| `no-unused-expressions`       | No expression statements that do nothing (including short-circuit side effects used as statements when unused).          |
| `operator-assignment`         | Use `+=`, `-=`, etc. when assigning from the same binding.                                                               |
| `require-await`               | Do not mark a function `async` unless it `await`s.                                                                       |
| `no-template-curly-in-string` | No `${...}` inside a normal string — use a template literal.                                                             |

**Incorrect:**

```ts
console.log(response);

const onDismiss = (): void => {};

const loadUser = async (id: string): Promise<string> => id;

total = total + 1;
```

**Correct:**

```ts
onError(response);

const onDismiss = (): void => {
  closeModal();
};

const loadUser = (id: string): Promise<string> =>
  fetchUser(id);

total += 1;
```

---

## 7. React Hooks

Spread of `react-hooks` recommended:

- `react-hooks/rules-of-hooks` — hooks only at the top level of React functions; never in conditions, loops, or nested functions.
- `react-hooks/exhaustive-deps` — include every reactive value used inside `useEffect` / `useMemo` / `useCallback`, or restructure so the dependency is unnecessary. Do not lie with a comment-disable unless the user explicitly asked.

Hooks belong in `use*ViewModel.ts` (see `component-architecture`), not in presentation `.tsx`. That placement still must satisfy these rules.

---

## 8. Integrity rules (never ship)

These are `"error"` and must not appear in new or edited code. Do not “work around” them — fix the program.

`no-class-assign`, `no-cond-assign`, `no-const-assign`, `no-dupe-args`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty-pattern`, `no-ex-assign`, `no-fallthrough`, `no-func-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-self-assign`, `no-self-compare`, `no-sparse-arrays`, `no-unexpected-multiline`, `no-unreachable`, `no-unreachable-loop`, `no-unsafe-negation`.

`no-restricted-syntax` guards `styles-standards`: a `className` may not carry a string literal
(bare or inside `{}`), a template literal or a ternary — the value is always a constant (or a
resolver) imported from a `styles/*.styles.ts` file. The four selectors live in
`eslint.config.mjs` and apply to every `.tsx`; fix the component, never the rule.

**Incorrect:**

```tsx
<main className="flex min-h-screen flex-col">
<p className={`text-base ${isBold ? "font-bold" : ""}`}>
```

**Correct:**

```tsx
<main className={HOME_PAGE_MAIN_CLASS}>
<p className={resolveTextClassName(isBold, className)}>
```

`no-restricted-imports` guards the one-way imports of `component-architecture` §1, with two
blocks in `eslint.config.mjs`:

- **Shared folders** (`app/components`, `constants`, `providers`, `services`, `store`, `styles`,
  `types`, `utils`) never import `@/app/features/...`. The one exception is `app/store/index.ts`,
  which registers each feature's slice.
- **A feature** never imports `@/app/features/...`: another feature is off limits, and its own
  files are imported with relative paths. A relative path never climbs out of the feature folder
  either; the rule cannot see that, so review catches it.

Routes (`app/access/`, `app/(system)/`) are the only place that imports features.

**Incorrect:**

```ts
// app/components/button/Button.tsx
import { LOGIN_FORM_COPY } from "@/app/features/access/login-form/constants/LoginFormCopy.constants";

// app/features/access/login-form/LoginForm.tsx
import AccessScreen from "@/app/features/access/access-screen-shell/AccessScreen";
```

**Correct:**

```ts
// app/access/layout.tsx — a route composes features
import AccessScreen from "@/app/features/access/access-screen-shell/AccessScreen";

// app/features/access/login-form/LoginForm.tsx — own files, relative
import { useLoginFormViewModel } from "./hooks/useLoginFormViewModel";
```

What two features need moves down to a shared folder; fix the import, never the rule.

Switch `case`s that fall through need an explicit `break` / `return` / `throw` (or a valid `// falls through` comment only if ESLint accepts it — prefer no fallthrough).

---

## 9. Checklist

Before finishing any JS/TS change:

- [ ] Double quotes and semicolons
- [ ] Blank line after the import block
- [ ] Arrow callbacks; `arrow-body-style` as-needed; template literals
- [ ] `const` by default; no `var`; no unused bindings (prefix unused args with `_`)
- [ ] Helpers declared before use (no hoisting of `const` arrows)
- [ ] `===`, braces on every control path, no `else` after `return`
- [ ] No `console.*`
- [ ] No empty blocks or functions
- [ ] `async` only when `await` is used
- [ ] Hooks at top level with complete dependency arrays
- [ ] No literal, template or ternary inside `className` (`styles-standards`)
- [ ] No `@/app/features/...` import outside a route; a feature imports only its own files
- [ ] `npx eslint <touched-files>` (or `npm run lint`) is clean
- [ ] Formatted per `prettier-standards` (`npx prettier --write` on touched files)
