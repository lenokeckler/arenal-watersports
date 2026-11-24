# Tariff catalog list (US-ADM-24)

## Intent

The administration worker sees, in one screen, what every active category charges per hour for a rental and for a tour. Read the story with `npm run story -- US-ADM-24`; this part closes the list.

## In scope

- `/administration/tariffs`, reached from the account Menu of Administration, not from the bottom bar.
- One card per active category, its name as heading and two lines: Renta and Tour.
- Each line shows dollars and colones in their own currency, never summed, followed by "por hora".
- A line with no tariff shows "Sin tarifa" and no unit; a category with no tariff in both lines is muted.
- Loading, empty ("Aún no hay categorías activas.") and fetch error with retry.

## Out of scope

- Editing a tariff and the Editar link (next PR), end-to-end specs, pagination.

## Rules

- Categories and tariffs are read in one server query with the session client; every read passes `throwIfSupabaseError`.
- A visitor who is not an administrator goes to the home screen; Row Level Security is the real guard.
- Amounts come from `formatTariffAmounts`: dollars first, colones second.
- User-facing copy is Spanish addressed as usted.

## Acceptance criteria checklist

- [x] Every active category appears once with a Renta and a Tour line.
- [x] Amounts keep the currency they were registered in.
- [x] A missing tariff reads "Sin tarifa" without the unit.
- [x] The fetch failure offers a retry that refreshes the screen.
