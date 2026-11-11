# Equipment out

## Intent

Let the operations worker see, in one screen, every dispatched group that has not come back yet and how long is left until it does.

## In scope

- Listing each dispatched group that is still out, with its customer, reservation code, category and units.
- Showing the real departure hour and the return hour of the group.
- Counting down the time left until the return hour.
- Marking a group past its return hour as «Por regresar», in the warning color, with the minutes it is late.
- Keeping the count and the list up to date while the page stays open.

## Out of scope

- Adjusting the duration of a group (US-OPE-06).
- Registering the arrival of a group (US-OPE-05).
- Alerts when a group is about to return or is late.
- Deciding or charging the extra time of a late group, which Reservations registers apart.

## Requirements

- The return hour of a group is its real departure hour plus its duration, never the scheduled hour of the reservation.
- A reservation with several categories shows one entry per group, each with its own return hour.
- A group that already came back is no longer listed.
- Groups are ordered by return hour, the soonest first.
- Only workers with the operations area can read the list.
- A group never closes itself nor disappears from the screen: it stays listed until its equipment returns.
- The time left is shown in hours and minutes; a group past its return hour is marked «Por regresar» with the minutes of delay.
