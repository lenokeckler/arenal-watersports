# System screen

## Intent

Give every signed-in screen one full-height column to render into, so a bar placed above the
content never adds a second screen height and the content fills the remaining space.

## In scope

- A server component that renders its children inside one column that is at least as tall as the
  viewport.
- The route layout `app/(system)/layout.tsx` that mounts it around every screen of `(system)`.

## Out of scope

- The session bar and the sign-out control (US-ACC-08, later rungs).
- Access decisions: the proxy and Row Level Security decide who gets in, never this layout.
- The pre-login screens under `app/access/`, which keep `AccessScreen`.

## Requirements

- The frame is a plain column (`flex min-h-dvh flex-col`) with no landmark of its own; each screen
  keeps its own `<main>`.
- A child that must fill the frame uses `flex-1`: home does, and the profile layout does through
  its `<main>` and the embedded `AccessScreenShell`.
- The URL of every screen is unchanged: `(system)` is a route group.

## Acceptance

- Home and the profile screens look the same as before and do not scroll when the content fits.
- Covered by `tests/SystemScreen.test.tsx` and, in the browser, by `e2e/specs/home.e2e.ts`,
  `e2e/specs/session-proxy.e2e.ts` and the profile specs.
