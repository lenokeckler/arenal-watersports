# React + TypeScript

## TypeScript

- Strict mode assumed on. If the project has it off, say so before writing code.
- Never `any`. Never a non-null assertion (`!`) to silence the compiler. Never
  `as` to force an incompatible shape — narrow with a type guard instead.
- Explicit interfaces for every component's props. No implicit props, no
  inline structural types repeated across files.
- Discriminated unions for variant props, so illegal combinations do not
  typecheck:

```ts
type ButtonProps =
  | { variant: "link"; href: string; onClick?: never }
  | {
      variant: "action";
      onClick: () => void;
      href?: never;
    };
```

- `unknown` at boundaries (API responses, `JSON.parse`), then validate and
  narrow. Do not type an unvalidated payload as its expected shape.
- Derive types rather than duplicating them: `ReturnType`, `Parameters`,
  `keyof`, `satisfies`.
- No `// @ts-ignore`. If a suppression is genuinely required, use
  `@ts-expect-error` with a comment explaining it — it fails when it stops
  being needed.

## Components

Each component:

- has one responsibility, and a name that states it;
- takes typed props, no prop drilling more than two levels — lift to context or
  compose instead;
- has no business logic inside JSX — compute above the return;
- extracts reusable stateful logic into a custom hook;
- is under the file-size limit from `code-standards`. A component that needs
  200 lines is two components.

Composition over configuration: prefer `children` and slot props over a growing
list of booleans (`isCompact`, `isInline`, `hasBorder`, `showIcon`).

## Hooks

- Rules of hooks: top level only, never conditional.
- Complete dependency arrays. Never suppress the lint rule — fix the dependency
  instead (move the value inside, memoize it, or use a ref).
- `useEffect` is for synchronizing with something outside React. Deriving state
  from props does not need an effect — compute it during render.
- `useMemo` / `useCallback` / `memo` only when there is a measured render cost
  or a referential-identity requirement. They are not free.
- Cleanup in every effect that subscribes, times out, or opens anything.

## Styling

- Design tokens only. Never a hardcoded hex, px spacing, font size, radius, or
  shadow at the call site — those come from the theme/config.
- Do not bypass the styling config with arbitrary values when a token exists.
- Custom CSS only where the system genuinely lacks a primitive; when a pattern
  repeats, it becomes a component, not a copied class string.
- Conditional classes via a helper (`clsx`/`cn`), never string concatenation
  with template literals scattered through JSX.

## Theming (light/dark)

- Class or attribute driven at the root, with system-preference detection and
  persisted user choice.
- Colors resolve through tokens so a component never branches on theme itself.
- Every component must be verified in both themes — a token defined only in one
  theme is a defect.

## Internationalization

If the project has i18n:

- No literal UI text in components. Every string is a namespaced key
  (`nav.contact`, `pricing.cta.primary`).
- All configured locales get the key in the same commit — a missing translation
  is an incomplete change.
- Interpolation through the i18n API, never string concatenation; that breaks
  languages with different word order.
- Dates, numbers, and currency go through the locale formatter.

## Accessibility

Non-optional:

- Semantic elements first — `button`, `nav`, `main`, `ul`. ARIA only when no
  semantic element fits.
- Every interactive element is keyboard reachable and operable, with a visible
  focus state.
- Correct heading hierarchy, no skipped levels.
- Labels on every form control; `alt` on every meaningful image, empty `alt` on
  decorative ones.
- Contrast meets WCAG AA.
- Animation respects `prefers-reduced-motion`.

## Motion

- Animate `transform` and `opacity`; avoid animating layout properties.
- Durations and easing come from shared presets, not per-component literals.
- Reuse variant definitions rather than redefining motion locally.
- Motion carries meaning — entrance, state change, spatial relationship. Motion
  as decoration gets cut.

## Performance

- Check for avoidable re-renders before reaching for `memo`: unstable object or
  function props created inline are the usual cause.
- Stable `key` from the data, never the array index for reorderable lists.
- Code-split at route level; lazy-load heavy, below-the-fold components.
- Images: correct format, explicit dimensions to prevent layout shift, lazy
  loading below the fold.
- Watch bundle impact before adding a dependency.

## Structure

Follow the project's existing layout. When starting one, a conventional split:

```
components/ui        primitives
components/layout    structural
components/sections  page composition
hooks/  lib/  types/  constants/  i18n/
```

Never invent a parallel structure alongside one that already exists.
