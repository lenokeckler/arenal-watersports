import type { ReservationCalendarPageSize } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSize.type";

export interface ReservationCalendarPageSizeRead {
  pageSize: ReservationCalendarPageSize;
  hasError: boolean;
}
