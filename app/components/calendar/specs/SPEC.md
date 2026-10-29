# US-RES-01 — Calendar views

## Acceptance criteria

- La vista se escoge según lo que se esté haciendo.
- Operaciones ve solamente el día y la semana, porque en la playa no hace falta más.

## First checkpoint

Pure calendar rules provide day, Monday-first week, month and year periods. Civil dates use one-based months and UTC arithmetic, independent of the host timezone. Month grids complete surrounding weeks with adjacent dates. Year periods contain twelve month grids. Period boundaries exclude those adjacent grid dates.

Navigation advances one period. Month and year navigation normalize to the first day; year navigation also normalizes to January. Today is derived exclusively from the supplied server instant in Costa Rica, addressing RNF-050 and RNF-051 at the date boundary.

The allowed-view policy accepts a work area already verified by its caller, using the generated database enum. Reservations allows all four views, Operations allows day and week, and other areas receive no views. This policy does not authenticate or authorize a request.

## Pending integration

Both acceptance criteria remain open until the calendar interface selects and renders the views and the authenticated active work area enforces the policy. Active-area integration depends on US-TAB-07. Device-local view preferences under RNF-052 remain pending. This checkpoint adds no route, authentication flow, shared state or persistence.
