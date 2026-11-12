import {
  CALENDAR_TEXT,
  OPERATIONS_CALENDAR_COPY,
} from "@/app/constants";

export const E2E_OPERATIONS_CALENDAR_COPY = {
  HEADING: OPERATIONS_CALENDAR_COPY.TITLE,
  VIEWS: CALENDAR_TEXT.LABELS,
} as const;

export const E2E_OPERATIONS_CALENDAR_SCREENSHOT =
  "01-operations-calendar";

export const E2E_OPERATIONS_CALENDAR_ATTRIBUTES = {
  PRESSED: "aria-pressed",
  TRUE: "true",
} as const;
