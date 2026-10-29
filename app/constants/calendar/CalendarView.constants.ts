export const CALENDAR_VIEW = {
  DAY: "day",
  MONTH: "month",
  WEEK: "week",
  YEAR: "year",
} as const;

export const CALENDAR_NAVIGATION = {
  NEXT: 1,
  PREVIOUS: -1,
} as const;

export const CALENDAR_WORK_AREA = {
  OPERATIONS: "operaciones",
  RESERVATIONS: "reservas",
} as const;

export const CALENDAR_ALLOWED_VIEWS = {
  OPERATIONS: [CALENDAR_VIEW.DAY, CALENDAR_VIEW.WEEK],
  RESERVATIONS: [
    CALENDAR_VIEW.DAY,
    CALENDAR_VIEW.WEEK,
    CALENDAR_VIEW.MONTH,
    CALENDAR_VIEW.YEAR,
  ],
} as const;
