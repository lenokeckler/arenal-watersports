# Damage report

## Intent

Allow the operations worker to create a damage report for a machine.

## In scope

- Selecting the damage cause.
- Writing a description of what happened.
- Indicating how much the machine's impact count increased.
- Recording the worker who created the report.

## Out of scope

- Consulting previous damage reports (US-OPE-14).
- Machine condition photos (US-OPE-15, US-OPE-16).
- Marking a machine as under maintenance (US-OPE-17).
- Maintenance records (US-OPE-18, US-OPE-19).
- Correcting machine data outside a reservation (US-OPE-20).
- Deposit management.
- Automatically defining or changing the machine's accumulated impact count unless an existing backend rule requires it.

## Requirements

- The damage cause must be one of: rollover, collision, machine failure, or other.
- The report must contain a description of what happened.
- The report must contain the increase in the machine's impact count.
- The report must be associated with the authenticated worker who created it.
