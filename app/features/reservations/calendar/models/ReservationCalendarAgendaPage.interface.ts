import type { ReservationCalendarDayGroup } from "@/app/components/reservation-calendar/models/ReservationCalendarDayGroup.interface";

export interface ReservationCalendarAgendaPage {
  groups: ReservationCalendarDayGroup[];
  page: number;
  pageCount: number;
  totalCount: number;
}
