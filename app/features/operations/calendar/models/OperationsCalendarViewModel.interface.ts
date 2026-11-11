import type { CalendarDayContent } from "@/app/components/calendar/models/CalendarDayContent.type";
import type { CalendarView } from "@/app/types";

export interface OperationsCalendarViewModel {
  allowedViews: readonly CalendarView[];
  dayContent: CalendarDayContent;
}
