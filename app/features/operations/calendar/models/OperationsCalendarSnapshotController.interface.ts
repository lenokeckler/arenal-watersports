import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { CalendarPeriodChangeHandler } from "@/app/components/calendar/models/CalendarPeriodChangeHandler.type";

export interface OperationsCalendarSnapshotController {
  hasRefreshError: boolean;
  onPeriodChange: CalendarPeriodChangeHandler;
  onRetry: () => void;
  snapshot: ReservationCalendarSnapshot;
}
