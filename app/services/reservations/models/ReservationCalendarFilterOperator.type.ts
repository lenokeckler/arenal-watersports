import type { RESERVATION_CALENDAR_QUERY } from "@/app/constants";

export type ReservationCalendarFilterOperator =
  (typeof RESERVATION_CALENDAR_QUERY.OPERATORS)[keyof typeof RESERVATION_CALENDAR_QUERY.OPERATORS];
