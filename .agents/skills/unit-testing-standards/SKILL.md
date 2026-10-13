---
name: unit-testing-standards
description: Standards for unit testing features with Vitest, React Testing Library, and the Page Object Model (POM). Use when writing, updating, or reviewing unit/component tests.
---

# Unit Testing Standards (Page Object Model)

This skill is the **single source of truth** for unit and component tests in Arenal Water Sports.

Always use the **Page Object Model (POM)** for UI/component interaction tests. Tests must not scatter raw `screen.getBy*` / `fireEvent` calls throughout the suite — queries and user actions live in a Page Object; specs assert behavior through that API.

Unit tests run with Vitest: `npm run test:run` once, never `npm test` (watch mode). Use the stack below and keep this skill as the contract.

## 1. Tooling

| Layer            | Package                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| Runner           | Vitest                                                                                                   |
| Component render | `@testing-library/react`                                                                                 |
| Interactions     | `@testing-library/user-event`                                                                            |
| DOM matchers     | `@testing-library/jest-dom`                                                                              |
| Next.js          | `vitest` + React Testing Library (jsdom). Prefer Testing Library queries over enzyme-style shallow APIs. |

Scripts in `package.json`:

```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

Follow `code-style-standards` (arrow functions, descriptive names) and `constants-standards` (no hard-coded role/label strings when constants exist).

## 2. Feature-colocated test layout

Tests live **inside the feature folder** (same architecture as `component-architecture`):

```
app/features/<module>/<feature-name>/
  FeatureName.tsx
  hooks/
    useFeatureNameViewModel.ts
  tests/
    FeatureName.page.ts           ← Page Object (POM)
    FeatureName.test.tsx          ← component / integration-style unit tests
    useFeatureNameViewModel.test.ts  ← optional pure ViewModel unit tests (no POM required)
  specs/
    SPEC.md                       ← acceptance criteria to map into tests
```

| File           | Role                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| `*.page.ts`    | Page Object — locators + user actions + small query helpers                   |
| `*.test.tsx`   | Component tests — arrange/act/assert via the Page Object                      |
| `use*.test.ts` | ViewModel/unit tests — call the hook (e.g. `renderHook`) directly; no DOM POM |

Do **not** create a global `tests/page-objects/` dumping ground for feature-specific UI. Shared test helpers (providers, renderWithStore) may live under `app/test-utils/` once introduced.

## 3. Page Object Model rules

### Responsibilities

A Page Object:

- Encapsulates **how** to find elements (roles, labels, test ids only when unavoidable)
- Encapsulates **user actions** (`fillEmail`, `submit`, `openConfirmModal`)
- Exposes **readable queries** for assertions (`getErrorMessage()`, `isSubmitDisabled()`)
- Does **not** contain test assertions (`expect`) — specs own assertions
- Does **not** contain business/product logic — only UI interaction API

### Naming & shape

- File: `FeatureName.page.ts` (match the component)
- Factory: `createFeatureNamePage` (arrow function — matches project style)
- Prefer **accessible queries**: `getByRole`, `getByLabelText`, `getByText` over `data-testid`
- Use `@/app/constants` for names/labels/roles when the UI uses those constants

### Incorrect — queries inline in every test

```tsx
it("submits the form", async () => {
  const user = userEvent.setup();
  render(<ReservationForm {...props} />);
  await user.type(
    screen.getByLabelText("Email"),
    "a@b.com"
  );
  await user.click(
    screen.getByRole("button", { name: "Save" })
  );
  expect(screen.getByText("Saved")).toBeInTheDocument();
});
```

### Correct — Page Object + thin spec

```ts
// tests/ReservationForm.page.ts
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";

export const createReservationFormPage = () => {
  const user = userEvent.setup();

  const getEmailInput = () =>
    screen.getByLabelText(/email/i);

  const getSaveButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, { name: /save/i });

  const getSuccessMessage = () =>
    screen.getByText(/saved/i);

  const fillEmail = async (email: string) => {
    await user.type(getEmailInput(), email);
  };

  const submit = async () => {
    await user.click(getSaveButton());
  };

  return {
    fillEmail,
    submit,
    getEmailInput,
    getSaveButton,
    getSuccessMessage,
  };
};
```

```tsx
// tests/ReservationForm.test.tsx
import { render } from "@testing-library/react";
import ReservationForm from "../ReservationForm";
import { createReservationFormPage } from "./ReservationForm.page";

describe("ReservationForm", () => {
  it("submits the form and shows success", async () => {
    render(<ReservationForm {...props} />);
    const reservationFormPage = createReservationFormPage();

    await reservationFormPage.fillEmail("a@b.com");
    await reservationFormPage.submit();

    expect(
      reservationFormPage.getSuccessMessage()
    ).toBeInTheDocument();
  });
});
```

One Page Object per **screen/feature UI** under test. Child widgets can have their own `*.page.ts` if reused across multiple parent tests; otherwise keep actions on the parent Page Object.

## 4. What to unit test

| Target               | How                                          | POM?    |
| -------------------- | -------------------------------------------- | ------- |
| Feature UI (`.tsx`)  | Render + interact via Page Object            | **Yes** |
| ViewModel hooks      | `renderHook` / direct calls; mock APIs/store | No      |
| Pure utils / mappers | Direct function tests                        | No      |
| Redux slice reducers | Feed actions → assert state                  | No      |

Prefer testing behavior tied to `specs/SPEC.md` acceptance criteria. Do not snapshot huge DOM trees as a substitute for behavior tests.

### Component test guidelines

- Wrap with the same providers the feature needs (Redux `Provider`, auth mocks, etc.) via a shared `renderWithProviders` helper when available
- Mock network/Supabase/mutations at the boundary — do not hit real backends in unit tests
- Assert on **outcomes** (visible text, disabled state, callback invoked), not implementation details (internal state, unrelated CSS class strings)
- Keep tests deterministic: no real timers/network; use Vitest fake timers when testing debounce/timeouts (values from constants)

## 5. Arrange · Act · Assert

Every test follows AAA:

1. **Arrange** — render feature (and build Page Object)
2. **Act** — call Page Object actions
3. **Assert** — `expect` on Page Object queries or mocked dependencies

Avoid multiple unrelated acts in one test. Name tests by behavior: `"disables save while submitting"`, not `"click button"`.

## 6. SDD + testing

When `component-architecture` SDD applies:

1. Map each acceptance criterion in `specs/SPEC.md` to at least one test name
2. Implement/adjust Page Object as the UI stabilizes
3. Validate by running the feature’s tests before considering the work done

## 7. Checklist

- [ ] Tests colocated under `app/features/<module>/<feature>/tests/`
- [ ] UI tests go through a `*.page.ts` Page Object (no duplicated raw queries in specs)
- [ ] Page Object has no `expect` calls; specs own assertions
- [ ] Queries prefer roles/labels; constants used when the app uses them
- [ ] ViewModel/pure logic tested without forcing POM
- [ ] External I/O mocked; no real Supabase/network in unit tests
- [ ] Acceptance criteria from `specs/SPEC.md` covered where applicable
- [ ] Arrow-function factories and descriptive names per `code-style-standards`
