import type { CalendarPeriod } from "@/app/components/calendar/models";
import type { ReservationCalendarPeriodRequest } from "../models/ReservationCalendarPeriodRequest.interface";

export const buildReservationCalendarPeriodRequest = (
  period: CalendarPeriod
): ReservationCalendarPeriodRequest => ({
  anchor: period.start,
  view: period.view,
});
