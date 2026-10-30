import { CALENDAR_VIEW } from "@/app/constants";

export type CalendarView =
  (typeof CALENDAR_VIEW)[keyof typeof CALENDAR_VIEW];
