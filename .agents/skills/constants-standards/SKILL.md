---
name: constants-standards
description: Single source of truth for replacing hard-coded strings and magic numbers with @/app/constants, and for creating, naming, and organizing those constant files; defers Tailwind class strings to styles-standards.
---

# Constants Standards and Rules

This skill is the **single source of truth** for:

1. Replacing hard-coded string literals and magic numbers in application code with `@/app/constants`
2. Creating, naming, structuring, typing, and exporting constant files under `app/constants/`

Tailwind class strings are **not** constants: they never go in `app/constants/` or a feature's `constants/` folder. They live in `styles/*.styles.ts` files — follow `styles-standards`.

`code-style-standards` requires this skill whenever literals or magic numbers appear. Do not invent parallel constant rules elsewhere.

---

## 1. Replace Hard-Coded Literals With Constants

Never use raw string or unexplained numeric literals in components, hooks, stories, or business logic when a constant exists — or should exist — under `@/app/constants`.

### Strings

Never use raw literal strings (e.g., `"centered"`, `"ArrowRight"`, `"region"`, `""`). Import from `@/app/constants`.

Common catalogs:

- **Storybook layouts**: `STORYBOOK_LAYOUT.CENTERED`, `STORYBOOK_LAYOUT.FULLSCREEN`, …
- **Keyboard keys**: `KEYBOARD.ARROW_RIGHT`, `KEYBOARD.ENTER`, …
- **ARIA roles / labels**: `ARIA_ROLE.REGION`, `ARIA_ROLE.BUTTON`, …
- **Generic strings / fallbacks**: `STRING.Empty` instead of `""` (utilities like `safeString` are fine for fallbacks)

**Incorrect:**

```tsx
const Component = ({ className = "" }) => (
  <div
    role="region"
    onKeyDown={(event) => {
      if (event.key === "ArrowRight") handleNext();
    }}
  >
    ...
  </div>
);
```

**Correct:**

```tsx
import {
  ARIA_ROLE,
  KEYBOARD,
  STRING,
} from "@/app/constants";

const Component = ({ className = STRING.Empty }) => (
  <div
    role={ARIA_ROLE.REGION}
    onKeyDown={(event) => {
      if (event.key === KEYBOARD.ARROW_RIGHT) handleNext();
    }}
  >
    ...
  </div>
);
```

### Magic numbers

Never embed unexplained numeric literals (e.g., `300`, `60000`, `23`). Prefer named constants from `@/app/constants`. Structure new numeric groups per **§8**.

**Allowed exceptions** (do not invent constants for these):

- Identity / empty math that is universally clear: `0`, `1`, `-1` as indexes, increments, or “none” sentinels
- Trivial loop bounds tied directly to array length
- Tailwind scale values inside a class string (`px-4`, `min-h-11`) — class strings themselves are not constants; they live in `styles/*.styles.ts` per `styles-standards`

**Incorrect:**

```tsx
const refreshDelayMs = 60000;
const avatarSize = 32;
const endOfDayHour = 23;
const debounceMs = 300; // local ad-hoc constant for shared domain value
```

**Correct:**

```tsx
import { IMAGE_SIZES, TIME } from "@/app/constants";

const refreshDelayMs = TIME.UNITS.MINUTES_TO_MS;
const avatarSize = IMAGE_SIZES.ICON.MEDIUM;
const endOfDayHour = TIME.BOUNDARY.LAST_HOUR;
```

### If a constant is missing

1. Find an existing domain object under `app/constants/` and extend it (alphabetical keys, semantic nesting).
2. If none fits, create a new file following §§2–8 below.
3. Re-export from `app/constants/index.ts`.
4. Never leave shared domain values as file-local `const x = 300` / `const role = "region"` in a component.

---

## 2. Use `as const` on Every Constant Object

All constant objects must be declared with `as const` to enable literal type inference and prevent accidental mutation.

**Incorrect:**

```ts
export const BROWSER_EVENTS = {
  CLICK: "click",
};
```

**Correct:**

```ts
export const BROWSER_EVENTS = {
  CLICK: "click",
} as const;
```

