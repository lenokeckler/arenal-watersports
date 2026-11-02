import type { CalendarPeriod } from "@/app/components/calendar/models";
import type { ReservationCalendarAgendaContent } from "./ReservationCalendarAgendaContent.interface";

export interface ReservationCalendarGroupsProps {
  period: CalendarPeriod;
  periodAgenda: ReservationCalendarAgendaContent;
  selectedDayAgenda?: ReservationCalendarAgendaContent;
  selectedMonthAgenda?: ReservationCalendarAgendaContent;
}
