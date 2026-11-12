# Maintenance cost by machine

## Intent

Let the administration see how much has been spent keeping each machine running, to decide when a machine stops being profitable.

## In scope

- Listing each machine that has maintenance jobs with a cost.
- Showing the total cost of each machine apart by currency, how many jobs with cost it has and the date of the last one.

## Out of scope

- Registering and consulting maintenance jobs (US-OPE-18 and US-OPE-19), which this report is built from.
- Comparing the cost with the income of the machine.
- Exporting the report.

## Requirements

- The report is built from the maintenance records of each unit; a job that cost nothing does not count.
- Totals are never added across currencies: colones and dollars are shown apart.
- Machines are ordered by code.
- Only the administration can open the screen; any other worker goes back to the home screen.
