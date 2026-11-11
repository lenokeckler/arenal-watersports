import {
  CALENDAR_DATE,
  CALENDAR_VIEW,
} from "@/app/constants";
import type {
  CalendarDate,
  CalendarNavigation,
  CalendarView,
} from "../models";
import {
  addCalendarDays,
  toCalendarDate,
  toCalendarUtcDate,
} from "./calendarDateArithmetic";

export const navigateCalendarPeriod = (
  date: CalendarDate,
  view: CalendarView,
  direction: CalendarNavigation
): CalendarDate => {
  const utcDate = toCalendarUtcDate(date);
  if (view === CALENDAR_VIEW.DAY) {
    return addCalendarDays(date, direction);
  }
  if (view === CALENDAR_VIEW.WEEK) {
    return addCalendarDays(
      date,
      direction * CALENDAR_DATE.DAYS_IN_WEEK
    );
  }
  utcDate.setUTCDate(CALENDAR_DATE.FIRST_DAY);
  if (view === CALENDAR_VIEW.MONTH) {
    utcDate.setUTCMonth(utcDate.getUTCMonth() + direction);
  }
  if (view === CALENDAR_VIEW.YEAR) {
    utcDate.setUTCMonth(CALENDAR_DATE.FIRST_MONTH - 1);
    utcDate.setUTCFullYear(
      utcDate.getUTCFullYear() + direction
    );
  }
  return toCalendarDate(utcDate);
};
