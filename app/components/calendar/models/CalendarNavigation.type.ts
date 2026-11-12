import { CALENDAR_NAVIGATION } from "@/app/constants";

export type CalendarNavigation =
  (typeof CALENDAR_NAVIGATION)[keyof typeof CALENDAR_NAVIGATION];
