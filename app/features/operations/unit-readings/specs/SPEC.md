# Unit readings

## Intent

Let the operations worker see and correct the gauge, the usage, the impacts and the status of a machine outside any trip, so the data stays current when someone fuels a machine, changes the oil or finds a hit with no reservation involved.

## In scope

- A list of the units with a motor showing, without opening any, the gauge in lines, the hours or kilometers according to the metric of each one, and whether the oil is overdue or the unit is out of service.
- A correction screen per unit with the lines of the gauge, the level, the accumulated usage, the impacts and the status.
- A record of every correction, in the name of who made it, with what the unit had before and what it has now.

## Out of scope

- Units without a motor: a kayak has no meter to read.
- Decommissioned units, and decommissioning from a correction.
- The entry from the main panel: the system navigation belongs to another story, so the screen opens from `/operations/unit-readings`.
- Photos of the machine (US-OPE-15 and US-OPE-16).

## Requirements

- The list reads only units whose category has a motor and that are not decommissioned.
- The oil reads as overdue when the accumulated usage reached the next oil change threshold.
- A unit reads as out of service when it is damaged, in repair or in maintenance.
- A correction sets the lines of the gauge (1 to 20), the level (0 to the lines), the usage (zero or more, two decimals at most), the impacts (zero or more) and the status (available, in maintenance, damaged or in repair).
- A correction that changes nothing is refused and says so.
- The database function `correct_unit_readings` checks the operations area, locks the unit, validates every value and writes the row of `unit_corrections` with `created_by` set from the session; nobody writes that table directly.
- Only workers with the operations area can read or correct.
