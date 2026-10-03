---
name: route-structure
description: Where a screen's route lives — app/(system)/<area>/<resource> for every signed-in screen, pre-login screens under app/access/, English URL segments, route folders holding only page.tsx and layout.tsx, access checked by proxy.ts, server functions and Row Level Security (never by a layout), the page as a thin shell over a feature, and PATHS as the only source of URLs. Use before creating or moving any page.tsx, layout.tsx or route handler.
---

# Route structure

Every screen of the app is reached through a route under `app/`. Where that route lives is not a
matter of taste: it follows the area of work that owns the story, so any teammate finds a screen
by knowing who uses it.

## 1. Two route roots: `app/access/` and `app/(system)/`

`app/` has exactly two folders that create URLs, and every screen goes inside one of them — never
beside them:

| Route root      | Holds                                                   |
| --------------- | ------------------------------------------------------- |
| `app/access/`   | Screens reached before signing in: there is no area yet |
| `app/(system)/` | Every screen reached after signing in                   |

`(system)` is a Next.js route group: the parentheses keep the folder out of the URL. Inside it,
screens every worker uses sit at the top, and each work area has its own folder:

```
app/
├── access/
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx                    /access/login
│   └── recovery/
│       └── page.tsx                    /access/recovery
│
└── (system)/
    ├── layout.tsx                      shared shell, bottom bar
    ├── board/
    │   └── page.tsx                    /board
    ├── profile/
    │   └── page.tsx                    /profile
    ├── administration/
    │   ├── layout.tsx                  the area's navigation
    │   └── workers/
    │       ├── page.tsx                /administration/workers
    │       └── new/
    │           └── page.tsx            /administration/workers/new
    ├── reservations/
    │   ├── layout.tsx                  the area's navigation
    │   └── charges/
    │       └── page.tsx                /reservations/charges
    └── operations/
        ├── layout.tsx                  the area's navigation
        └── dispatch/
            └── page.tsx                /operations/dispatch
```

| Story module (Jira label, `docs/proyecto/historias-de-usuario.md`) | Route folder                             | Feature folder (`component-architecture`) |
| ------------------------------------------------------------------ | ---------------------------------------- | ----------------------------------------- |
| `ACC` Acceso y Sesión, before login                                | `app/access/<resource>`                  | `app/features/access/<feature>`           |
| `ACC` after login                                                  | `app/(system)/<resource>` (every worker) | `app/features/access/<feature>`           |
| `TAB` Tablero y Navegación                                         | `app/(system)/<resource>` (every worker) | `app/features/board/<feature>`            |
| `ADM` Administración                                               | `app/(system)/administration/<resource>` | `app/features/administration/<feature>`   |
| `RES` Reservas                                                     | `app/(system)/reservations/<resource>`   | `app/features/reservations/<feature>`     |
| `OPE` Operaciones                                                  | `app/(system)/operations/<resource>`     | `app/features/operations/<feature>`       |

The owner is read from the story, never guessed: its module and its _"Como…"_ line. A screen a
worker opens from an email link before logging in (set a password, recover it) has no area yet,
so it lives under `app/access/`, not inside `(system)`.

```
✅ app/(system)/reservations/charges/page.tsx     /reservations/charges
✅ app/access/login/page.tsx                      /access/login
❌ app/charges/page.tsx                           a third route root: app/ fills with screens
❌ app/(system)/reservas/cobros/page.tsx          Spanish segments: every segment is English (AGENTS.md)
❌ app/(system)/reservations/(charges)/page.tsx   a group for one screen adds nothing
```

Every segment is English, kebab-case. A second folder for the same area in another language
(`reservations/` and `reservas/`) is never created; if one appears, it is moved in its own PR.

### Route folders hold only `page.tsx` and `layout.tsx`

A route folder holds `page.tsx`, `layout.tsx`, and the Next.js route files when a screen needs
them (`loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`), plus the `models/` those files
type themselves with. Components, hooks, styles, constants, specs and tests live in the screen's
feature folder (§3), so the route tree reads as an index of screens.

```
❌ app/(system)/reservations/charges/ChargeSummary.tsx       belongs to the feature
❌ app/(system)/reservations/charges/_components/            belongs to the feature
❌ app/(system)/reservations/charges/hooks/useCharges.ts     belongs to the feature
```

## 2. The folder organises; access is checked in three layers

