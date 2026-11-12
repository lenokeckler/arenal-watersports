# Damage reports

## Intent

Let the operations worker read the earlier damage reports of a unit, to know whether a machine is hit often or the incident was isolated before deciding what to do with it.

## In scope

- Listing the damage reports of one unit, the latest first, with their cause, their description, their date and the impacts they added.
- Showing the unit with its accumulated impacts.
- Paging through the list.
- A link to the reports from each unit card of the maintenance screen.

## Out of scope

- Registering a damage report (US-OPE-09 and the damage report form).
- Editing or deleting a report.
- Photos of the damage (US-OPE-15).

## Requirements

- The screen lives at `/operations/damage-reports?unidad=<unit id>` and only workers with the operations area read it.
- The unit id is validated as a uuid before any read; an unknown or malformed id reads «No se encontró la unidad.».
- A unit without reports reads «Esta unidad no tiene reportes de daño.».
- The reports come twenty at a time, the latest first; a next link appears only when there are more and a previous link after the first page.
