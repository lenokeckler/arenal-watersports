---
name: structure-standards
description: The structural rules every reviewer on this team enforces — no comments, types declared once in models/, the Nullable family, one defaults object, no nested ternaries, reuse before writing, enum-like constants for closed sets, base components for text and structure, goTo in page objects, no magic numbers in tests, and answering every review comment; use when writing or reviewing any TS/TSX, including tests and E2E.
---

# Structure standards

Every reviewer on this team enforces these rules. Write the structure this way **before** a PR
leaves draft, so review time goes to behaviour and each rule is not rediscovered one rejected
PR at a time.

Where another skill already owns the detail, this file states the rule and points there; it
never restates it. Comments are out of scope: this repository allows **no comments and no
docstrings** in code at all (`AGENTS.md`).

When a rule leaves room for interpretation, copy the shape of a PR the team already approved and
merged on `develop` — it was reviewed and let through.

## 1. A structural type is declared once, in `models/`, and reused

A shape used in more than one place is a named type in the feature's `models/` folder
(`<Name>.interface.ts` / `<Name>.type.ts`), or in `app/types/` when more than one feature uses it.
Never written by hand at each call site, never declared in the file that executes.

```ts
// ❌ the same event shape in the hook, the ViewModel and two components
onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

// ✅ app/features/reservations/charge-form/models/ChargeFormFieldChangeHandler.type.ts
export type ChargeFormFieldChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
export type ChargeFormFieldChangeHandler = (
  event: ChargeFormFieldChangeEvent
) => void;
```

- The props of a `page.tsx` or a `layout.tsx` are not declared at all: they use the route types
  Next.js generates, `PageProps<"/route">` and `LayoutProps<"/route">` (`route-structure` §3).
- Declare **both** the event and the handler when a test builds a fake event: the test needs the
  event type, the ViewModel needs the handler.
- The union must match what it is passed to. A handler bound to the shared `FormField` accepts
  every element `FormFieldProps.onChange` accepts, or it needs an unsound cast.
- Inline object types in signatures (`}: { … }`, `Pick<…>`, `Omit<…>` written at the call site)
  become a named interface in `models/`.
- A union written in more than one parameter or file — `string | RegExp` across every page object
  method — is one named type, declared once and imported everywhere it appears.
- Related values that travel together — the several sources one service reads, the parts one
  builder combines — are one typed object, not loose variables or a row of parameters.

```ts
// ❌ e2e/pages/*.page.ts, the same union in every method
const getButton = (name: string | RegExp): Locator => …
const getRow = (text: string | RegExp): Locator => …

// ✅ e2e/models/TextMatcher.type.ts
export type TextMatcher = string | RegExp;

const getButton = (name: TextMatcher): Locator => …
const getRow = (text: TextMatcher): Locator => …
```

```ts
// ❌ three sources passed one by one
const buildDailyBoard = (
  reservations: Reservation[],
  dispatches: ReservationDispatch[],
  closures: DayClosure[]
) => …

// ✅ app/features/board/daily-board/models/DailyBoardSources.interface.ts
export interface DailyBoardSources {
  closures: DayClosure[];
  dispatches: ReservationDispatch[];
  reservations: Reservation[];
}

const buildDailyBoard = (sources: DailyBoardSources) => …
```

Folder layout: `component-architecture` §1.

## 2. Use the `Nullable` family, never a hand-written union

`component-standards` §4 forbids `T | null` / `T | undefined`. Pick the **exact** one from
`@/app/types` — they are not interchangeable:

| Type                   | Means                    | Use when                           |
| ---------------------- | ------------------------ | ---------------------------------- |
| `Nullable<T>`          | `T \| null \| undefined` | the value really can be either     |
| `NullableRef<T>`       | `T \| null`              | refs, Supabase `data`, "not found" |
| `NullableUndefined<T>` | `T \| undefined`         | optional lookups, missing params   |

```ts
// ❌
const findSeatLabel = (seatId: string): string | null => …
// ❌ widens the contract: this function never returns undefined
const findSeatLabel = (seatId: string): Nullable<string> => …
// ✅
const findSeatLabel = (seatId: string): NullableRef<string> => …
```

