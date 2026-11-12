# Maintenance history

## Intent

Gather every maintenance job registered on the machines, with its date, so the cost of keeping each one running can be known.

## In scope

- Listing every registered job, the latest first, with its unit, its category and its type.
- Showing what was done, its date, its cost with its currency (or that it had none) and whether an external workshop did it.
- Paging through the list.

## Out of scope

- Registering a job (US-OPE-18).
- The maintenance cost report that the administration consults, which reads these same records.
- Editing or deleting a registered job.

## Requirements

- The latest jobs come first, ordered by the date of the work and then by when it was registered.
- A job without cost reads «Sin costo»; a job with cost shows the amount with its currency.
- The external workshop mark is shown apart from the cost.
- The list is read twenty jobs at a time; a link to the next page appears only when there are more and a link to the previous one after the first page.
- Only workers with the operations area can read the screen.
