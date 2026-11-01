import { RESERVATION_TYPE } from "@/app/constants";

export const HISTORY_VALID_DATE = "2026-10-31";

export const HISTORY_LATER_VALID_DATE = "2026-11-15";

export const HISTORY_LEAP_DAY = "2028-02-29";

export const HISTORY_NONEXISTENT_DAY = "2026-02-30";

export const HISTORY_MALFORMED_DATE = "not-a-date";

export const HISTORY_INVALID_DATES = [
  "",
  HISTORY_NONEXISTENT_DAY,
  "2027-02-29",
  "2026-13-01",
  "2026-00-10",
  "2026-04-31",
  "2026-1-5",
  "31-10-2026",
  "2026-10-31T00:00:00Z",
  HISTORY_MALFORMED_DATE,
] as const;

export const HISTORY_VALID_CATEGORY =
  "5b2f0c9e-3d1a-4c55-9a53-0a8f6c1d7e21";

export const HISTORY_SECOND_CATEGORY =
  "7a1d2e44-9c3b-4f08-b6a2-1e5d8c0f3a67";

export const HISTORY_INVALID_CATEGORY = "not-a-uuid";

export const HISTORY_INVALID_CATEGORIES = [
  "",
  HISTORY_INVALID_CATEGORY,
  "5b2f0c9e-3d1a-4c55-9a53",
] as const;

export const HISTORY_INVALID_TYPE = "boat";

export const HISTORY_INVALID_TYPES = [
  "",
  HISTORY_INVALID_TYPE,
  "TOUR",
] as const;

export const HISTORY_VALID_TYPES = Object.values(
  RESERVATION_TYPE
);

export const HISTORY_FIRST_PAGE_PARAMETER = "1";

export const HISTORY_INVALID_PAGE_PARAMETER = "-1";

export const HISTORY_PAGE_PARAMETERS = {
  INVALID: [
    "",
    "0",
    HISTORY_INVALID_PAGE_PARAMETER,
    "1.5",
    "not-a-page",
    "9007199254740993",
    "1e400",
  ],
  MAX_SAFE_NUMBER: String(Number.MAX_SAFE_INTEGER),
  MULTIPLE: ["2", "3"],
  VALID: "4",
  VALID_INDEX: 3,
} as const;

export const HISTORY_REPEATED_PARAMETERS = [
  "first",
  "second",
] as const;
