import type { ReservationCalendarPageSize } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSize.type";
import type { ReservationCalendarPageSizeSaveAction } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSizeSaveAction.type";

export interface ReservationCalendarAgendaPaginationOptions {
  initialPageSize: ReservationCalendarPageSize;
  pageSizeReadError: boolean;
  savePageSize: ReservationCalendarPageSizeSaveAction;
}
