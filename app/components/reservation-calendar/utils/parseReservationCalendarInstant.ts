import { TIME } from "@/app/constants";
import {
  RESERVATION_CALENDAR_ERROR,
  RESERVATION_CALENDAR_TIME,
} from "../constants/ReservationCalendarProjection.constants";

export const parseReservationCalendarInstant = (
  instant: string
): number => {
  const timestamp = Date.parse(instant);
  const [civilDate, timeAndOffset] = instant.split("T");
  const civilDateTimestamp = Date.parse(
    `${civilDate}T00:00:00Z`
  );
  const parsedCivilDate = Number.isFinite(
    civilDateTimestamp
  )
    ? new Date(civilDateTimestamp)
        .toISOString()
        .split("T")[0]
    : null;
  const hour = Number(timeAndOffset?.slice(0, 2));
  if (
    !RESERVATION_CALENDAR_TIME.INSTANT_PATTERN.test(
      instant
    ) ||
    !Number.isFinite(timestamp) ||
    parsedCivilDate !== civilDate ||
    hour >= TIME.UNITS.HOURS_IN_DAY
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
