import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import type { NullableRef } from "@/app/types";

export const isValidReservationDate = (
  date: string
): boolean => {
  const match =
    RESERVATION_SCHEDULE.DATE_PATTERN.exec(date);

  if (!match) {
    return false;
  }

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const parsed = new Date(0);
  parsed.setUTCHours(0, 0, 0, 0);
  parsed.setUTCFullYear(
    year,
    month - RESERVATION_SCHEDULE.FIRST_MONTH,
    day
  );

  return (
    month >= RESERVATION_SCHEDULE.FIRST_MONTH &&
    month <= RESERVATION_SCHEDULE.MONTHS_PER_YEAR &&
    year >= RESERVATION_SCHEDULE.FIRST_YEAR &&
    day >= RESERVATION_SCHEDULE.FIRST_DAY &&
    day <= RESERVATION_SCHEDULE.DAYS_PER_MONTH_MAX &&
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() ===
      month - RESERVATION_SCHEDULE.FIRST_MONTH &&
    parsed.getUTCDate() === day
  );
};

export const isValidReservationTime = (
  time: string
): boolean => {
  const match =
    RESERVATION_SCHEDULE.TIME_PATTERN.exec(time);

  if (!match) {
    return false;
  }

  const [, hourText, minuteText] = match;
  const hour = Number(hourText);
  const minute = Number(minuteText);

  return (
    hour <= RESERVATION_SCHEDULE.LAST_HOUR &&
    minute <= RESERVATION_SCHEDULE.LAST_MINUTE
  );
};

export const getReservationDurationMinutes = (
  hours: number
): NullableRef<number> => {
  if (!Number.isFinite(hours) || hours <= 0) {
    return null;
  }

  const durationMinutes =
    hours * RESERVATION_SCHEDULE.MINUTES_PER_HOUR;
  const roundedDurationMinutes =
    Math.round(durationMinutes);
  const roundingTolerance =
    Number.EPSILON * Math.max(1, Math.abs(durationMinutes));

  return Math.abs(
    durationMinutes - roundedDurationMinutes
  ) <= roundingTolerance
    ? roundedDurationMinutes
    : null;
};
