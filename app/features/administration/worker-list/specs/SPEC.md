# Worker list screen

## Intent

Let administration inspect worker account access and current status.

## In scope

- Display each required worker field in a responsive list.
- Identify external temporary guides and show whether they are current or disabled.
- Show an explicit empty state for a valid empty result.
- Redirect denied access before presenting any worker rows.
- Preserve role, status, and zero-based page URL parameters for pagination.
- Let an administrator filter the list by base role and account status.
- Apply filters before server pagination and reset the page index when applying a new filter.

## Out of scope

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

- [x] Shows name, username, base role, additional areas, marks, expiry date, and status (PR #468).
- [x] Identifies external temporary guides as current or disabled (PR #468).
- [x] Filters by base role and account status (PR #469).
- [x] Applies filters before server pagination and retains them in pagination links (PR #469).
- [x] Shows a valid empty state (PR #468).
- [x] Redirects denied access before rendering rows (PR #468).
- [x] Preserves zero-based pagination and role/status URL parameters (PR #468).
