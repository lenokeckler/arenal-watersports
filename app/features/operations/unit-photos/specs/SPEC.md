# Unit photos

## Intent

Let operations keep the condition photos of a machine and see them next to its accumulated impact count, to compare how it is today against how it comes back from a trip (US-OPE-15, US-OPE-16).

## In scope

- A screen per unit at `/operations/unit-photos/<unitId>` with six slots: right side, left side, front, back and, optionally, bottom and one extra.
- The accumulated impact count of the unit next to the photos.
- Uploading, replacing and deleting a photo.
- A slot without a photo says so.

## Out of scope

- A photo per trip: only the current photo of each angle is kept.
- A screen for the record of who changed the photos.
- Units whose category keeps no condition photos, and decommissioned units.

## Requirements

- The screen reads only units whose category keeps condition photos and that are not decommissioned.
- Photos are read from the private bucket `unit-condition-photos` through signed urls that expire after an hour.
- An empty slot is the file picker. A stored photo opens in large, with replace and delete next to each other.
- Deleting asks for confirmation. The result shows as a floating notice.
- Any operations worker who is not a temporary guide, and administration, upload, replace and delete; the database function `can_manage_unit_photos` and Row Level Security enforce it. Temporary guides only see them, and the screen says so.
- Every upload writes a new file. A stored file is never overwritten, and the file a photo points to cannot be deleted.
- A stored photo stays on its machine and angle: the database refuses to move it, so no photo leaves a slot without being recorded.
- Every upload, replacement and deletion is recorded with who and when; administration and the general manager may read the record.
- An unknown or malformed unit id reads as not found.
