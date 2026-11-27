import type { ReservationCalendarAgendaContent } from "./ReservationCalendarAgendaContent.interface";
import type { ReservationCalendarAgendaPagination } from "./ReservationCalendarAgendaPagination.interface";
import type { ReservationCalendarAgendaPage } from "./ReservationCalendarAgendaPage.interface";

export interface ReservationCalendarAgendaListProps {
  periodAgenda: ReservationCalendarAgendaContent;
  periodPage: ReservationCalendarAgendaPage;
  pagination: ReservationCalendarAgendaPagination;
  selectedDayAgenda?: ReservationCalendarAgendaContent;
  selectedMonthAgenda?: ReservationCalendarAgendaContent;
  showPeriodAgenda: boolean;
  showPeriodStatus: boolean;
}
