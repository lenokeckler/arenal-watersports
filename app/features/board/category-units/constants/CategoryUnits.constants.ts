import {
  CALENDAR_PRESENTATION,
  COSTA_RICA_TIME_ZONE,
} from "@/app/constants";

export const CATEGORY_UNITS_ERROR = {
  INCOMPLETE_OCCUPANCY:
    "Occupied board unit without its reservation data",
  UNKNOWN_STATUS: "Unknown board unit status",
} as const;

export const CATEGORY_UNIT_RETURN_DATE_FORMAT = {
  LOCALE: CALENDAR_PRESENTATION.LOCALE,
  OPTIONS: {
    day: "numeric",
    month: "short",
    timeZone: COSTA_RICA_TIME_ZONE,
  },
} as const satisfies {
  LOCALE: string;
  OPTIONS: Intl.DateTimeFormatOptions;
};

export const DEFAULT_LOW_FUEL_LINES = 1;

export const CATEGORY_UNIT_IMAGE = {
  HEIGHT: 400,
  SIZES:
    "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  WIDTH: 600,
} as const;

export const CATEGORY_UNIT_USAGE = {
  FORMAT: { maximumFractionDigits: 2 },
  LOCALE: CALENDAR_PRESENTATION.LOCALE,
} as const;

export const CATEGORY_UNITS_SKELETON = {
  DETAIL_ROW_COUNT: 2,
  ROW_COUNT: 6,
} as const;

export const CATEGORY_UNITS_SKELETON_INDEXES = Array.from(
  { length: CATEGORY_UNITS_SKELETON.ROW_COUNT },
  (_, index) => index
);

export const CATEGORY_UNITS_DISPATCH_STEP = {
  BROWSING: "browsing",
  DISPATCHING: "dispatching",
  PICKING: "picking",
} as const;

export const CATEGORY_UNIT_ACTION = {
  INFO: "info",
  MODIFY: "modify",
} as const;

export const CATEGORY_UNIT_UPDATE_STATUS = {
  ALREADY_CLOSED: "already_closed",
  INVALID: "invalid",
  NOT_CORRECTABLE: "not_correctable",
  UNCHANGED: "unchanged",
  UPDATED: "updated",
} as const;

export const CATEGORY_UNIT_DATABASE_ERROR = {
  ALREADY_CLOSED: "55000",
  INVALID_VALUE: "22023",
  NOTHING_TO_CORRECT: "23514",
} as const;

export const CATEGORY_UNIT_UPDATE_ERROR = {
  CORRECT_UNIT: "correct a board unit",
  INVALID_INPUT: "The board unit update is not valid",
  UPDATE_DISPATCH: "update an open dispatch",
} as const;

export const CATEGORY_UNIT_LIMITS = {
  FUEL_MAX_MAX: 20,
  IMPACT_COUNT_MAX: 100_000,
  IMPACT_COUNT_MIN: 0,
  RADIO_CHANNEL_MAX: 99,
  RADIO_CHANNEL_MIN: 1,
  USAGE_MAX: 9_999_999_999.99,
} as const;

export const CATEGORY_UNIT_RECORDED_STATUS = {
  FALLBACK: "available",
  OCCUPIED: "occupied",
} as const;

export const CATEGORY_UNIT_FIELD_ID = {
  USAGE: "category-unit-usage",
} as const;

export const CATEGORY_UNIT_ROW_KIND = {
  INFO: "info",
  MODIFY: "modify",
  PLAIN: "plain",
  SELECT: "select",
} as const;
