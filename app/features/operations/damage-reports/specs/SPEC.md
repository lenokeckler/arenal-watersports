# Damage screen

## Intent

Let operations see what is pending and where the machines get damaged (US-OPE-14).

## Requirements

- Reports left to detail later come first: one opens straight away, several open a list.
- A calendar marks the days with damage, goes back to the first report and can be filtered by cause. Touching a day shows its reports, beside the calendar on wide screens and in a sheet on a phone.
- The charts cover the current month or the last six months. A cause bar opens the calendar filtered by that cause; pending reports have no cause yet.
- The five machines with most damage link to their history.
- A retired machine keeps its reports on the screen, marked as retired, with no history, photos or completion, and its pending reports are not counted: the database refuses to complete them.
- Only operations reads damage reports; Row Level Security enforces it.
