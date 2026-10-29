import type { CalendarView } from "./CalendarView.type";
import type { CalendarDate } from "./CalendarDate.interface";
import type { CalendarMonth } from "./CalendarMonth.interface";

export interface CalendarPeriod {
  view: CalendarView;
  start: CalendarDate;
  end: CalendarDate;
  days: CalendarDate[];
  months: CalendarMonth[];
}
