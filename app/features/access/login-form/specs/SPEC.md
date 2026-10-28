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
- A distinct message in the banner for an account blocked by failed attempts, an account blocked
  by administration, and a session closed by inactivity.

## Out of scope

- The database side of the lockout (`ACC-01.02.01`), first-login password change (ACC-03),
  logout and the redirect that carries `?reason=inactive` (ACC-10), forgot password.
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

## Account and session messages

- A wrong password and an unknown username show the same `invalidCredentials` text under the
  password, so the message never reveals which usernames exist.
- `accountBlockedByAttempts` and `accountBlockedByAdministration` appear in the banner only after a
  correct password: the access-token hook refuses the token, and `mapSignInAuthError` accepts that
  rejection only with status 403, code `unknown` and a message that is exactly one token of
  `SIGN_IN_HOOK_REJECTION`. A retired worker (`account_unavailable`) shows `invalidCredentials`.
  The upstream message is never forwarded.
- `/access/login?reason=inactive` shows `sessionInactive` in the banner. The page passes the
  raw param to `LoginForm`, which resolves it with `resolveSignInNotice` against
  `SIGN_IN_NOTICE_REASON`; arrays, empty values, other case and any other text show nothing, and URL text is never rendered.
- The notice disappears at the first submit, and a server, validation or posted-form error always
  wins over it.
- The server records a failed attempt only when Supabase answers `invalid_credentials`, with the
  same call for any username, and the end of the streak on a success. A recorder failure returns
  `unknown`, and when the success recorder fails the session just opened is closed.

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

US-ACC-02:

- [x] Usuario no registrado. — shows `invalidCredentials`, the same text as a wrong password;
      `signInWithUsername.recording.test.ts`. The end to end check arrives with ACC-01.02.05.
- [x] Contraseña incorrecta. — `invalidCredentials` under the password; `e2e/specs/login.e2e.ts`.
- [x] Cuenta bloqueada por intentos fallidos. — `accountBlockedByAttempts` in the banner;
      `mapSignInAuthError.test.ts`. The end to end check arrives with ACC-01.02.05.
- [x] Cuenta bloqueada por administración. — `accountBlockedByAdministration` in the banner;
      `mapSignInAuthError.test.ts`. The end to end check arrives with ACC-01.02.05.
- [x] Sesión cerrada por inactividad. — `sessionInactive` from `?reason=inactive`;
      `LoginForm.test.tsx` and `LoginFormView.notice.test.tsx`.
- [x] El mensaje nunca revela cuáles nombres de usuario existen en el sistema. — one text for an
      unknown user and a wrong password; the blocked messages need the correct password.
