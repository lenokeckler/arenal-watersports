import type { RESERVATION_CALENDAR_QUERY } from "@/app/constants";

export type ReservationCalendarFilterColumn =
  | (typeof RESERVATION_CALENDAR_QUERY.COLUMNS)[keyof typeof RESERVATION_CALENDAR_QUERY.COLUMNS]
  | typeof RESERVATION_CALENDAR_QUERY.MATCHING_DISPATCHES;
