import {
  CALENDAR_TEXT,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import { CALENDAR_HEAT_LEVEL } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";
import {
  CALENDAR_HEAT_GREEN_CLASS,
  CALENDAR_HEAT_ORANGE_CLASS,
  CALENDAR_HEAT_RED_CLASS,
} from "@/app/components/calendar/styles/Calendar.styles";
import { E2E_PROJECT } from "./E2eRuntime.constants";

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

export const E2E_RESERVATIONS_CALENDAR_DAY_SCREENSHOT =
  "04-reservations-calendar-selected-day";

export const E2E_RESERVATIONS_CALENDAR_YEAR_SCREENSHOT =
  "05-reservations-calendar-year";

export const E2E_RESERVATIONS_CALENDAR_MONTH_SELECTION_SCREENSHOT =
  "06-reservations-calendar-selected-month";

export const E2E_RESERVATIONS_CALENDAR_HEAT_FIXTURE = {
  DAY_OFFSETS_BY_PROJECT: {
    [E2E_PROJECT.MOBILE]: 0,
    [E2E_PROJECT.DEFAULT]: 6,
    [E2E_PROJECT.SCREENSHOTS_MOBILE]: 12,
    [E2E_PROJECT.SCREENSHOTS]: 18,
    [E2E_PROJECT.ADMIN_SCREENSHOTS_MOBILE]: 12,
    [E2E_PROJECT.ADMIN_SCREENSHOTS]: 18,
  },
  DAYS: [
    {
      count: 2,
      day: 2,
      heatLevel: CALENDAR_HEAT_LEVEL.GREEN,
    },
    {
      count: 4,
      day: 4,
      heatLevel: CALENDAR_HEAT_LEVEL.ORANGE,
    },
    {
      count: 6,
      day: 6,
      heatLevel: CALENDAR_HEAT_LEVEL.RED,
    },
  ],
  CUSTOMER_PREFIX: "Reservations calendar heat E2E",
  START_HOUR_UTC: 18,
  DURATION_MINUTES: 60,
  PEOPLE_COUNT: 1,
  TYPE: "tour",
} as const;

export const E2E_RESERVATIONS_CALENDAR_HEAT_CLASSES = {
  [CALENDAR_HEAT_LEVEL.NONE]: "",
  [CALENDAR_HEAT_LEVEL.GREEN]: CALENDAR_HEAT_GREEN_CLASS,
  [CALENDAR_HEAT_LEVEL.ORANGE]: CALENDAR_HEAT_ORANGE_CLASS,
  [CALENDAR_HEAT_LEVEL.RED]: CALENDAR_HEAT_RED_CLASS,
} as const;

export const E2E_RESERVATIONS_CALENDAR_SELECTORS = {
  WEEK_GRID: "div.grid-flow-col:has(> div)",
} as const;

export const E2E_RESERVATIONS_CALENDAR_ERRORS = {
  CREATE_OPERATION:
    "create Reservations calendar heat fixtures",
  REMOVE_OPERATION:
    "remove Reservations calendar heat fixtures",
  EMPTY_HEAT_FIXTURE:
    "The calendar heat fixture has no selected date.",
  EMPTY_RESERVATION_NAMES:
    "The calendar heat fixture has no reservation names.",
  UNKNOWN_PROJECT: (projectName: string): string =>
    `The calendar heat fixture does not support project ${projectName}.`,
} as const;

export const E2E_RESERVATIONS_CALENDAR_ATTRIBUTES = {
  PRESSED: "aria-pressed",
  TRUE: "true",
} as const;
