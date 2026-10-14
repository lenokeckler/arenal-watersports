import { CALENDAR_DATE } from "@/app/constants";
import type {
  CalendarDate,
  CalendarMonth,
} from "../models";
import {
  addCalendarDays,
  buildCalendarDays,
  getCalendarWeekStart,
  toCalendarDate,
  toCalendarUtcDate,
} from "./calendarDateArithmetic";

export const getCalendarMonthEnd = (
  firstDay: CalendarDate
): CalendarDate => {
  const nextMonth = toCalendarUtcDate(firstDay);
  nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1);
  return addCalendarDays(toCalendarDate(nextMonth), -1);
};

export const buildCalendarMonth = (
  date: CalendarDate
): CalendarMonth => {
  const firstDay = {
    ...date,
    day: CALENDAR_DATE.FIRST_DAY,
  };
  const lastDay = getCalendarMonthEnd(firstDay);
  const start = getCalendarWeekStart(firstDay);
  const end = addCalendarDays(
    getCalendarWeekStart(lastDay),
    CALENDAR_DATE.DAYS_IN_WEEK - 1
  );
  return {
    year: date.year,
    month: date.month,
    days: buildCalendarDays(start, end),
  };
};
