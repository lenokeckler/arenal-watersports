import type { ReservationCalendarPeriodRefreshHandler } from "./ReservationCalendarPeriodRefreshHandler.type";
import type { ReservationCalendarSelectionTracker } from "./ReservationCalendarSelectionTracker.interface";

export interface ReservationCalendarRetryController {
  refreshPeriod: ReservationCalendarPeriodRefreshHandler;
  selectionTracker: ReservationCalendarSelectionTracker;
}
