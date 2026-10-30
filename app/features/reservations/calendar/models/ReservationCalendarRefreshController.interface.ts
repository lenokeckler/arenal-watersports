import type { ReservationCalendarPeriodRefreshHandler } from "./ReservationCalendarPeriodRefreshHandler.type";

export interface ReservationCalendarRefreshController {
  invalidate: () => void;
  refreshPeriod: ReservationCalendarPeriodRefreshHandler;
}
