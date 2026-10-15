import type {
  CalendarDate,
  CalendarView,
} from "@/app/types";
import type { CalendarDayContent } from "./CalendarDayContent.type";
import type { CalendarPeriodContent } from "./CalendarPeriodContent.type";

export interface CalendarViewProps {
  heading: string;
  today: CalendarDate;
  allowedViews: readonly CalendarView[];
  dayContent?: CalendarDayContent;
  periodContent?: CalendarPeriodContent;
}
