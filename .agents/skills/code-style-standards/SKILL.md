---
name: code-style-standards
description: Enforces arrow function syntax for components and hooks, descriptive variable naming, and defers hard-coded strings/magic numbers to constants-standards.
---

# Code Style Standards

This skill defines the coding style rules for writing components and hooks in this project. All new and modified code must comply with the following conventions.

## 1. Hard-Coded Strings & Magic Numbers → `constants-standards`

Do **not** keep separate rules here for literals. Whenever you would introduce a hard-coded string or magic number — or create/extend a constant for one — **open and follow** `.agents/skills/constants-standards/SKILL.md` in full.

That skill is the single source of truth for:

- Replacing string literals and magic numbers with `@/app/constants`
- Allowed numeric exceptions (`0` / `1` / `-1`, etc.)
- Creating, nesting, naming, typing, and barrel-exporting constants

**Required agent step:** load `constants-standards` before inventing values or constant files. If the two skills ever seem to disagree, `constants-standards` wins for anything related to literals or `app/constants/`.

---

## 2. Use Arrow Functions for Components and Hooks

All React components and custom hooks MUST be defined using `const` arrow function syntax. Never use the `function` keyword declaration style.

This applies to:

- **React components** (including page components, layout components, and UI primitives)
- **Custom hooks** (any function prefixed with `use`)

**Incorrect:**

```tsx
// Function declaration for a component
function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>;
}

// Function declaration for a hook
function useMyHook() {
  const [value, setValue] = useState(null);
  return { value, setValue };
}

// Named function export
export default function MyPage() {
  return <main />;
}
```

**Correct:**

```tsx
const MyComponent = ({
  title,
}: MyComponentProps): JSX.Element => {
  return <div>{title}</div>;
};

export default MyComponent;

const useMyHook = () => {
  const [value, setValue] = useState(null);
  return { value, setValue };
};

export default useMyHook;

const MyPage = (): JSX.Element => {
  return <main />;
};

export default MyPage;
```

### Return Type Annotations

Always annotate the return type of components and hooks explicitly to improve readability and catch type errors early:

- Components should return `JSX.Element` or `ReactNode`.
- Hooks should declare their return type as a named interface or an explicit inline object type.

```tsx
const MyCard = ({ label }: MyCardProps): JSX.Element => { ... };

const useAuth = (): UseAuthReturn => { ... };
```

---

## 3. Use Descriptive Variable Names

All variables, parameters, and destructured bindings MUST use full, descriptive names. Abbreviations and single-letter names are forbidden, except for well-established conventions (e.g., `i` for a simple loop index).

The goal is that any developer reading the code can immediately understand the intent without needing to trace back to the declaration.

### Forbidden Abbreviations

| Avoid          | Use Instead                                          |
| -------------- | ---------------------------------------------------- |
| `err`          | `error`                                              |
| `res`          | `response`                                           |
| `req`          | `request`                                            |
| `cb`           | `callback`                                           |
| `ctx`          | `context`                                            |
| `ref`          | `elementRef` / `inputRef` / `modalRef` (descriptive) |
| `val`          | `value`                                              |
| `idx`          | `index`                                              |
| `btn`          | `button`                                             |
| `img`          | `image`                                              |
| `msg`          | `message`                                            |
| `evt`          | `event`                                              |
| `fn`           | `handler` / `callback` (descriptive)                 |
| `tmp` / `temp` | `temporaryValue` / descriptive name                  |
| `data` (alone) | `reservationData` / `dispatchList` (domain-specific) |

### Examples

**Incorrect:**

```tsx
try {
  await submitForm(payload);
} catch (err) {
  console.error(err);
}

const handleChange = (val: string, cb: () => void) => {
  cb();
};

const data = await fetchReservations();
```

**Correct:**

```tsx
try {
  await submitForm(payload);
} catch (error) {
  console.error(error);
}

const handleChange = (
  newValue: string,
  onChangedCallback: () => void
) => {
  onChangedCallback();
};

const reservationList = await fetchReservations();
```

### Event Handlers

Event handler parameters should be named `event` unless a more specific name adds clarity (e.g., `keyboardEvent`, `mouseEvent`):

```tsx
const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  if (event.key === KEYBOARD.ENTER) handleSubmit();
};

const handleMouseEnter = (mouseEvent: React.MouseEvent<HTMLButtonElement>) => { ... };
```

### Destructured Props

Avoid single-letter or abbreviated prop names in destructuring patterns:

**Incorrect:**

```tsx
const MyComponent = ({ t, fn, cb }: Props) => { ... };
```

**Correct:**

```tsx
const MyComponent = ({ title, onSubmit, onCloseCallback }: Props) => { ... };
```

---

## 4. Summary Checklist

Before committing any component or hook, verify:

- [ ] No hard-coded strings or magic numbers — followed `constants-standards` (load that skill; it wins on literals / `app/constants/`)
- [ ] Defined with `const` + arrow function syntax (`const X = () => { ... }`)
- [ ] Has an explicit return type annotation
- [ ] Exported with `export default` on a separate line (not inline on the `const` declaration)
- [ ] All variables use full, descriptive names — no abbreviations
- [ ] Catch clause parameters use `error`, not `err`
- [ ] Event handler parameters use `event` (or a more specific descriptive name)
- [ ] No lone `data` variables — always prefix with domain context (e.g., `reservationData`)
