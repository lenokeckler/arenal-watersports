import type { ReservationCalendarPeriodRequest } from "./ReservationCalendarPeriodRequest.interface";

export type ReservationCalendarPeriodRefreshHandler = (
  request: ReservationCalendarPeriodRequest,
  requestKey: string,
  onComplete: ReservationCalendarPeriodRefreshCompleteHandler
) => void;

export type ReservationCalendarPeriodRefreshCompleteHandler =
  (requestKey: string) => void;
