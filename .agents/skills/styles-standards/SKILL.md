---
name: styles-standards
description: Where Tailwind class strings live and how they are named — every className comes from a `styles/*.styles.ts` constant or resolver, never a literal in a component; use when writing or changing any `.tsx` that renders markup, or when creating a styles file.
---

# Styles standards

## Rule

No Tailwind class string is written inside a component, hook, page or layout. Every `className` is
a constant (or the result of a resolver) imported from a `*.styles.ts` file. This includes
conditional classes, template literals, `clsx`/`cn` calls and one-off utilities like `sr-only`.

```tsx
// ❌ incorrect
<tr className="border-t border-zinc-200 hover:bg-zinc-50">

// ✅ correct
import { RESERVATION_LIST_ROW_CLASS } from "./styles/ReservationList.styles";

<tr className={RESERVATION_LIST_ROW_CLASS}>
```

`eslint.config.mjs` enforces the JSX side through four global `no-restricted-syntax` selectors: a
`className` may not carry a string literal (bare or inside `{}`), a template literal or a ternary
(`eslint-standards` §8). Lint does not see a class string parked in a local `const` of the
component — that is still a violation of this skill.

## Where

| Scope                                                       | Path                                                           |
| ----------------------------------------------------------- | -------------------------------------------------------------- |
| Feature component                                           | `app/features/<module>/<feature>/styles/<Component>.styles.ts` |
| Shared base component                                       | `app/components/<base>/styles/<Base>.styles.ts`                |
| Route files (`page.tsx`, `layout.tsx`) and app-level chrome | `app/styles/<Screen>.styles.ts`                                |
| Cross-feature primitives (card, bottom sheet, field error)  | `app/styles/<Primitive>.styles.ts`                             |

One `.styles.ts` per component, or per small group that always renders together (a form and its
fields). `constants/` never holds class strings — it holds copy, ids, routes, limits and enums
(`constants-standards`). A class string in a `*.constants.ts`, a `utils/` helper or a ViewModel is
moved to the matching `styles/` file.

## Naming

`<CONTEXT>_<ELEMENT>[_<STATE>]_CLASS`, SCREAMING_SNAKE, **one `export const` per class** — never
one object with keys:

```ts
// ✅ app/features/reservations/reservation-list/styles/ReservationList.styles.ts
export const RESERVATION_LIST_WRAPPER_CLASS =
  "flex flex-col gap-2 px-4 py-3 md:px-8";

export const RESERVATION_LIST_ROW_CLASS =
  "flex min-h-11 items-center justify-between border-t border-zinc-200";
```

```ts
// ❌ one bag of keys, lowercase names, lives in constants/
export const reservationListStyles = {
  wrapper: "flex flex-col gap-2 px-4 py-3",
  row: "flex min-h-11 items-center",
};
```

## Composition

Compose from a base with a template literal **inside the styles file**; never repeat a token
sequence in two constants:

```ts
export const CHARGE_FORM_BUTTON_CLASS =
  "inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-3";

export const CHARGE_FORM_SUBMIT_BUTTON_CLASS = `${CHARGE_FORM_BUTTON_CLASS} w-full md:w-auto`;
```

A base component that accepts a `className` prop joins it in a pure resolver that lives in its
styles file, and the `.tsx` calls the resolver:

```ts
// app/components/text/styles/Text.styles.ts
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const TEXT_BASE_CLASS = "text-base";
export const TEXT_BOLD_CLASS = "font-bold";

export const resolveTextClassName = (
  isBold: boolean,
  className: string
): string =>
  joinClassNames(
    TEXT_BASE_CLASS,
    isBold && TEXT_BOLD_CLASS,
    className
  );
```

`joinClassNames` drops empty and `false` parts and joins the rest with a space; use it instead of
`clsx`/`cn` or a hand-rolled `.filter(Boolean).join(" ")`.

```tsx
// ✅ Text.tsx
<p className={resolveTextClassName(bold, className)}>{children}</p>

// ❌ Text.tsx
<p className={`text-base ${bold ? "font-bold" : ""} ${className}`}>{children}</p>
```

## Variants by state

A typed `Record<Enum, string>` keyed by the domain enum, not a `switch` or a ternary in JSX:

```ts
export const RESERVATION_STATE_BADGE_CLASS: Record<
  ReservationState,
  string
> = {
  [RESERVATION_STATE.CONFIRMED]: `${BADGE_BASE_CLASS} bg-green-100 text-green-800`,
  [RESERVATION_STATE.PENDING]: `${BADGE_BASE_CLASS} bg-amber-100 text-amber-800`,
  [RESERVATION_STATE.CANCELLED]: `${BADGE_BASE_CLASS} bg-zinc-100 text-zinc-600`,
};
```

```tsx
// ✅
<InlineText className={RESERVATION_STATE_BADGE_CLASS[reservation.state]}>

// ❌
<InlineText className={reservation.state === "confirmed" ? "bg-green-100" : "bg-zinc-100"}>
```

Any other conditional class is resolved by a pure resolver in the styles file or by the ViewModel,
and reaches the component as one resolved `className`; the component never branches on style.

## Tokens

Only the design tokens declared in the `@theme` block of `app/globals.css` — the Material 3 color
roles (`bg-surface`, `text-on-surface`, `bg-primary`, `text-on-primary`, `border-outline`, …) and
Tailwind's own scale. A color the design needs beyond that set is added to `@theme` first, then
used by name, never `bg-[#0D7DFF]`. No arbitrary colors (`#…`, `[rgb(…)]`) in new code; arbitrary
sizes (`h-[58px]`) only when matching a base component that already uses them.

**Never interpolate a value into a class name.** Tailwind generates classes by scanning source
text, so `` `bg-[${COLOR.LAKE}]` `` or `` `rounded-${radius}` `` never produces CSS. Write every
class out in full inside the styles file and pick among them with a map.

## Mobile first

Arenal is used on a phone on the dock. The unprefixed classes are the phone layout; `sm:`/`md:`/
`lg:` add the larger screens. Anything tappable is at least 44 px high (`min-h-11`).

```ts
// ✅
export const TEAM_BOARD_GRID_CLASS =
  "grid grid-cols-1 gap-3 md:grid-cols-3";

// ❌ desktop first, phone patched afterwards
export const TEAM_BOARD_GRID_CLASS =
  "grid grid-cols-3 gap-3 max-md:grid-cols-1";
```

## Guard before reporting a change

```bash
grep -rnE 'className=("|\{`|\{"|\{clsx|\{cn\()' <touched .tsx files>
```

Must print nothing, and `npm run lint` must be clean. Every hit is a literal to move into a
`.styles.ts`.

## Related

- `constants-standards` — copy, ids, routes and limits (not classes).
- `component-standards` — which base component to reuse before styling markup by hand.
- `eslint-standards` — the `no-restricted-syntax` selectors that enforce this skill.
