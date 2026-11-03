import type { CostaRicaDayRange } from "../models/CostaRicaDayRange.interface";

export const MIDDAY = new Date("2026-10-28T18:00:00.000Z");
export const EXPECTED_MIDDAY_RANGE: CostaRicaDayRange = {
  date: "2026-10-28",
  startsAt: "2026-10-28T06:00:00.000Z",
  endsAt: "2026-10-29T06:00:00.000Z",
};

export const LAST_MILLISECOND = new Date(
  "2026-10-29T05:59:59.999Z"
);
export const FIRST_INSTANT = new Date(
  "2026-10-28T06:00:00.000Z"
);
export const MIDNIGHT_UTC = new Date(
  "2026-10-29T00:00:00.000Z"
);

export const LAST_DAY_OF_YEAR = new Date(
  "2027-01-01T03:00:00.000Z"
);
export const EXPECTED_LAST_DAY_OF_YEAR_RANGE: CostaRicaDayRange =
  {
    date: "2026-12-31",
    startsAt: "2026-12-31T06:00:00.000Z",
    endsAt: "2027-01-01T06:00:00.000Z",
  };

export const LEAP_DAY = new Date(
  "2028-02-29T12:00:00.000Z"
);
export const EXPECTED_LEAP_DAY_RANGE: CostaRicaDayRange = {
  date: "2028-02-29",
  startsAt: "2028-02-29T06:00:00.000Z",
  endsAt: "2028-03-01T06:00:00.000Z",
};
