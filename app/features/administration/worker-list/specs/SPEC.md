# Worker list screen

## Intent

Let administration inspect worker account access and current status.

## In scope

- Display each required worker field in a responsive list.
- Identify external temporary guides and show whether they are current or disabled.
- Show an explicit empty state for a valid empty result.
- Redirect denied access before presenting any worker rows.
- Preserve role, status, and zero-based page URL parameters for pagination.

## Out of scope

- Filter controls, which belong to ADM-11 part03.
- Creating, editing, blocking, or deleting worker accounts.
- Database and access-policy changes.

## Requirements

- Use the worker-list service and search normalizer from ADM-11 part01.
- Keep the route thin and the feature view presentational.
- Keep all files below 150 lines.

## Edge cases

- A null service result means denied access; an empty page is valid.
- Missing expiry date and empty areas or marks have explicit labels.
- Pagination keeps supported role and status parameters.

## Acceptance criteria

- [ ] Shows name, username, base role, additional areas, marks, expiry date, and status.
- [ ] Identifies external temporary guides as current or disabled.
- [ ] Shows a valid empty state.
- [ ] Redirects denied access before rendering rows.
- [ ] Preserves zero-based pagination and role/status URL parameters.
