# Worker areas

## Intent

Let administration enable a whole extra area on an account, so a person who handles reservations
some days and dispatches on the beach other days keeps one account. Areas are whole, never loose
permissions.

## In scope

- Route `PATHS.ADMINISTRATION.WORKER_AREAS` (`/administration/workers/areas?username=…`), only
  for administration (anyone else goes to the home).
- Lookup by username (a GET form), the worker's name, username and the two grantable areas
  (Reservas, Operaciones) with their state: base, enabled or not enabled.
- `WorkerAreaChangeForm`: one form per area that posts to `submitWorkerAreaChange`; on success the
  action redirects back with `notice` and `area`, on refusal the form shows the reason.

## Out of scope

- The mode selector a worker with more than one area sees on entering (US-ACC-11).
- Marks (US-ADM-03 to US-ADM-05) and the worker list (US-ADM-11).

## Requirements

- Only reservas and operaciones are grantable. Administración is never granted: it would make
  the account an administrator, and the system has a single administration account.
- The base area is shown as "Área base" with no button; it cannot be removed.
- External guide accounts get no extra areas.
- Removing an area cuts access at once: every check reads `worker_areas` through `has_area`.
- Every rule is enforced by the database functions `grant_worker_area` and `revoke_worker_area`;
  the screen only offers what they allow.
