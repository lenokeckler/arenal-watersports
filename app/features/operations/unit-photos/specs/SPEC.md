# Unit photos

## Intent

Let the operations worker see the condition photos of a machine next to its accumulated impact count, to compare how it is today against how it comes back from a trip.

## In scope

- A screen per unit at `/operations/unit-photos/<unitId>` with one slot per angle: right side, left side, front and, optionally, bottom.
- The accumulated impact count of the unit next to the photos.
- A slot without a photo says so.

## Out of scope

- Uploading and replacing photos (US-OPE-15).
- A photo per trip: only the current photo of each angle is kept.
- Units whose category keeps no condition photos, and decommissioned units.
- The entry from the main panel: the system navigation belongs to another story.

## Requirements

- The screen reads only units whose category keeps condition photos and that are not decommissioned.
- Photos are read from the private bucket `unit-condition-photos` through signed urls that expire after an hour.
- Every operations worker sees the photos; only the general manager mark or administration changes them.
- An unknown or malformed unit id reads as not found.