A module-level client or instance that may not exist yet is typed with the family too, and is
narrowed with a guard before use — never `T | null`, never a non-null assertion (`client!`):

```ts
// ❌
let cachedClient: SupabaseClient<Database> | null = null;
await cachedClient!.auth.getSession();

// ✅
let cachedClient: NullableRef<SupabaseClient<Database>> =
  null;

const getClient = (): SupabaseClient<Database> => {
  if (!cachedClient) {
    cachedClient = createBrowserSupabaseClient();
  }
  return cachedClient;
};
```

`app/types/Optional.ts` (`Optional<T>`) duplicates `Nullable<T>` and is not exported from the
barrel: do not use it.

## 3. Default values live in one object, spread before the overrides

Test and E2E helpers that fill a form take their defaults from **one** typed object, and the
overrides are spread over it. Never a `??` per field with a literal glued to the call site.

```ts
// ❌ app/features/access/login-form/tests/LoginForm.page.ts
await user.type(
  getUsernameInput(),
  overrides.username ?? "operaciones1"
);
await user.type(
  getPasswordInput(),
  overrides.password ?? "local-test-password"
);

// ✅ app/features/access/login-form/tests/LoginForm.constants.ts
export const DEFAULT_LOGIN_FORM_INPUT: LoginFormValues = {
  password: "local-test-password",
  username: "operaciones1",
};

// ✅ LoginForm.page.ts
const values = {
  ...DEFAULT_LOGIN_FORM_INPUT,
  ...overrides,
};
await user.type(getUsernameInput(), values.username);
await user.type(getPasswordInput(), values.password);
```

- Unit-test fixtures go in the feature's `tests/*.constants.ts`; E2E fixtures in
  `e2e/constants/`. Never in the feature's production `constants/`.
- The overrides are `Partial<TheRealInterface>`, never an inline `Partial<{ … }>`.
- A field typed only when truthy keeps its `if`, so an empty override still skips it.
- The same applies in production code: a component's defaults are one object, not one `??` per
  prop.

## 4. No nested ternaries

A ternary inside a ternary — in JSX, in a return or in an argument — is rewritten. Pull the
condition into a named `const`, a lookup map, or an early return.

```tsx
// ❌
const label = isLoading
  ? LOADING
  : hasError
    ? ERROR
    : isEmpty
      ? EMPTY
      : READY;

// ✅ a map keyed by an explicit state (see §7)
const label = CHARGE_LIST_STATE_LABEL[chargeListState];
```

```tsx
// ❌ nesting logic inside an expression
<Text>{formatAmount(isRefund ? -amount : amount)}</Text>;

// ✅ a separate, named value
const signedAmount = isRefund ? -amount : amount;
<Text>{formatAmount(signedAmount)}</Text>;
```

## 5. Reuse what already exists before writing your own

Before writing a helper, a literal or a raw element, search the repository for one that does it
(`component-standards` §1 for components, `constants-standards` §1 for literals). The forms that
apply most often:

- **`STRING.Empty`, never `""`**, and the same for any literal that already has a constant.
- **`safeString` / `safeNumber`** (`app/utils/safe-value/SafeValue.ts`) for a value that may be
  missing, instead of `?? ""`, `String(value)`, a template literal or a cast written in each file.
- **Constants that exist are imported, not redeclared** — grep `app/constants` and the feature's
  `constants/` first.

```ts
// ❌
const reservationId = searchParams.id ?? "";

// ✅
const reservationId = safeString(searchParams.id);
```

## 6. Do not add what nothing needs

A prop, a wrapper, a helper, a constant object with one key, or an export that nothing consumes
yet is cut. Only the story's acceptance criteria are scope.

```tsx
// ❌ `variant` and `onHover` have no caller
interface BoatCardProps {
  boat: Boat;
  variant?: BoatCardVariant;
  onHover?: () => void;
}

// ✅
interface BoatCardProps {
  boat: Boat;
}
```

## 7. A closed set of string values is an enum-like constant, and its type derives from it

Whenever a value can only be one of a known few — a state, status, mode, role, method, source,
channel, action, error name, HTTP code — it is **one `as const` object** in `constants/`, and its
type is derived from it (`constants-standards` §7). Never a string-literal union written by hand,
never a bare string compared at the call site. This applies to **props and state** as much as to
logic.

