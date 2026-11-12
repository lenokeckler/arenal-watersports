export const MOVEMENT_REPORT_ERROR = {
  LOAD_INCOME:
    "load the monthly income of the movement report",
  LOAD_MONTHS:
    "load the monthly departures of the movement report",
  LOAD_WEEKDAYS:
    "load the weekday departures of the movement report",
  NOT_ADMINISTRATOR: "The worker is not an administrator.",
} as const;

export const MOVEMENT_REPORT_LIMITS = {
  MONTHS_MAX: 120,
} as const;

export const MOVEMENT_REPORT_WEEKDAYS = [
  1, 2, 3, 4, 5, 6, 7,
] as const;

export type MovementReportWeekday =
  (typeof MOVEMENT_REPORT_WEEKDAYS)[number];

export const MOVEMENT_REPORT_FORMAT = {
  locale: "es-CR",
  monthOptions: {
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  },
  midnightSuffix: "T00:00:00Z",
} as const satisfies {
  locale: string;
  midnightSuffix: string;
  monthOptions: Intl.DateTimeFormatOptions;
};
