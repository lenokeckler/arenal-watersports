import type { CalendarDate } from "@/app/types";
import type { CalendarViewSelection } from "@/app/components/calendar/models/CalendarViewSelection.interface";

export interface ReservationsCalendarSelection {
  selection: CalendarViewSelection;
  selectedDay?: CalendarDate;
  selectedMonth?: CalendarDate;
}
