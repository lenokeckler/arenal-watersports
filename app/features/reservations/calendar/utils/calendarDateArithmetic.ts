import {
  CALENDAR_DATE,
  CALENDAR_DATE_ERROR,
} from "@/app/constants";
import type { CalendarDate } from "../models";

export const toCalendarDate = (
  date: Date
): CalendarDate => {
  if (!Number.isFinite(date.getTime())) {
    throw new RangeError(CALENDAR_DATE_ERROR.INVALID_DATE);
  }
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
};

export const toCalendarUtcDate = (
  civilDate: CalendarDate
): Date => {
  const { year, month, day } = civilDate;
  if (![year, month, day].every(Number.isInteger)) {
    throw new RangeError(CALENDAR_DATE_ERROR.INVALID_DATE);
  }
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  const normalized = toCalendarDate(date);
  if (
    normalized.year !== year ||
    normalized.month !== month ||
    normalized.day !== day
  ) {
    throw new RangeError(CALENDAR_DATE_ERROR.INVALID_DATE);
  }
  return date;
};

export const addCalendarDays = (
  date: CalendarDate,
  days: number
): CalendarDate => {
  const utcDate = toCalendarUtcDate(date);
  utcDate.setUTCDate(utcDate.getUTCDate() + days);
  return toCalendarDate(utcDate);
};

export const getCalendarWeekStart = (
  date: CalendarDate
): CalendarDate => {
  const weekday = toCalendarUtcDate(date).getUTCDay();
  const elapsedDays =
    (weekday -
      CALENDAR_DATE.UTC_MONDAY +
      CALENDAR_DATE.DAYS_IN_WEEK) %
    CALENDAR_DATE.DAYS_IN_WEEK;
  return addCalendarDays(date, -elapsedDays);
};

export const buildCalendarDays = (
  start: CalendarDate,
  end: CalendarDate
): CalendarDate[] => {
  const elapsed =
    toCalendarUtcDate(end).getTime() -
    toCalendarUtcDate(start).getTime();
  return Array.from(
    {
      length:
        elapsed / CALENDAR_DATE.MILLISECONDS_IN_DAY + 1,
    },
    (_, index) => addCalendarDays(start, index)
  );
};
