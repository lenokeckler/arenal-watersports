import type { CalendarDayContent } from "@/app/components/calendar/models/CalendarDayContent.type";
import type { CalendarPeriodContent } from "@/app/components/calendar/models/CalendarPeriodContent.type";

export interface ReservationsCalendarViewModel {
  dayContent: CalendarDayContent;
  periodContent: CalendarPeriodContent;
}
