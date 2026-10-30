import type { CalendarView } from "@/app/types";
import type { CalendarDate } from "@/app/types";
import type { CalendarMonth } from "./CalendarMonth.interface";

export interface CalendarPeriod {
  view: CalendarView;
  start: CalendarDate;
  end: CalendarDate;
  days: CalendarDate[];
  months: CalendarMonth[];
}
