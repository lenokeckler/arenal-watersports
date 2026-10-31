import type {
  CalendarDate,
  CalendarView,
} from "@/app/types";

export interface ReservationCalendarPeriodRequest {
  anchor: CalendarDate;
  view: CalendarView;
}
