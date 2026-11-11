# Password recovery forms

## Intent

Let a worker who forgot the password ask for a single-use PIN at `/access/recovery`, enter that
PIN at `/access/recovery/reset`, then choose the new password on its own screen at
`/access/recovery/password`, seeing any failure next to the field that caused it.

## In scope

- The request form: a username field, a submit button with a pending state, a banner for errors
  that belong to the whole form, and a static sentence for accounts without a registered email.
- The PIN form (`PasswordRecoveryReset*`): username (prefilled from `?username=`, editable) and
  the PIN shown as six boxes, plus a separate "¿No le llegó el PIN?" box with what to do (spam,
  username, administration, the no-email sentence) and a link to ask for another PIN.
- The new password form (`PasswordRecoveryNewPassword*`): new password with the rules checklist
  visible from the first paint, confirmation, and a link to ask for another PIN. The page opens only
  with a live reset pass (`requireOpenPasswordRecoveryGrant`); otherwise it sends the worker to
  `/access/recovery`.
- Form state, pre-submit validation and the Server Actions of both forms. The request action
  reads the network key, calls `requestPasswordRecovery` with `after` as the deferred task runner
  and redirects to `PATHS.ACCESS.RECOVERY_RESET` with the normalized username; the PIN action calls
  `verifyPasswordResetPin`, keeps the single-use reset pass in a server-only cookie and redirects
  to `PATHS.ACCESS.RECOVERY_PASSWORD`; the new password action saves the password with
  `resetPasswordWithGrant`, forgets the pass and redirects to the login with a success notice.
- Spanish copy for each error code, addressed as usted.
- Moving the focus to the field that caused an error after a submit.
- Working before the page hydrates or with JavaScript off, through a native `POST`: the PIN is a
  plain text input until the page is interactive, and only then becomes the six boxes, with the
  real input laid transparent over them so taps and paste still reach it.

## Out of scope

- The services, the database rules and the mails: `app/services/password-recovery`,
  `app/utils/password-recovery`, `supabase/migrations`.
- The login entry link and its success notice and the end-to-end specs.
- Temporary passwords issued by administration (US-ADM-07).

## Requirements

- Username 3 to 40 characters, read from `@/app/constants`. The same validation
  (`validatePasswordRecoveryRequest`) runs in the client guard and inside the service.
- Errors appear after the first blocked submit and are revalidated on every edit after that.
- The username is kept after any failure.
- One outcome for every account: unknown, retired, blocked, without email, rate limited or mail
  failure all redirect to the reset screen, so nothing on the request screen depends on the
  account. The only non-uniform answers are format errors and an infrastructure failure, which
  are the same for every input.
- If the network key cannot be read (missing secret), the action fails closed with `unknown` and
  never calls the service.
- The username travels in the query string URL-encoded through `appendQueryParam`; it is not a
  secret and the field stays editable.
- A second submit while one is pending is ignored.

## Focus after a submit

- Each blocked submit moves the focus to the first field with an error, in the order of
  `PASSWORD_RECOVERY_REQUEST_FOCUS_ORDER`.
- Only a submit moves the focus. Typing, and the revalidation that follows each edit, never do.
- A form-wide error (network, unknown) is announced in the banner and leaves the focus where it
  is.

## Edge cases & errors

- The `unknown` error says "No se pudo enviar el PIN. Intente de nuevo."; the sign-in unknown
  text is never used on these screens.
- On the reset form the `unknown` error says "No se pudo cambiar la contraseña. Intente de nuevo.",
  `pinInvalid` is the single PIN error for a wrong, expired, used or exhausted PIN or an unknown
  account ("El PIN no es correcto o ya venció. Pida uno nuevo si hace falta.") and
  `passwordNotSaved` says "No se pudo guardar la contraseña. Pida un PIN nuevo e intente otra
  vez." in the banner.
- New password and confirmation strings are shared with the password-change forms through
  `ACCESS_SHARED_COPY`, never duplicated.
- Username strings are shared with the login through `ACCESS_SHARED_COPY`, never duplicated.
- `redirect` runs outside any `try` so Next's redirect signal is never swallowed.
- A server error disappears on the first edit or the next submit.

## Constraints

- Form state is local (`useState` plus `useActionState` for the native post); there is no Redux.
- Client code imports validation from `app/utils/password-recovery/` and never `app/services`;
  only the actions reach the services.
- Skills that apply: `component-architecture`, `constants-standards`, `structure-standards`,
  `unit-testing-standards`.

## Acceptance criteria

US-ACC-06, as written in `docs/proyecto/historias-de-usuario.md`:

- [ ] El sistema envía un PIN al correo personal registrado en la cuenta. — request form logic
      (`submitPasswordRecoveryRequest`); the recovery screens arrive in a later part.
- [ ] Se escribe el PIN en pantalla, después la contraseña nueva, y se repite. — reset form,
      delivered by the reset form logic and the recovery screens, later parts.
- [ ] Las reglas de la contraseña se muestran desde antes de escribirla, no después de fallar. —
      delivered by the recovery screens, a later part.
- [ ] El PIN es de un solo uso y vence a los pocos minutos. — enforced by the database rules and
      the services; surfaced by the reset form logic, a later part.
- [ ] Si la cuenta no tiene correo registrado, administración genera una contraseña temporal. —
      static sentence `NO_EMAIL_NOTE` on both screens, delivered by the recovery screens, a later part.
- [ ] No hay inicio de sesión con Google ni con ningún otro proveedor: el ingreso es siempre por
      usuario y contraseña. — no provider is offered by either form.
