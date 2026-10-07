# Login form

## Intent

Let a worker sign in at `/access/login` with a username and a password, seeing any failure in red
next to the field that caused it.

## In scope

- The screen: username and password fields with a show/hide toggle on the password, a submit
  button with a pending state, and a banner for errors that belong to the whole form.
- Form state, pre-submit validation, and the Server Action that calls `signInWithUsername` and
  redirects to `PATHS.HOME`.
- Spanish copy for each sign-in error code.
- Mapping one `SignInError` to the message shown under its field.
- Signing in before the page hydrates or with JavaScript off, through a native `POST`.
- Moving the focus to the field that caused an error after a submit.

## Out of scope

- Attempt counting and blocking (ACC-02), first-login password change (ACC-03), logout, forgot
  password.
- The password rules checklist: it is shown only where a new password is chosen (US-ACC-03,
  US-ACC-04, US-ACC-06), moved there by #8.
- The session proxy (`ACC-01.01.05`).

## Requirements

- Username 3–40 characters and password at most 64, both read from `@/app/constants`.
- Errors appear after the first submit and are revalidated on every edit after that.
- Values are kept after any failure.
- Credentials never travel in a URL. The form posts to the `submitSignInForm` Server Action
  through `useActionState`, so before hydration or with JavaScript off the browser sends a `POST`
  and the server validates, signs in and redirects, or renders the error under its field.
- Once hydrated, the submit handler prevents the native post and calls `submitSignIn` itself, so a
  submit reaches the server exactly once.

## Focus after a submit

- Each submit moves the focus to the first field with an error, in the order of
  `LOGIN_FOCUS_ORDER`: username, then password. `invalidCredentials` is a password error, so it
  focuses the password.
- Only a submit moves the focus. Typing, and the revalidation that follows each edit, never do.
- A second submit that returns the same error focuses that field again.
- A result dropped as stale (the worker edited a field while it was pending) does not move the
  focus.
- A form-wide error (network, unknown) is announced in the banner and leaves the focus where it
  is.
- Covered by `tests/LoginFormView.focus.test.tsx` and, in the browser, by the empty-submit and
  wrong-password cases of `e2e/specs/login.e2e.ts`.

## Edge cases & errors

- `invalidCredentials` is shown on the password field, so it never reveals which value was wrong.
- A second submit while one is pending is ignored.
- A server result or a network failure that arrives after the worker edited a field is dropped.
- A network failure of the action shows the network error on the form; a redirect is not turned
  into an error.
- An error rendered from a native post disappears on the first edit or the next submit.
- After a native post fails, the fields come back empty: the password is never sent back to the
  browser.

## Constraints

- Form state is local (`useState` + `useTransition`, plus `useActionState` for the native post);
  there is no Redux and no `useApiMutation`.
- The validation comes from `app/utils/sign-in/`, so client code never imports `app/services`.
- Skills that apply: `component-architecture`, `constants-standards`, `structure-standards`,
  `unit-testing-standards`.

## Acceptance criteria

US-ACC-01, as written in `docs/proyecto/historias-de-usuario.md` after #8:

- [x] Ingreso por nombre de usuario y contraseña. — `LoginFormView`, `submitSignIn` and
      `submitSignInForm`.
- [x] Ojito para ver u ocultar la contraseña. — the password `FormField` toggle.
- [x] Los errores se muestran en mensajes rojos junto al campo que los provoca. — each error is
      mapped to its field and rendered under it in red, linked with `aria-describedby`.
- [x] Autenticación resuelta con Supabase. — `submitSignIn` calls `signInWithUsername`.
