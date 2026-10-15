import {
  RESERVATION_CALENDAR_ERROR,
  RESERVATION_CALENDAR_TIME,
} from "../constants/ReservationCalendarProjection.constants";

export const parseReservationCalendarInstant = (
  instant: string
): number => {
  const timestamp = Date.parse(instant);
  if (
    !RESERVATION_CALENDAR_TIME.INSTANT_PATTERN.test(
      instant
    ) ||
    !Number.isFinite(timestamp)
  ) {
    throw new Error(
      RESERVATION_CALENDAR_ERROR.INVALID_INSTANT,
      {
        cause: instant,
      }
    );
  }
  return timestamp;
};
