import type { CalendarDayContent } from "./CalendarDayContent.type";
import type { CalendarViewModel } from "./CalendarViewModel.interface";

export interface CalendarPeriodsProps {
  calendar: CalendarViewModel;
  dayContent?: CalendarDayContent;
}
