# Damage report

## Intent

Raise a damage report for a machine, or complete one that was left to detail later.

## In scope

- Choosing the machine, or taking it from the screen that opened the form.
- Choosing the cause and describing what happened.
- Indicating how many new hits the machine has; they are added to its count.
- Choosing whether the machine stays damaged, goes to maintenance or does not change.
- Linking the report to a recent trip of that machine.
- Saving without cause and description to complete them later.
- Recording who raised the report and who completed it.

## Out of scope

- Consulting previous damage reports (US-OPE-14).
- Machine condition photos (US-OPE-15, US-OPE-16).
- Maintenance records (US-OPE-18, US-OPE-19).
- Deposit management.

## Requirements

- The damage cause must be one of: rollover, collision, machine failure, or other.
- A finished report has a cause and a description of at most 2000 characters.
- A report never returns a machine to service.
- The state of a machine out on the water cannot change from this form.
- A report is completed only once, and completing it adds only the difference of hits.
- A report of a decommissioned machine cannot be completed.
- The database functions `create_damage_report` and `complete_damage_report` enforce these rules.
- Signed in accounts cannot insert a report directly; only those functions and the return of a trip write one.
