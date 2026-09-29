# Login form

## Intent

Let a worker sign in at `/acceso/ingreso` with a username and a password, seeing any failure in red
next to the field that caused it.

## Acceptance criteria (US-ACC-01, verbatim from `docs/proyecto/historias-de-usuario.md`)

- Ingreso por nombre de usuario y contraseña.
- Ojito para ver u ocultar la contraseña.
- Los errores se muestran en mensajes rojos junto al campo que los provoca.
- Autenticación resuelta con Supabase.

## In scope

- Form state, pre-submit validation, Server Action that calls `signInWithUsername` and redirects to `PATHS.HOME`.
- Spanish copy for the screen, and each sign-in error code.
- Mapping one `SignInError` to the message shown under its field.

## Out of scope

- Attempt counting and blocking (ACC-02), first-login password change (ACC-03), logout, forgot password.
- Session proxy (part `ACC-01.01.04`).

## Settled decisions

- Username is 3-40 characters and password 8-64, both taken from `@/app/constants`.
- `invalidCredentials` is shown on the password field, so it never reveals which value was wrong.
- The password rules checklist is shown only where a new password is chosen (US-ACC-03, US-ACC-04, US-ACC-06); the story file is updated in its own chore PR.
- Errors appear after submit and clear as soon as the user edits a field.
- Form state is local (`useState` + `useTransition`); there is no Redux, and no `useApiMutation`.
- Values are kept after any failure.

## Delivery

- `ACC-01.01.02` (this PR): copy constants, error mapping, Server Action, hooks and their unit tests. No rendering.
- `ACC-01.01.03`: the screen (components, styles, page, component tests, E2E).
