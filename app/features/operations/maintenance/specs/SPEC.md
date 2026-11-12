# Maintenance

## Intent

Let the operations worker see in one screen which machines reached their oil change and which are out of service, before a machine is found damaged.

## In scope

- Listing the machines whose accumulated hours or kilometers reached the oil change threshold of their unit sheet, with how far they went past it.
- Listing the machines that are out of service: in maintenance, damaged or in repair.
- Showing hours for the water equipment with motor and kilometers for the quad bikes.

## Out of scope

- Defining the oil change threshold, which belongs to the unit sheet in the administration.
- Marking a unit as in maintenance (US-OPE-17).
- Registering a maintenance job (US-OPE-18) and consulting the history (US-OPE-19).

## Requirements

- A machine is listed for its oil change when it has a threshold and its accumulated usage is equal to or above it; the overage is the usage minus the threshold, and zero means it just reached it.
- The machines past their threshold come first, the ones that went furthest before the others.
- A machine without a threshold, or below it, is not listed for its oil change.
- A decommissioned machine is never listed.
- A machine can appear in both sections when it is past its oil change and out of service.
- Only workers with the operations area can read the screen.
