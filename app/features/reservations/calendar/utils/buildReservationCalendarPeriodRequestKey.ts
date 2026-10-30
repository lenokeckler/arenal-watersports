import type { ReservationCalendarPeriodRequest } from "../models/ReservationCalendarPeriodRequest.interface";

export const buildReservationCalendarPeriodRequestKey = (
  request: ReservationCalendarPeriodRequest
): string => JSON.stringify(request);
