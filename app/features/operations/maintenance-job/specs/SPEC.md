# Maintenance job

## Intent

Let the operations worker register every job done to a machine, so the cost of keeping each one running can be known and the next oil change notice stays right.

## In scope

- Choosing the unit and the type of work: tire change, part change, oil change or another job.
- Writing the date of the job and what was done.
- Registering the cost with its currency, empty when the job cost nothing.
- Marking whether an external workshop did the job, apart from the cost.
- Defining, on an oil change, the threshold of the next oil change notice.
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
- An oil change needs the next threshold, above the usage the machine has accumulated; no other job defines a threshold.
- Registering the job and moving the threshold happen together or not at all.
- Only workers with the operations area can register a job.
