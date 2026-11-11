# Equipment out

## Intent

Let the operations worker see, in one screen, every dispatched group that has not come back yet and how long is left until it does.

## In scope

- Listing each dispatched group that is still out, with its customer, reservation code, category and units.
- Showing the real departure hour and the return hour of the group.
- Counting down the time left until the return hour.
- Marking a group past its return hour as «Por regresar», in the warning color, with the minutes it is late.
- Keeping the count and the list up to date while the page stays open.
- Adjusting the duration of one group, extending or cutting it, which recalculates its return hour.
- Closing a group when its equipment comes back, with its real arrival hour, the fuel and the hours or kilometers it came back with, and a damage report for each unit that came back damaged.
- Marking a group that was extended so Reservations can decide whether the extra hours are charged or courtesy.

## Out of scope

- Alerts when a group is about to return or is late.
- Deciding or charging the extra time of a late group, which Reservations registers apart.

## Requirements

- The return hour of a group is its real departure hour plus its duration, never the scheduled hour of the reservation.
- A reservation with several categories shows one entry per group, each with its own return hour.
- A group that already came back is no longer listed.
- Groups are ordered by return hour, the soonest first.
- Only workers with the operations area can read the list, adjust a duration or close a group.
- Each group closes on its own with its real arrival hour; the arrival is proposed as the current hour and cannot be before the departure or in the future.
- The reservation closes when its last group closes, and only if no equipment committed by unit is left undispatched.
- A motor unit needs the fuel lines and the hours or kilometers it came back with; the hours cannot be lower than the ones it went out with, and the screen shows with which reading it went out.
- A unit that came back damaged needs its cause and a description; closing raises the damage report in the name of who closed the group and changes the state of the unit to damaged.
- A unit can be marked at the return to go to maintenance: it leaves the availability without being deleted and shows as out of service on the maintenance screen; the administration sheet of the unit returns it to service.
- Operations never sees or touches the deposit: the damage report is what Reservations uses afterwards.
- When everything came back in order nothing else is asked and the closing is the record.
- The duration of a group is adjusted on its own, without touching the other groups of the same reservation.
- A group that already came back cannot be adjusted.
- A duration is a whole number of minutes between 1 and 1440.
- A group extended over its planned duration keeps a mark with the minutes added; cutting it back to the plan or below clears the mark.
- Operations only leaves the mark and decides nothing about money.
- The adjustment is registered in the name of who made it.
- A group never closes itself nor disappears from the screen: it stays listed until its equipment returns.
- The time left is shown in hours and minutes; a group past its return hour is marked «Por regresar» with the minutes of delay.
