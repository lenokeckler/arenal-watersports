# US-RES-01 — Calendar views

## Acceptance criteria

- La vista se escoge según lo que se esté haciendo.
- Operaciones ve solamente el día y la semana, porque en la playa no hace falta más.

## First checkpoint

Pure calendar rules provide day, Monday-first week, month and year periods. Civil dates use one-based months and UTC arithmetic, independent of the host timezone. Month grids complete surrounding weeks with adjacent dates. Year periods contain twelve month grids. Period boundaries exclude those adjacent grid dates.

Navigation advances one period. Month and year navigation normalize to the first day; year navigation also normalizes to January. Today is derived exclusively from the supplied server instant in Costa Rica, addressing RNF-050 and RNF-051 at the date boundary.

The allowed-view policy accepts a work area already verified by its caller, using the generated database enum. Reservations allows all four views, Operations allows day and week, and other areas receive no views. This policy does not authenticate or authorize a request.

## Presentation checkpoint

The interactive view selects daily, weekly, monthly and annual periods and navigates backward, forward or to the supplied server date. Week layouts stack on mobile; month grids start on Monday; annual layouts show twelve month grids. Today has an accessible date marker. View selection persists locally under RNF-052; invalid or restricted preferences fall back to day without overwriting storage. Storage failures retain the selection and show a Spanish error.

The view accepts an externally verified allowed-view policy and a server-supplied Costa Rica date. A dependent development preview will demonstrate static policy examples without authenticated data. Real active-mode authorization remains dependent on US-ACC-11/US-TAB-07; automatic refresh across midnight remains pending authenticated integration.

## Pending integration

View selection and rendering implement the presentation portion of the first criterion. Restricted policies control the available selectors. Production completion of both criteria still requires the authenticated active work area from US-ACC-11/US-TAB-07. This checkpoint includes Redux state and device-local persistence, with no production route, authentication flow or reservation data.
