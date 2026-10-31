import {
  CALENDAR_TEXT,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";

export const E2E_RESERVATIONS_CALENDAR_COPY = {
  HEADING: RESERVATIONS_CALENDAR_COPY.TITLE,
  VIEWS: CALENDAR_TEXT.LABELS,
} as const;

export const E2E_RESERVATIONS_CALENDAR_SCREENSHOT =
  "01-reservations-calendar";

export const E2E_RESERVATIONS_CALENDAR_MONTH_SCREENSHOT =
  "02-reservations-calendar-month";

export const E2E_RESERVATIONS_CALENDAR_WEEK_SCREENSHOT =
  "03-reservations-calendar-week";

export const E2E_RESERVATIONS_CALENDAR_ATTRIBUTES = {
  PRESSED: "aria-pressed",
  TRUE: "true",
} as const;
