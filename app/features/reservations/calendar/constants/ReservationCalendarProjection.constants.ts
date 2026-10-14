import { CALENDAR_PRESENTATION } from "@/app/constants";

export const RESERVATION_CALENDAR_ERROR = {
  INVALID_DISPATCH: "Invalid calendar departure group",
  INVALID_EQUIPMENT:
    "Invalid calendar equipment commitment",
  INVALID_INSTANT: "Invalid calendar reservation instant",
  INVALID_SCHEDULE: "Invalid calendar scheduled interval",
} as const;

export const RESERVATION_CALENDAR_TIME = {
  INSTANT_PATTERN:
    /T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/,
  LOCALE: CALENDAR_PRESENTATION.LOCALE,
  OPTIONS: {
    hour: "2-digit",
    hourCycle: "h23",
    minute: "2-digit",
    timeZone: "America/Costa_Rica",
  },
} as const;
