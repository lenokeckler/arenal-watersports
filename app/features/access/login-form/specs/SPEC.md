# Login form

## Intent

Let a worker sign in at `/access/login` with a username and a password, seeing any failure in red
next to the field that caused it.

## In scope

- Form state, pre-submit validation, and the Server Action that calls `signInWithUsername` and
  redirects to `PATHS.HOME`.
- Spanish copy for each sign-in error code.
- Mapping one `SignInError` to the message shown under its field.

## Out of scope

- Attempt counting and blocking (ACC-02), first-login password change (ACC-03), logout, forgot
  password.
- The password rules checklist: it is shown only where a new password is chosen (US-ACC-03,
  US-ACC-04, US-ACC-06), moved there by #8.
- Session proxy (part `ACC-01.01.04`).

## Requirements

- Username 3–40 characters and password at most 64, both read from `@/app/constants`.
- Errors appear after the first submit and are revalidated on every edit after that.
- Values are kept after any failure.

## Edge cases & errors

- `invalidCredentials` is shown on the password field, so it never reveals which value was wrong.
- A second submit while one is pending is ignored.
- A server result or a network failure that arrives after the worker edited a field is dropped.
- A network failure of the action shows the network error on the form; a redirect is not turned
  into an error.

## Constraints

- Form state is local (`useState` + `useTransition`); there is no Redux and no `useApiMutation`.
- The validation comes from `app/utils/sign-in/`, so client code never imports `app/services`.
- Skills that apply: `component-architecture`, `constants-standards`, `structure-standards`,
  `unit-testing-standards`.

## Acceptance criteria

US-ACC-01, as written in `docs/proyecto/historias-de-usuario.md` after #8:

- [ ] Ingreso por nombre de usuario y contraseña. — the logic is here; the form is
      `ACC-01.01.03`.
- [ ] Ojito para ver u ocultar la contraseña. — `ACC-01.01.03`.
- [ ] Los errores se muestran en mensajes rojos junto al campo que los provoca. — each error is
      mapped to its field here; the red message is `ACC-01.01.03`.
- [x] Autenticación resuelta con Supabase. — `submitSignIn` calls `signInWithUsername`.
