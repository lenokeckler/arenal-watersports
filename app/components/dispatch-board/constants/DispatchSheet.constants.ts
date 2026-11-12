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
  MAX_FUEL_LINES: 20,
  MAX_UNITS: 100,
  MAX_USAGE: 9_999_999_999.99,
  USAGE_DECIMALS: 2,
  USAGE_TOLERANCE: 1e-6,
} as const;

export const DISPATCH_READING_PATTERN = {
  DECIMAL_COMMA: ",",
  DECIMAL_POINT: ".",
  FUEL: /^\d+$/,
  USAGE: /^\d+([.,]\d{1,2})?$/,
} as const;

export const DISPATCH_SHEET_ERROR = {
  DISPATCH_GROUP: "dispatch reservation group",
  INVALID_INPUT: "Invalid dispatch input",
  LOAD_CATEGORY_RESERVATIONS:
    "load the reservations of a category to dispatch",
  LOAD_GROUPS: "load dispatch groups",
  LOAD_UNITS: "load dispatch candidate units",
} as const;

export const DISPATCH_SHEET_DATABASE_ERROR = {
  ALREADY_DISPATCHED: "23505",
  INVALID_READINGS: "23514",
  INVALID_SELECTION: "22023",
  UNIT_OUT: "55006",
} as const;

export const DISPATCH_GROUP_STATUS = {
  ALREADY_DISPATCHED: "already_dispatched",
  DISPATCHED: "dispatched",
  INVALID_READINGS: "invalid_readings",
  UNAVAILABLE: "unavailable",
} as const;

export const DISPATCH_TRACKING_MODE = {
  BY_UNIT: "by_unit",
} as const;

export const DISPATCH_USAGE_METRIC = {
  ENGINE_HOURS: "engine_hours",
  KILOMETERS: "kilometers",
} as const;
