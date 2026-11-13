import type { ReservationCalendarAgendaPagination } from "./ReservationCalendarAgendaPagination.interface";

export interface ReservationCalendarAgendaPaginationViewProps {
  pagination: ReservationCalendarAgendaPagination;
  pageCount: number;
  onPageChange: (page: number) => void;
}
