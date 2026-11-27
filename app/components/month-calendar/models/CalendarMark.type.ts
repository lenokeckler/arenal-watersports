import type { CALENDAR_MARK } from "../constants/CalendarMark.constants";

export type CalendarMark =
  (typeof CALENDAR_MARK)[keyof typeof CALENDAR_MARK];