---

## 3. Sort Keys Alphabetically Within Each Object

All keys inside a constant object must be sorted in ascending alphabetical order (A → Z). This makes the object scannable, prevents duplicate entries, and creates a consistent diff history.

**Incorrect:**

```ts
export const BROWSER_EVENTS = {
  POPSTATE: "popstate",
  BEFORE_UNLOAD: "beforeunload",
  CLICK: "click",
  MOUSEDOWN: "mousedown",
} as const;
```

**Correct:**

```ts
export const BROWSER_EVENTS = {
  BEFORE_UNLOAD: "beforeunload",
  CLICK: "click",
  MOUSEDOWN: "mousedown",
  POPSTATE: "popstate",
} as const;
```

---

## 4. Group Semantically — One Responsibility Per Constant Object

Do not create one massive flat object to cover all cases. Split constants into focused, named groups that represent a single semantic domain. This improves readability and allows consumers to import only what they need.

**Incorrect:**

```ts
export const EVENT = {
  CLICK: "click",
  RESIZE: "resize",
  IFRAME_LOAD: "load",
} as const;
```

**Correct:**

```ts
export const BROWSER_EVENTS = {
  CLICK: "click",
  SCROLL: "scroll",
} as const;

export const WINDOW_EVENTS = {
  RESIZE: "resize",
} as const;

export const RECAPTCHA_EVENTS = {
  IFRAME_LOAD: "load",
  RESIZE: "resize",
} as const;
```

---

## 5. Key Names Must Match Their Values (SCREAMING_SNAKE_CASE)

Constant keys must always be in `SCREAMING_SNAKE_CASE` and must semantically match their string value. Do not use abbreviations unless the value itself is abbreviated.

**Incorrect:**

```ts
export const BROWSER_EVENTS = {
  BU: "beforeunload", // abbreviation
  ph: "pagehide", // lowercase
} as const;
```

**Correct:**

```ts
export const BROWSER_EVENTS = {
  BEFORE_UNLOAD: "beforeunload",
  PAGE_HIDDEN: "pagehide",
} as const;
```

For **numeric** keys, names describe meaning (and unit when needed), never the digit — see §8.

---

## 6. Export from the Global Barrel (`app/constants/index.ts`)

Every constant defined in `app/constants/` must be re-exported from the global barrel file. When a constant file exports multiple named values from the same module, combine them into a single `export { }` block using inline `type` modifiers for types.

**Incorrect:**

```ts
// Two separate statements for the same source file
export { BROWSER_EVENTS } from "./events/Event.constants";
export type { BrowserEventType } from "./events/Event.constants";
```

**Correct:**

```ts
export {
  BROWSER_EVENTS,
  type BrowserEventType,
} from "./events/Event.constants";
```

---

## 7. Derive Types From the Constant Object

Never manually write a union type for a constant's values. Always derive it with `typeof` + `keyof` so the type automatically stays in sync with the object.

**Incorrect:**

```ts
export type BrowserEventType =
  "click" | "scroll" | "mousedown";
```

**Correct:**

```ts
export const BROWSER_EVENTS = {
  CLICK: "click",
  SCROLL: "scroll",
  MOUSEDOWN: "mousedown",
} as const;

export type BrowserEventType =
  (typeof BROWSER_EVENTS)[keyof typeof BROWSER_EVENTS];
```

---

## 8. Magic Number Constants — File & Object Structure

When centralizing numeric literals (timeouts, sizes, limits, status codes, indexes, etc.), follow this layout so related values stay discoverable and do not collapse into one flat mega-object.

### Placement

| Kind of numbers                                | Where to put them                                                                                                           |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| General / cross-cutting numerics               | `app/constants/numbers/<Domain>.constants.ts`                                                                               |
| Time durations in ms                           | `app/constants/milliseconds/` **or** a nested group under a time domain object                                              |
| Domain-owned sizes / tokens                    | Domain folder that already owns the concept (e.g. `app/constants/images/ImageSizes.constants.ts`, `app/constants/z-index/`) |
| Feature-only values reused in one feature area | Prefer the matching domain folder under `app/constants/`; avoid scattering one-off files                                    |

