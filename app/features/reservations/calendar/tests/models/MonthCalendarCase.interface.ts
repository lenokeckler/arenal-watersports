import type { CalendarDate } from "../../models";

export interface MonthCalendarCase {
  start: CalendarDate;
  end: CalendarDate;
  gridStart: CalendarDate;
  gridEnd: CalendarDate;
  length: number;
}