A route group changes no behaviour and blocks nobody: a screen under `(system)/reservations/` opens for
anyone who types its URL unless something checks. A `layout.tsx` is **not** that check: Next.js
does not run a layout again when the user moves between pages that share it, and a page, a Server
Action or a route handler can be reached without passing through the layout at all. Access is
checked in three layers, each with one job:

| Layer        | Where                                                                                                | Job                                                                                                                                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Redirect     | `proxy.ts` at the project root                                                                       | Sends a visitor with no session to `PATHS.ACCESS.LOGIN`, and one without the area of the URL to the board. It only reads the session; it never queries tables. Convenience, not security.                      |
| Server check | every read and write in `app/services/`, with the server client of `app/services/supabase/server.ts` | Gets the signed-in worker and refuses the operation when the active mode or area does not allow it, before touching data. Server Actions and route handlers call these functions, never the database directly. |
| Database     | Row Level Security in `supabase/migrations/`                                                         | The real guard. A request that skips the first two layers still reads and writes nothing it should not.                                                                                                        |

- Never decide access in a `layout.tsx` or in a client component. A layout may show the area's
  navigation, but hiding a button or a menu protects nothing.
- Never use the service-role client (`serviceRole.ts`) for a request made on behalf of a worker:
  it bypasses Row Level Security.
- The area is decided by the active work mode when there is one, not by every area on the account
  (US-TAB-07).

A new area is not finished until the proxy rule and the Row Level Security policies for its tables
exist, with a test for the allowed and the refused account: a unit test for the proxy rule and a
pgTAP test for the policies.

## 3. The page is a shell

`page.tsx` does three things and nothing else: exports its `metadata`, reads its route params or
search params, and renders one feature view.

```tsx
// ✅ app/(system)/reservations/charges/[reservationId]/page.tsx
export const metadata: Metadata =
  RESERVATION_CHARGES_METADATA;

const ReservationChargesPage = async ({
  params,
}: ReservationChargesPageProps) => {
  const { reservationId } = await params;
  return (
    <ReservationCharges reservationId={reservationId} />
  );
};

export default ReservationChargesPage;
```

```tsx
// ❌ fetching, state and markup piled into the route file
const Page = () => {
  const [items, setItems] = useState([]);
  useEffect(() => { … }, []);
  return <div className="…">{items.map(…)}</div>;
};
```

The screen itself lives in `app/features/<module>/<feature>/` (`component-architecture`): a server entry
component that reads the first data through `services/`, a client view with no hooks of its own
that calls one `use*ViewModel` for the interactive part, and its `models/`, `constants/`,
`styles/`, `utils/` and `tests/`.

## 4. URLs come from `PATHS`, never from a string

Every route has one entry in `app/constants/strings/Paths.constants.ts`, grouped by area in the
same shape as the folders:

```ts
export const PATHS = {
  HOME: "/",
  ACCESS: { LOGIN: "/access/login" },
  RESERVATIONS: { CHARGES: "/reservations/charges" },
} as const;
```

Links, redirects, email links, tests and Playwright page objects all read `PATHS`. Moving a route
is then a folder move plus one constant. A URL typed as a literal anywhere else is a defect,
tests included.

## 5. Before creating or moving a route

Decide with data, not memory: run the checks and read their output.

```bash
git grep -n -A 12 "^#### US-RES-28" -- docs/proyecto/historias-de-usuario.md
git ls-tree -d --name-only -r HEAD app/ | grep -E "^app/(access|\(system\))"
git grep -nE "\"/[a-z]" -- app e2e ':!app/constants/strings/Paths.constants.ts'
```

The first says who owns the screen, the second shows the folders that already exist so the new
one joins them, the third finds URL literals that should be `PATHS`.

## Checklist

- [ ] The route folder matches the story's module and "Como…" line (§1)
- [ ] English kebab-case segments, one folder per area
- [ ] Pre-login screens under `app/access/`, everything else inside `(system)`; no third route root
- [ ] The route folder holds only `page.tsx`, `layout.tsx` and Next.js route files; the screen lives in `app/features/` (§1, §3)
- [ ] Access checked by `proxy.ts`, by the server functions in `app/services/` and by Row Level Security — never by a layout; allowed and refused accounts tested (§2)
- [ ] `page.tsx` only exports metadata, reads params and renders one view
- [ ] The URL is a `PATHS` entry; no literal URL in code or tests
