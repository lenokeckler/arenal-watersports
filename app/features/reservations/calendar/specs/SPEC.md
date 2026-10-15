# US-RES-01 — Calendar views

## Intent

Reservations workers choose the calendar detail level that matches their task.

## In scope

- The official Reservations feature adapter supplies day, week, month and year views to the shared calendar component.
- The shared calendar renders civil-date periods, navigation and view selection without knowing a work area or event source.
- The selected view preference is saved locally according to RNF-052.
- The mobile-first presentation follows the Stitch calendar references.
- A pure work-area policy remains available to future feature adapters.

## Out of scope

- Preview routes or simulated work-area policies.
- Authentication, authorization and active work-area selection from US-ACC-11 and US-TAB-07.
- An Operations feature adapter or production route.
- Reservation events and their model, owned by US-RES-02.
- Booking actions, search and operational controls outside this story.

## Requirements

- Selecting a view changes the visible period and persists the preference locally.
- Day and week views follow civil calendar rules and Costa Rica time (RNF-050 and RNF-051).
- Reservations receives day, week, month and year choices from its feature adapter.
- The shared view renders only the choices passed by its caller and does not treat those choices as an authorization boundary.
- The work-area policy maps verified work-area values to allowed choices without authentication, persistence or data access.
- The shared calendar accepts neutral date-period data only; US-RES-02 will define any reservation content contract from its actual data and rendering needs.

## Edge cases & errors

- An invalid or unavailable stored preference falls back to day without replacing the saved value until the worker selects an available view.
- If browser storage fails, calendar interaction remains available and the error is reported in Spanish.
- Invalid civil dates and periods outside supported limits are rejected.
- An empty allowed-view list does not render the calendar.

## Constraints

- Shared calendar rendering, state orchestration, date utilities, preference service, models and styles live under `app/components/calendar/`.
- The Reservations adapter and this specification live under `app/features/reservations/calendar/`.
- The pure work-area mapping and shared work-area type live outside either feature.
- Shared UI never imports a feature. Feature adapters consume shared UI and utilities.
- The official calendar has no preview route, fake reservation data or content outside US-RES-01.
- Skills: component-architecture, component-standards, route-structure, redux-store-architecture, constants-standards, styles-standards, structure-standards.

## Acceptance criteria

- [x] La vista se escoge según lo que se esté haciendo.
- [ ] Operaciones ve solamente el día y la semana, porque en la playa no hace falta más. The pure view policy is available; the Operations feature integration depends on US-OPE-07 and verified active-work-area enforcement from US-ACC-11 and US-TAB-07.

# US-RES-02 — Calendar reservation information

## Intent

Reservations workers answer customers using visible reservation times, committed equipment and the full customer name without opening individual reservations.

## In scope

- Extend the existing Reservations calendar from US-RES-01 with persisted reservation information.
- Project scheduled reservation times, customer name, lifecycle status and equipment commitments from generated database types.
- Preserve actual departure groups separately from the scheduled reservation interval.
- Show reservation information in day and week blocks, with a readable period agenda for month and year views.
- Read server-paginated calendar windows and refresh after reservation, item or departure-group changes.

## Out of scope

- Reservation creation, editing, payments and detail navigation.
- Authentication, account areas and active-work-mode enforcement owned by US-ACC-11 and US-TAB-07.
- Preview routes, simulated authorization or production fixture reservations.
- Offline dispatch writes and Operations calendar integration.

## Requirements

