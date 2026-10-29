import type { CalendarDate } from "./CalendarDate.interface";

export interface CalendarMonth {
  year: number;
  month: number;
  days: CalendarDate[];
}
