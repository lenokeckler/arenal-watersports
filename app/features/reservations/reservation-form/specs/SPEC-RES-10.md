## US-RES-10 custom combo — AWS-93

- A custom combo stores one reservation with one category commitment per selected equipment and quantity.
- Its proposal sums each selected category's individual hourly tariff by quantity and reservation duration; USD and CRC totals are calculated independently.
- A category marked `guide_only` uses its tour tariff and makes the combo a tour. Other categories use their rental tariff.
- Guide IDs are accepted only when at least one selected category is marked `guide_only`; the existing flow does not require a guide assignment.
- Reservation, equipment rows, guide rows, and pricing persist in one database transaction. A failure leaves no partial reservation.
- Hourly quantity-duration multiplication follows the US-ADM-24 tariff example and is an implementation inference because US-RES-10 does not state that formula explicitly.
- Tests cover empty, duplicate, and invalid equipment selections; category tariffs and currency sums; guide eligibility; atomic rollback; and existing rental/tour behavior.
