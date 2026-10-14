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