Do **not** create a single `NUMBERS` / `MAGIC` object for the whole app. Prefer one exported object (or a few) per semantic domain.

### File naming

- Prefer `PascalCase` + `.constants.ts` for new files: `HttpStatus.constants.ts`, `ImageSizes.constants.ts`.
- Export a single primary `SCREAMING_SNAKE_CASE` object that matches the domain: `HTTP_STATUS`, `IMAGE_SIZES`, `BREAKPOINT`.

### Nested grouping (required when a domain has multiple related numbers)

Use **nested objects** for subdomains. Keep each nesting level focused. Sort keys alphabetically at every level. Always end with `as const`.

```ts
// app/constants/numbers/Timeout.constants.ts
export const TIMEOUT_MS = {
  DEBOUNCE: {
    SEARCH: 300,
    SELECT: 150,
  },
  POLLING: {
    SHORT: 5_000,
    STANDARD: 30_000,
  },
  TOAST: {
    ERROR: 8_000,
    SUCCESS: 4_000,
  },
} as const;
```

```ts
// Domain-owned example (sizes live with images)
// app/constants/images/ImageSizes.constants.ts
export const IMAGE_SIZES = {
  ICON: {
    EXTRA_LARGE: 48,
    EXTRA_SMALL: 16,
    LARGE: 40,
    MEDIUM: 32,
    MICRO: 14,
    SMALL: 24,
    XXL: 64,
  },
  PHOTO: {
    EXTRA_LARGE: 1000,
    EXTRA_SMALL: 80,
    LARGE: 600,
    MEDIUM: 300,
    SMALL: 150,
  },
} as const;
```

```ts
// Cross-cutting time units / boundaries
export const TIME = {
  BOUNDARY: {
    LAST_HOUR: 23,
    LAST_MILLISECOND: 999,
    LAST_MINUTE: 59,
    LAST_SECOND: 59,
  },
  UNITS: {
    HOURS_IN_DAY: 24,
    MILLISECONDS_IN_SECOND: 1000,
    MINUTES_IN_HOUR: 60,
    MINUTES_TO_MS: 60_000,
    SECONDS_IN_MINUTE: 60,
  },
} as const;
```

### Key naming for numeric values

- Keys describe **meaning**, never the digit (`DEBOUNCE.SEARCH`, not `THREE_HUNDRED`).
- Include the unit in the **object or key** when ambiguity is possible: `TIMEOUT_MS`, `MINUTES_TO_MS`, `MAX_FILE_SIZE_BYTES`.
- Flat objects are fine only when the domain is small and single-purpose:

```ts
// app/constants/numbers/Breakpoint.constants.ts
export const BREAKPOINT = {
  TABLET: 1025,
} as const;
```

### Extending an existing group

When adding related magic numbers:

1. Find the existing domain object (`TIME`, `IMAGE_SIZES`, `HTTP_STATUS`, `MILISECONDS`, etc.).
2. Add the key under the correct nested group (create a new nested group if the subdomain is new).
3. Keep alphabetical order inside that group.
4. Re-export from `app/constants/index.ts` only if the export is new.

**Incorrect:**

```ts
export const NUMBERS = {
  AVATAR: 32,
  DEBOUNCE: 300,
  NOT_FOUND: 404,
  Z_MODAL: 5500,
} as const;
```

**Correct:**

```ts
import {
  HTTP_STATUS,
  IMAGE_SIZES,
  TIMEOUT_MS,
} from "@/app/constants";

const avatarSize = IMAGE_SIZES.ICON.MEDIUM;
const debounceMs = TIMEOUT_MS.DEBOUNCE.SEARCH;
const notFoundStatus = HTTP_STATUS.NOT_FOUND;
```

### Types

Derive types from the object when consumers need a union of allowed values (same rule as §7). Nested objects can expose leaf unions via indexed access as needed.

```ts
export type ImageIconSize =
  (typeof IMAGE_SIZES.ICON)[keyof typeof IMAGE_SIZES.ICON];
```