- Every reservation block exposes its full customer name, time and committed equipment as required by the story description.
- Category commitments retain their quantity and category name without assigning a fictitious interchangeable unit.
- Concrete unit commitments expose the actual unit code and category name.
- Monetary extras are not equipment commitments; incomplete equipment relations fail explicitly instead of silently hiding commitments.
- Scheduled times remain available as the booked reference. Actual group departure, expected return and closure times remain distinct, including closed groups.
- An absent expected return remains absent; no scheduled timestamp replaces missing actual group data.
- Dates and displayed times use Costa Rica civil dates independently of the browser and server timezone (RNF-050 and RNF-051).
- Calendar reads use server pagination (RNF-027), deterministic ordering and a total count; a capped page never represents the entire period.
- Database windows are half-open intervals. Actual departure-group overlap is considered independently of parent scheduled times.
- Closed and cancelled reservations are excluded from active calendar reads.
- Reservation, equipment-item and departure-group changes invalidate displayed information (RNF-025); a failed refresh exposes a stale state and retry.
- Existing day, week, month and year selection and local preference persistence remain available (RNF-052).
- A reservation without equipment remains visible with an explicit missing-equipment state.

## Contracts and boundaries

- Source contracts under `models/` derive persisted fields from generated Supabase Row types and use the `NullableRef` family for nullable relations.
- Calendar entries contain scheduled timestamps, customer name, status, committed equipment summaries and actual departure groups.
- Shared calendar components accept neutral content slots and never import Reservations models or services.
- Projection utilities belong to this feature; shared reservation queries expose transport projections without importing the feature.
- Query builders may be reviewed before protected reads exist. No endpoint or Server Action exposes reservations without the verified active-mode contract.
- Each stacked PR targets its real dependency branch, beginning with US-RES-01.04 (PR #17), and remains below the project change-size limit.

## Dependency and verification status

- This first PR defines generated-schema projection contracts, validated equipment and departure-group mapping, scheduled interval validation and explicit Costa Rica timestamp formatting. Database reads and visible blocks remain pending.
- US-ACC-11 and US-TAB-07 must provide verified Reservations access and active-mode enforcement before adding the protected route, working navigation or live reads.
- The calendar is the principal Reservations working view; the common board remains the entry screen for all workers.
- Actual route integration, authenticated E2E checks and mobile/desktop screenshots wait for that security dependency. Captures must use the real authorized route and local persisted reservations.
- UI presentation follows the existing Stitch references and the shared design tokens.
- The block-description checkpoint prepares full customer and equipment labels, a separately labelled scheduled interval and actual category-group departure/expected-return/closure descriptions. All labels retain full Costa Rica dates and times, including multi-day reservations and unknown returns.
- The static block renders the descriptor through shared text and list primitives, with its complete Spanish accessible name and no interactive controls. Component tests use a Page Object and preserve repeated departure-group descriptions. Calendar placement, protected integration and real application screenshots remain pending.
- The coverage checkpoint validates supplied half-open civil ranges, safe reported totals and unique parent ids. Pure day classification uses booked intervals or actual departure groups in Costa Rica; actual closure is exclusive, open groups ignore expected return, and same-time departure/closure remains a recorded point within the day.
- This checkpoint provides no grouped content, outlets or calendar placement. The snapshot is a supplied presentation contract, with no query sibling, protected read, route or realtime dependency introduced.
- The grouping checkpoint creates one reusable reservation block per occupied Costa Rica civil day from the intersection of selected period and snapshot coverage, preserving scheduled and actual dispatch intervals separately.
- Snapshot completeness distinguishes omitted snapshots, partial time coverage and incomplete result pages; only complete coverage with complete results and no groups proves the selected period empty.
- Day, week, month and year content grouping remains a pure preparation contract. Principal-view placement and the binding acceptance criterion remain pending protected calendar integration.
- The supplied snapshot adapter places reservation blocks in day and week date containers and renders one grouped agenda beneath month and year grids. Snapshot absence, incomplete time coverage, incomplete result pages and complete empty periods have separate Spanish messages.
- The adapter performs no database read, permission check or navigation. Protected route integration, authenticated E2E coverage and real application screenshots remain pending US-ACC-11 and US-TAB-07.

## Acceptance criteria

- [ ] Es la vista principal de quien trabaja en reservas.
