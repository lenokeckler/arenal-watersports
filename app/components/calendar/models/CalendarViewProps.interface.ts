import type {
  CalendarDate,
  CalendarView,
} from "@/app/types";
import type { CalendarDayContent } from "./CalendarDayContent.type";
import type { CalendarPeriodContent } from "./CalendarPeriodContent.type";
import type { CalendarPeriodChangeHandler } from "./CalendarPeriodChangeHandler.type";
import type { CalendarViewSelection } from "./CalendarViewSelection.interface";

export interface CalendarViewProps {
  heading: string;
  today: CalendarDate;
  allowedViews: readonly CalendarView[];
  dayContent?: CalendarDayContent;
  onPeriodChange?: CalendarPeriodChangeHandler;
  periodContent?: CalendarPeriodContent;
  selection?: CalendarViewSelection;
}
