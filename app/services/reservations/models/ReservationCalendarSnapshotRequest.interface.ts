import type {
  CalendarDate,
  CalendarView,
} from "@/app/types";

export interface ReservationCalendarSnapshotRequest {
  anchor: CalendarDate;
  view: CalendarView;
}
