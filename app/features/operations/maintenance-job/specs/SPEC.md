# Maintenance job

## Intent

Let the operations worker register every job done to a machine, so the cost of keeping each one running can be known and the next oil change notice stays right.

## In scope

- Choosing the unit and the type of work: tire change, part change, oil change or another job.
- Writing the date of the job and what was done.
- Registering the cost with its currency, empty when the job cost nothing.
- Marking whether an external workshop did the job, apart from the cost.
- Writing, on an oil change, how long the oil lasts (for example 2500 km, or 100 hours for water equipment); the next change is the usage the machine has now plus that interval, calculated in the database.
- Leaving the job in the name of who registered it.

## Out of scope

- Consulting the maintenance history (US-OPE-19).
- The maintenance cost report that the administration consults.
- Marking a unit as in maintenance (US-OPE-17).
- Defining the first oil change threshold, which belongs to the unit sheet in the administration.

## Requirements

- A job needs a unit that is not decommissioned, a type of work and a date that is not in the future.
- Another type of job needs a description.
- The cost is an amount with up to two decimals and always comes with its currency (colones or dollars); without a cost both stay empty.
- The external workshop mark does not depend on the cost.
- An oil change needs the interval, a number above zero with up to two decimals; the next change is the accumulated usage plus the interval. No other job defines an interval.
- When the job comes from the board (`?unit=<id>`), the unit is shown as a box with its current reading at the right (for example 148.1 km) instead of the list, and the oil field shows the unit at its right, an example (Ej. 2500 km, Ej. 100 h) and one line with the result (Próximo cambio: 4500 km).
- Registering the job and moving the next oil change happen together or not at all.
- Only workers with the operations area can register a job.
