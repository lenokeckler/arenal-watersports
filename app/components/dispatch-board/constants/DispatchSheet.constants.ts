import { CALENDAR_DATE, TIME } from "@/app/constants";

const MILLISECONDS_IN_MINUTE =
  TIME.UNITS.SECONDS_IN_MINUTE *
  TIME.UNITS.MILLISECONDS_IN_SECOND;

export const DISPATCH_SHEET_TIME = {
  CLOCK_PATTERN: /^([01]\d|2[0-3]):([0-5]\d)$/,
  HOURS_GROUP: 1,
  MILLISECONDS_IN_MINUTE,
  MINUTES_GROUP: 2,
  MINUTES_IN_DAY:
    CALENDAR_DATE.MILLISECONDS_IN_DAY /
    MILLISECONDS_IN_MINUTE,
} as const;

export const DISPATCH_SHEET_LIMITS = {
  MAX_UNITS: 100,
} as const;

export const DISPATCH_SHEET_ERROR = {
  DISPATCH_GROUP: "dispatch reservation group",
  INVALID_INPUT: "Invalid dispatch input",
  LOAD_GROUPS: "load dispatch groups",
  LOAD_UNITS: "load dispatch candidate units",
} as const;

export const DISPATCH_SHEET_DATABASE_ERROR = {
  ALREADY_DISPATCHED: "23505",
  INVALID_SELECTION: "22023",
  UNIT_OUT: "55006",
} as const;

export const DISPATCH_GROUP_STATUS = {
  ALREADY_DISPATCHED: "already_dispatched",
  DISPATCHED: "dispatched",
  UNAVAILABLE: "unavailable",
} as const;

export const DISPATCH_TRACKING_MODE = {
  BY_UNIT: "by_unit",
} as const;
