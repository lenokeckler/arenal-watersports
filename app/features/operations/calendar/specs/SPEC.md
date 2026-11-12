# US-OPE-07 — Operations calendar snapshot adapter

## Intent

Operations workers consult today and the coming week through the existing calendar presentation without month or year views.

## Source acceptance criterion

- No hacen falta las vistas de mes ni de año.

## In scope

- A snapshot-driven feature entry supplies Costa Rica today to a client calendar adapter.
- The existing work-area presentation policy supplies exactly day and week choices.
- Existing Redux calendar state, civil-date navigation and local preference persistence are reused.
- Shared reservation projection renders injected blocks and daily coverage messages.
- The calendar keeps the existing Stitch geometry, tokens, typography and controls.

## Out of scope

- Routes, navigation links, authentication and verified active-work-mode authorization.
- Database reads, query pagination integration, realtime subscriptions and offline writes.
- Month/year agendas, reservation editing, money fields and additional Operations controls.
- Simulated authorization, fixture-backed application routes and successful-empty defaults for absent data.

## Requirements

- Day is the initial view when no allowed local preference exists.
- Saved day/week selections restore. Saved month/year selections fall back visibly to day without overwriting storage until the worker chooses an allowed view.
- A disallowed current Redux selection never exposes month/year content or controls.
- Previous, next and today navigation retain the selected allowed horizon and use existing Costa Rica date utilities.
- Callers supply the snapshot explicitly; undefined means unavailable information.
- Missing snapshots, incomplete civil coverage, incomplete result pages and proven complete empty days receive existing Spanish messages.
- In week view each day reports its own coverage; partial snapshots retain loaded blocks.
- Shared projection excludes cancelled and closed reservations and renders no money information.
- The allowed-view policy restricts presentation only; it does not verify account permissions or an active work mode.

## Contracts and boundaries

- `OperationsCalendar` composes the view with Costa Rica today.
- `OperationsCalendarView` binds the existing CalendarView to one Operations ViewModel.
- `useOperationsCalendarViewModel` reuses the shared work-area policy and opts into shared daily coverage messages.
- Snapshot facts and projected reservation types remain shared under `app/components/reservation-calendar/`.
- No imports from the Reservations feature, new Redux slice or competing calendar helpers are introduced.

## Verification and remaining integration

- Component tests cover restricted choices, preference fallback/restoration, navigation, injected blocks, daily/weekly coverage, excluded statuses and absent monetary information.
- Reservations regression suites retain the default-disabled daily message behavior.
- RNF-018/021/026/038/039/040/041/050/051/052 remain supported through existing projection, shared calendar and Spanish copy.
- RNF-010/011 authorization, RNF-025 live refresh and RNF-027 paginated live reads require protected integration; this snapshot adapter does not complete those requirements.
- Authenticated Operations E2E and real route screenshots remain pending US-ACC-11, US-TAB-07, verified read contracts and a legitimate local Operations account.
- [ ] Production US-OPE-07 acceptance criterion: pending protected route and real data integration. The supplied adapter enforces day/week presentation only.
