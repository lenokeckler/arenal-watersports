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
