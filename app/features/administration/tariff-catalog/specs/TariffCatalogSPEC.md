# Tariff catalog list (US-ADM-24)

## Intent

The administration worker sees, in one screen, what every active category charges per hour for a rental and for a tour. Read the story with `npm run story -- US-ADM-24`; this part closes the list.

## In scope

- `/administration/tariffs`, reached from the account Menu of Administration, not from the bottom bar.
- One card per active category, its name as heading and two lines: Renta and Tour.
- Each line shows dollars and colones in their own currency, never summed, followed by "por hora".
- A line with no tariff shows "Sin tarifa" and no unit; a category with no tariff in both lines is muted.
- Loading, empty ("Aún no hay categorías activas.") and fetch error with retry.
- An "Editar" link (44 px) on each card opens `/administration/tariffs/[categoryId]`.

## Out of scope

- End-to-end specs (next PR), pagination.

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

# Tariff edit form screen (US-ADM-24, US-ADM-25)

## Intent

Administration changes what a category charges per hour for a rental and for a tour, in dollars, colones or both, from one screen.

## In scope

- `/administration/tariffs/[categoryId]`, administrator only; a category that does not exist shows not found.
- The category name is the title; two sections, Renta and Tour, each with "por hora", a dollars field and a colones field.
- The hint "Cambiar una tarifa no cambia lo ya cobrado." is always visible.
- Field errors appear after the first submit attempt; the form-level error and a save failure share one banner.
- "Guardar tarifas" saves, toasts "Tarifas guardadas.", returns to the list and refreshes it; "Regresar" returns without saving.
- While saving the buttons and fields are disabled and the save button shows the loading text.
- A failed save keeps what was typed and shows its message.

## Out of scope

- End-to-end specs (next PR); removing a tariff (a saved tariff can only change its price).

## Rules

- Validation, payload mapping and the save function come from the data layer of US-ADM-24/25; this screen only binds them.
- Access is checked by the entry component and the save function; Row Level Security is the real guard.

## Acceptance criteria checklist

- [x] Both types show their saved prices and the unit per hour.
- [x] A field error shows only after the first submit and blocks saving.
- [x] A failed save keeps the typed data and shows the message.
- [x] A second submission while saving is ignored.
- [x] Regresar goes back to the list without saving.