```ts
// ❌ the set lives in the type, the values live as literals everywhere else
type ChargeListState = "loading" | "ready" | "empty";
if (state === "empty") { … }
interface ContactButtonProps { channel: "phone" | "whatsapp"; }

// ✅ app/features/reservations/charge-list/constants/ChargeListState.constants.ts
export const CHARGE_LIST_STATE = {
  EMPTY: "empty",
  LOADING: "loading",
  READY: "ready",
} as const;

export type ChargeListState =
  (typeof CHARGE_LIST_STATE)[keyof typeof CHARGE_LIST_STATE];

if (state === CHARGE_LIST_STATE.EMPTY) { … }
```

Before creating the object, check `app/constants/index.ts`: `STATUS`, `HTTP_STATUS`, `ERRORS`,
`EVENT`, `BROWSER_EVENTS`, `WINDOW_EVENTS`, `ARIA_ROLE`, `PATHS` and `STRING` already exist. A
family that exists gets the new value added to it, not a parallel object (§10).

The strings `typeof` returns are a closed set too. New code compares against one `TYPE_OF` object
in `app/constants/strings/TypeOf.constants.ts`, exported from the barrel, created the first time a
change needs it and extended afterwards:

```ts
// ❌
if (typeof value === "object") { … }

// ✅ app/constants/strings/TypeOf.constants.ts
export const TYPE_OF = {
  FUNCTION: "function",
  NUMBER: "number",
  OBJECT: "object",
  STRING: "string",
  UNDEFINED: "undefined",
} as const;

if (typeof value === TYPE_OF.OBJECT) { … }
```

## 8. Every text and structural element is a base component

A `.tsx` never renders the raw element when the repository has a component for it — in
`page.tsx`, layouts and Server Components too:

| Raw element                | Use                       | Where                                                                             |
| -------------------------- | ------------------------- | --------------------------------------------------------------------------------- |
| `<p>`                      | `Text`                    | `app/components/text/Text.tsx`                                                    |
| inline `<span>` with text  | `InlineText`              | `app/components/text/InlineText.tsx`                                              |
| `<label>`                  | `Label`                   | `app/components/text/Label.tsx`                                                   |
| `<h1>`…`<h6>`              | `Title` or `SectionTitle` | `app/components/title/Title.tsx`, `app/components/section-title/SectionTitle.tsx` |
| `<section>`                | `Section`                 | `app/components/section/Section.tsx`                                              |
| `<ul>` / `<li>`            | `UnorderedList`           | `app/components/list/UnorderedList.tsx`                                           |
| `<button>`, `<img>`, `<a>` | `Button`, `Image`, `Link` | `component-standards` §1                                                          |

```tsx
// ❌
<section>
  <h2>{RESERVATION_COPY.TITLE}</h2>
  <p>{RESERVATION_COPY.EMPTY}</p>
</section>

// ✅
<Section>
  <SectionTitle text={RESERVATION_COPY.TITLE} />
  <Text>{RESERVATION_COPY.EMPTY}</Text>
</Section>
```

**Pick the element for what it is, not to silence a grep.** A `<span>` that is really a layout
box becomes a `<div>`, not an `InlineText`. Plain layout boxes stay `div`.

## 9. A page object's navigation method is `goTo`

Every page object — Playwright in `e2e/pages/*.page.ts` and unit-test POMs in `tests/*.page.ts` —
names the method that opens its screen `goTo`. Never `open`, `visit`, `navigate`, `load` or
`redirectTo`. Routes come from `PATHS`; Playwright's own `page.goto()` stays underneath.

```ts
// ✅ e2e/pages/Login.page.ts
const goTo = async (): Promise<void> => {
  await page.goto(PATHS.ACCESS.LOGIN);
};

// ❌
const openLoginPage = async () =>
  page.goto("/access/login");
```

## 10. Search the repository for an existing type or constant before declaring one

Before a new `type`, `interface` or constant, grep the **whole repository** — `app/types`,
`app/constants`, every `models/` and `constants/` — not only the feature:

```bash
grep -rnE "(type|interface) ChargeState|CHARGE_STATE" app e2e
```

