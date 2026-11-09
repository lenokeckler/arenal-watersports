import { COSTA_RICA_TIME_ZONE } from "@/app/constants";

export const RESERVATION_HISTORY_DATE_FORMAT = {
  DATE_OPTIONS: {
    day: "numeric",
    month: "short",
    timeZone: COSTA_RICA_TIME_ZONE,
    year: "numeric",
  },
  DATE_TIME_OPTIONS: {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    timeZone: COSTA_RICA_TIME_ZONE,
    year: "numeric",
  },
  LOCALE: "es-CR",
} as const;
