# Combo catalog list (US-ADM-22, price display of US-ADM-23)

## Acceptance criteria (verbatim)

- Un combo que nunca se vendió se elimina. Uno que ya se vendió se marca inactivo, para no romper el historial.
- Cada combo se arma para nacionales o para extranjeros, y aparece en la sección de su público.
- El mismo paquete puede existir para los dos públicos: son dos combos distintos, cada uno armado y cotizado en su sección.
- El precio va en la moneda del público del combo: colones para nacionales y dólares para extranjeros.

## Intent

The administration worker sees every predefined combo, grouped by the audience it is sold to, and removes or reactivates it from one screen.

## In scope

- `/administration/combos`, reached from the Administration navigation.
- Two sections, nationals first and foreigners second, each with its own empty message.
- A card per combo: name, equipment summary ("2 Lancha · 1 Jet ski"), package price in the audience currency, and an Activo or Inactivo chip. Inactive cards are muted.
- Eliminar with a confirmation in an action sheet, and Reactivar on an inactive combo.
- Loading, fetch error with retry, and empty states.

## Out of scope

- End-to-end specs of the combo form (next PR).
- Tariffs (US-ADM-24, US-ADM-25).

## Rules

- Combos, their items and the category names are read in one query with the session client; every read passes `throwIfSupabaseError`.
- National combos show `package_price_crc` in colones and foreign combos show `package_price_usd` in dollars, formatted with `formatMoney`.
- Deleting is decided by the database function `delete_or_deactivate_combo`, which returns `deleted` or `deactivated`; the toast says which one. Any other value is a defect and throws with the value as cause.
- Reactivating calls `set_combo_active` with `p_active` true.
- Both server actions assert an administrator first; `42501` and `P0002` become friendly messages, anything else throws.
- A combo with no equipment, no price or an item whose category is missing still renders: "Sin equipo", "Sin precio", and the broken item is skipped.
- User-facing copy is Spanish addressed as usted.

## Acceptance criteria checklist

- [x] A combo appears only in the section of its audience.
- [x] The price uses the currency of the audience.
- [x] A never sold combo is deleted and a sold one is marked inactive, and the worker is told which.
- [x] An inactive combo is shown muted and can be reactivated.

## Combo form screen (US-ADM-22, US-ADM-23)

- `/administration/combos/new` and `/administration/combos/[comboId]`, thin shells over `ComboCreateForm` and `ComboEditForm`; the edit screen is a not found when the combo does not exist.
- The audience (nationals or foreigners) is chosen with two large buttons only when creating; when editing it is shown as read-only text.
- The equipment is a list of rows (category and quantity) with add and remove; at least one row is required.
- The price field uses the currency of the audience; a combo without a price cannot be saved.
- Errors show after the first submit attempt and follow the values; the message the database gives for a sold combo is shown in the error banner and the data is kept.
- Saving shows "Combo guardado." and returns to the list; Regresar returns to the list without saving.
- The list has a Nuevo combo button and an Editar link on every card.
