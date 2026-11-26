# Maintenance

## Intent

Let the operations worker see in one screen which machines reached their oil change and which are out of service, before a machine is found damaged.

## In scope

- Listing the machines whose accumulated hours or kilometers reached, or are within 50 km (10 hours for water equipment) of, their next oil change, with how much is left or how far they went past it.
- Listing the machines that are out of service: in maintenance, damaged or in repair.
- Showing hours for the water equipment with motor and kilometers for the quad bikes.

## Out of scope

- Defining the oil change threshold, which belongs to the unit sheet in the administration.
- Marking a unit as in maintenance (US-OPE-17).
- Registering a maintenance job (US-OPE-18) and consulting the history (US-OPE-19).

## Requirements

- A machine is listed for its oil change when it has a threshold and the distance left (threshold minus accumulated usage) is at most 50 km, or 10 hours; the margin is `oil_warning_margin` in the database. A negative distance means it went past.
- The most urgent come first, measured against the margin of their metric.
- A machine without a threshold, or farther than the margin, is not listed for its oil change.
- Each card shows the unit and, at its right, the distance left with an amber drop, or the distance past with a minus sign and a red drop; below it, two figures: Km actual (Horas actuales) and Próximo cambio.
- A decommissioned machine is never listed.
- A machine can appear in both sections when it is past its oil change and out of service.
- Only workers with the operations area can read the screen.
