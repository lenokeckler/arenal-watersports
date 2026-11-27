import { RESERVATION_CALENDAR_LIST } from "../constants/ReservationCalendarList.constants";
import type { ReservationCalendarPageSize } from "../models/ReservationCalendarPageSize.type";

export const isReservationCalendarPageSize = (
  value: unknown
): value is ReservationCalendarPageSize =>
  typeof value === "number" &&
  RESERVATION_CALENDAR_LIST.PAGE_SIZE_OPTIONS.some(
    (option) => option === value
  );
