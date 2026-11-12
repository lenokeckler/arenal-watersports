## US-RES-10 custom combo — AWS-93

- A custom combo stores one reservation with one category commitment per selected equipment and quantity.
- Its proposal sums each selected category's individual hourly tariff by quantity and reservation duration; USD and CRC totals are calculated independently.
- A category marked `guide_only` uses its tour tariff and makes the combo a tour. Other categories use their rental tariff.
- Guide IDs are accepted only when at least one selected category is marked `guide_only`; the existing flow does not require a guide assignment.
- Reservation, equipment rows, guide rows, and pricing persist in one database transaction. A failure leaves no partial reservation.
- Hourly quantity-duration multiplication follows the US-ADM-24 tariff example and is an implementation inference because US-RES-10 does not state that formula explicitly.
- Tests cover empty, duplicate, and invalid equipment selections; category tariffs and currency sums; guide eligibility; atomic rollback; and existing rental/tour behavior.

## Acceptance criteria (verbatim)

- Sirve para atender solicitudes específicas del cliente.
- Cada equipo del combo queda asociado a la reserva y baja de la disponibilidad igual que si se hubiera reservado por separado.
- El sistema propone como precio la suma de las tarifas individuales, y reservas lo ajusta si acordó otro monto.
- A diferencia del combo predefinido, que se vende con su precio de paquete ya fijado por administración.

## .05 form UI scope

- The combo form lets Reservations select several equipment categories and set an independent quantity for each one.
- Guide-only categories are selectable for a custom combo; rental reservations continue to exclude them.
- The form derives guide assignment eligibility from the selected categories, allows optional guide selection, and shows “Sin guía” when the selection contains no tour component.
- Suggested CRC and USD totals are displayed independently. Optional agreed amounts can override each currency separately.
- The mobile-first layout follows the existing theme tokens and the Stitch combo and reservation form references. Equipment, pricing, guide state, and submission controls remain usable at narrow widths.
- One focused regression test for category filtering remains in .05; component tests are assigned to .06, while Playwright coverage and screenshot evidence are assigned to .07.

## Reservation-form follow-up

- A custom-combo category without the individual tariff required by its reservation type is shown as unavailable and cannot be added. The UI distinguishes a missing tariff from a failed catalog request, and the database remains the final validator.
- When the custom combo includes a concrete Lancha unit, Reservations can select active extras compatible with that unit. The combo quote adds each extra once without adding the Lancha tariff a second time. The reservation, extra rows, inventory commitments, and pricing persist atomically, with each extra linked to its originating unit.
- Provisional rental tariffs for Kayak doble, Kayak individual, and Paddleboard match the current Jet Ski rental tariff in local seed data. These catalog values may be changed later through the normal tariff maintenance flow.

## UI-to-criterion mapping

| Acceptance criterion                                            | UI and verification                                                                                                                         |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Specific customer requests                                      | Multiple category selection with per-category quantities; filter regression in .05, component coverage in .06, and browser coverage in .07. |
| Each equipment item remains associated and affects availability | The form submits the existing .04 custom-combo draft; this UI only collects category and quantity selections.                               |
| Individual tariffs are proposed and can be adjusted             | The server-provided dual-currency proposal is displayed and each agreed amount has its own optional input.                                  |
| Predefined combo pricing remains administration-fixed           | Existing rental and tour controls remain in place; the new itemized controls render only for custom combo.                                  |