- It exists → import it.
- A family exists (`EVENT`, `HTTP_STATUS`, `ERRORS`, a feature's `*_STATE`) → add the value
  **to that family**, never a parallel constant.
- It exists in another feature and is general → say so in the PR's _Developer Notes_ and propose
  where it should live, instead of copying it a second time.

Inside one constants file, a value already declared above is referenced, not repeated.

## 11. Tailwind classes are style constants

No class string in a `.tsx`. Every rule — location, naming, composition, variant maps, tokens and
the lint selectors — is in `styles-standards`.

## 12. No magic numbers — tests, doubles and E2E included

`constants-standards` owns magic numbers in application code. The same rule reaches **test
doubles, page objects, E2E specs and capture scripts**: a number whose
meaning is not the number itself — a timeout, an index into a result, a count, a retry, a
viewport — gets a named constant.

```ts
// ❌ e2e/specs/login.e2e.ts
await page.waitForTimeout(10000);
const firstRow = rows.nth(0);

// ✅
await page.waitForTimeout(E2E_TIMEOUT_MS.TOAST_VISIBLE);
const firstRow = rows.nth(FIRST_RESULT_INDEX);
```

Not covered: `0`/`1` as plain arithmetic identity (`length === 0`), fixture values typed inside a
test (`phone: "88887777"`), and call counts such as `toHaveBeenCalledTimes(2)`.

## 13. Answer every review comment — and every occurrence

A reviewer marks **examples**, not the full list: _here_, _same here_, _this one too_. Before
asking for another review:

1. Fix each thread.
2. Grep the PR's files for the **same pattern** and fix every other occurrence.
3. Reply in each thread with what changed. A thread with no reply reads as not addressed, even
   when the code changed.
4. Push the fixes as new commits (`pull-request-workflow` §3, §9).

```bash
gh api --paginate repos/lenokeckler/arenal-watersports/pulls/<n>/comments \
  --jq '.[] | select(.in_reply_to_id==null) | "\(.id) \(.path):\(.line // .original_line) — \(.body)"'
```

## 14. No comments — the code explains itself

No comments and no docstrings, in any language the repository holds: TypeScript, JavaScript,
SQL migrations and tests, pgTAP, CSS, workflow YAML. A name that needs a comment is the wrong
name; a rule that needs a paragraph belongs in the PR body, the story, or a skill. Only
directives that are not comments stay: `"use client"`, `"use server"`, a shebang, and a
tool directive the build truly needs.

```ts
// ✅
const isReturnOverdue = (
  dispatch: ReservationDispatch,
  now: Date
) => dispatch.endsAt < now;

// ❌ a comment standing in for a name
// true when the trip should already be back
const check = (d: ReservationDispatch, n: Date) =>
  d.endsAt < n;
```

```sql
-- ❌ the why of a migration goes in its PR, not in the file
-- La gasolina se leia como porcentaje del tanque...
alter table equipment_units add column fuel_max integer not null default 4;
```

An empty block or function is not excused by a comment either: remove it, or give the no-op a
name (`const ignoreClick = () => undefined;`).

JSX comments (`{/* … */}`) and `TODO` lines are comments too. Work deferred on purpose goes in the
PR's _Developer Notes_, naming the story that will carry it, never in the file.

```tsx
// ❌
<Section>
  {/* TODO: refund button arrives with US-RES-28 */}
  <ChargeList charges={charges} />
</Section>

// ✅ Developer Notes: "The refund button is out of scope; US-RES-28 adds it."
```

## 15. Many small files, each with one responsibility

A feature is split into many small files rather than a few medium or large ones. Each file does
one thing, and its name says what: with no comments allowed, file names are the documentation.

- **One responsibility per file.** If describing a file takes two sentences joined by "and", it
  is two files.
- **The view has no hooks.** The server entry `Feature.tsx` reads the first data; the client
  `FeatureView.tsx` renders and calls one `useFeatureViewModel`; logic, state and effects live in
  the view model and the hooks it composes (`component-architecture`).
- **One type per file in `models/`**, named after the type (`ReservationCharge.interface.ts`).
- **Pure functions in `utils/`**, one concern per file, each with its own test.
- **Data access in `services/`**, never inside a component or a view model.
- **Split for a second reason to change, not because it is possible.** What always changes together
  stays in one file: a helper used by a single function stays next to it until a second caller
  appears, and a folder is not cut into files of a few lines each that must always be read
  together.
- **Cohesion is the goal, not the line count.** Split along responsibilities; do not cut a
  cohesive function in half to hit a number. A file that grows past the limits of
  `code-standards` is a sign it holds two responsibilities.

```
✅ reservation-charges/
     ReservationCharges.tsx
     ReservationChargesView.tsx
     hooks/useReservationChargesViewModel.ts
     hooks/useRefundAmountField.ts
     models/ReservationCharge.interface.ts
     models/RefundAmountFieldProps.interface.ts
     utils/computeRefundLimit.ts
     services/fetchReservationCharges.ts
     styles/ReservationCharges.styles.ts
     tests/computeRefundLimit.test.ts

❌ reservation-charges/
     ReservationCharges.tsx          state, effects, fetching, math and markup in one file
     types.ts                        every type of the feature
```

Why: a reviewer reads one small file with one purpose quickly; a change touches one file instead
of rewriting a large one, which keeps stacked PRs from colliding; each test aims at one unit.

## Pre-flight, before a PR leaves draft

Run over the files of the PR, not the whole repository. Every hit is either fixed or named in
_Developer Notes_ with the reason it stays.

```bash
grep -nE "^(export )?(interface|type|enum) " <files> \
  | grep -vE "\.interface\.ts:|\.type\.ts:|\.types\.ts:|\.constants?\.ts:|/models/|app/types/"

grep -nE "React\.(ChangeEvent|FormEvent|MouseEvent|KeyboardEvent)<" <files> | grep -v "/models/"

grep -nE "\| null|\| undefined" <files> | grep -v "app/types/"

grep -nE "[A-Za-z0-9_)\]]!(\.|;|,|\))" <files>

grep -nE "String\(|\?\? *(\"\"|'')" <files> | grep -v "app/utils/safe-value/"

grep -nE "[A-Za-z>\]] *\| *[A-Z][A-Za-z]*" <files> | grep -vE "/models/|app/types/|\| *(null|undefined)"

grep -nE "\?[^?:]*:[^:]*\?[^?.]" <files>

grep -nE "\?\? *[\"'0-9]" <files>

grep -nE "\"[a-zA-Z_-]+\" *\| *\"|=== *\"[a-zA-Z_-]+\"|typeof [^=]+=== *\"" <files> \
  | grep -vE "\.constants\.ts:|/constants/"

grep -nE "\b(status|state|mode|kind|type|method|source|action|variant|channel|role)\??: *\"[a-zA-Z_-]+\"" <files> \
  | grep -vE "\.constants\.ts:|/constants/"

grep -nE "\b[0-9]{2,}\b" <files> \
  | grep -vE "\.constants\.ts:|/constants/|\.styles\.ts:|\.test\.tsx?:|\.sql:"

grep -nE "<(p|span|label|h[1-6]|section|ul|li)([ >]|$)" <.tsx files> \
  | grep -vE "/components/(text|title|section|section-title|list)/"

grep -nE "(open|visit|navigate|redirectTo)[A-Z]?[a-zA-Z]* = async" <*.page.ts files>

grep -nE "^\s*(//|/\*|\*|--|#)|\{/\*|TODO" <files> | grep -vE "\.md:|#!|\"use (client|server)\""
```

## Checklist

- [ ] Every shared shape is a named type in `models/` or `app/types/`, found by searching first
- [ ] `Nullable` / `NullableRef` / `NullableUndefined`, the exact one; no `| null`, `| undefined`
- [ ] Defaults in one object, spread before overrides; fixtures outside production `constants/`
- [ ] No nested ternaries
- [ ] Existing components, helpers and constants reused; nothing added that nothing needs
- [ ] Closed string sets are `as const` objects with derived types — props and state included
- [ ] Text and structure through `Text`, `InlineText`, `Label`, `Title`, `Section`, `UnorderedList`
- [ ] Page objects navigate with `goTo`
- [ ] No class string in a `.tsx` (`styles-standards`)
- [ ] No magic numbers, tests and E2E included
- [ ] Every review thread fixed everywhere and answered
- [ ] No comments or docstrings, SQL and tests included
- [ ] One responsibility per file; view without hooks; one type per file in `models/`
