import type { ReservationCalendarPageSize } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSize.type";

export interface ReservationCalendarAgendaPagination {
  isSavingPageSize: boolean;
  page: number;
  pageSizeReadError: boolean;
  pageSize: ReservationCalendarPageSize;
  saveError: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (
    pageSize: ReservationCalendarPageSize
  ) => void;
  resetPage: () => void;
}
