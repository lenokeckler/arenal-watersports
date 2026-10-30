import {
  PAGINATION,
  RESERVATION_CALENDAR_QUERY_ERROR,
} from "@/app/constants";
import type { ReservationCalendarWindow } from "../models/ReservationCalendarWindow.interface";
import { normalizeReservationCalendarInstant } from "./normalizeReservationCalendarInstant";

export const validateReservationCalendarWindow = (
  window: ReservationCalendarWindow
): ReservationCalendarWindow => {
  const firstRecordIndex =
    window.page * PAGINATION.DEFAULT_PAGE_SIZE;
  const lastRecordIndex =
    firstRecordIndex + PAGINATION.DEFAULT_PAGE_SIZE - 1;
  if (
    !Number.isSafeInteger(window.page) ||
    window.page < PAGINATION.DEFAULT_PAGE ||
    !Number.isSafeInteger(firstRecordIndex) ||
    !Number.isSafeInteger(lastRecordIndex)
  ) {
    throw new Error(
      RESERVATION_CALENDAR_QUERY_ERROR.INVALID_PAGE,
      { cause: window.page }
    );
  }
  const startsAt = normalizeReservationCalendarInstant(
    window.startsAt
  );
  const endsAt = normalizeReservationCalendarInstant(
    window.endsAt
  );
  if (Date.parse(startsAt) >= Date.parse(endsAt)) {
    throw new Error(
      RESERVATION_CALENDAR_QUERY_ERROR.INVALID_WINDOW,
      { cause: window }
    );
  }
  return { endsAt, page: window.page, startsAt };
};
