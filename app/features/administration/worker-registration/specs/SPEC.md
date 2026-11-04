# Worker registration

## Intent

Let administration add a worker with a name, a username and a base role, so the worker signs in
seeing only what that role covers. The system creates a one-time temporary password that the
worker changes on the first sign-in, so administration never knows the password the worker keeps.

## In scope

- Route `PATHS.ADMINISTRATION.WORKERS_NEW` (`/administration/workers/new`) inside the `(system)`
  frame, with its own `administration` layout.
- `WorkerRegistration` (server): sends anyone who is not administration to the home.
- `WorkerRegistrationView` (client): the heading and a form that starts empty again after "Registrar
  otro trabajador".
- `WorkerRegistrationForm`, `WorkerRegistrationFields`, `WorkerRegisteredResult`.
- `submitWorkerRegistration`: checks the fields, calls `registerWorkerAsSignedIn` and answers with
  field errors or the registered worker with the temporary password.

## Out of scope

- The list of workers and any navigation entry to this screen (US-ADM-11 and US-TAB-04).
- Areas, marks, blocking and reactivation (US-ADM-02 to US-ADM-09).
- The first password change itself (US-ACC-03).

## Requirements

- Name: required, single spaces, at most 80 characters.
- Username: 3 to 40 characters, lowercase letters without accents, digits, `.`, `_`, `-`;
  unique; refused on the field when taken.
- Base role: reservas or operaciones. The system has a single administration account, so
  administración is not offered and the server refuses it.
- The temporary password is shown once, in the action's answer only: never in the URL, a cookie,
  local storage or a log. Fields use `autocomplete="off"` so the browser never offers the
  administrator's own credentials.
- Refusals: a field error on its field and focus on the first invalid text field; a refusal of the
  whole form (not administration, unexpected failure) in the error banner.
