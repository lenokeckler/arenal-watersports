import type { CalendarDate } from "@/app/types";

export interface MonthCalendarCase {
  start: CalendarDate;
  end: CalendarDate;
  gridStart: CalendarDate;
  gridEnd: CalendarDate;
  length: number;
}
