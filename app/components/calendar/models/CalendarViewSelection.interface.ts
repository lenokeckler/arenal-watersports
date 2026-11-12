import type { CalendarDateSelection } from "./CalendarDateSelection.interface";
import type { CalendarMonthSelection } from "./CalendarMonthSelection.interface";

export interface CalendarViewSelection {
  day?: CalendarDateSelection;
  month?: CalendarMonthSelection;
}
