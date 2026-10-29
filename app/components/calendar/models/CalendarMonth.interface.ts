import type { CalendarDate } from "@/app/types";

export interface CalendarMonth {
  year: number;
  month: number;
  days: CalendarDate[];
}
