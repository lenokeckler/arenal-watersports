import { RESERVATION_CALENDAR_LIST } from "../constants/ReservationCalendarList.constants";

export type ReservationCalendarPageSize =
  (typeof RESERVATION_CALENDAR_LIST.PAGE_SIZE_OPTIONS)[number];
