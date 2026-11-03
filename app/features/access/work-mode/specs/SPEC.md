# Work mode

## Intent

A person who handles reservations some days and dispatches on the beach other days has one
account with two areas. On entering, the system asks which area to work in, and inside that mode
the account behaves as if it only had that area.

## In scope

- `WorkModeGate` on the board page (`ensureWorkModeChosen` runs before the board reads anything): an account with more than one area and no valid mode is sent to
  `PATHS.MODE` (`/mode`).
- `WorkModeSelector` at `/mode`: one large card per enabled area (Operaciones, Reservas,
  Administración, in that order), the current one marked "Modo actual". Choosing posts
  `submitWorkModeChoice`, which calls `choose_work_area` and returns to the home.
- An account with a single area is sent to the home and never sees the selector.

## Out of scope

- Menus and screens per area (US-TAB-07).

## Requirements

- The mode lives in `workers.last_work_area`, so the last mode is remembered across sign-ins.
- The mode restricts and never grants: `has_area` lets a multi-area account reach only the area of
  its mode, everywhere Row Level Security checks it; `choose_work_area` refuses an area the account
  does not have.
- Changing the mode never signs the person out.
