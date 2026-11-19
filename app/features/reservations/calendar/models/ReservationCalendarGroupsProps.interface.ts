import type { CalendarPeriod } from "@/app/components/calendar/models";
import type { ReservationCalendarAgendaContent } from "./ReservationCalendarAgendaContent.interface";
import type { ReservationCalendarAgendaPagination } from "./ReservationCalendarAgendaPagination.interface";

export interface ReservationCalendarGroupsProps {
  period: CalendarPeriod;
  periodAgenda: ReservationCalendarAgendaContent;
  pagination: ReservationCalendarAgendaPagination;
  selectedDayAgenda?: ReservationCalendarAgendaContent;
  selectedMonthAgenda?: ReservationCalendarAgendaContent;
}
