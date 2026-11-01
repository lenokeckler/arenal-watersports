import type { CalendarDayContent } from "./CalendarDayContent.type";
import type { CalendarViewModel } from "./CalendarViewModel.interface";
import type { CalendarViewSelection } from "./CalendarViewSelection.interface";

export interface CalendarPeriodsProps {
  calendar: CalendarViewModel;
  dayContent?: CalendarDayContent;
  selection?: CalendarViewSelection;
}
