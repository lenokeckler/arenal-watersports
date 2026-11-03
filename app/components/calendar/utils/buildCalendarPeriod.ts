import {
  CALENDAR_DATE,
  CALENDAR_VIEW,
} from "@/app/constants";
import type {
  CalendarDate,
  CalendarPeriod,
  CalendarView,
} from "../models";
import {
  addCalendarDays,
  buildCalendarDays,
  getCalendarWeekStart,
  toCalendarUtcDate,
} from "./calendarDateArithmetic";
import {
  buildCalendarMonth,
  getCalendarMonthEnd,
} from "./buildCalendarMonth";

const buildCalendarYear = (
  date: CalendarDate
): CalendarPeriod => {
  const start = {
    year: date.year,
    month: CALENDAR_DATE.FIRST_MONTH,
    day: CALENDAR_DATE.FIRST_DAY,
  };
  const months = Array.from(
    { length: CALENDAR_DATE.MONTHS_IN_YEAR },
    (_, index) =>
      buildCalendarMonth({ ...start, month: index + 1 })
  );
  const end = getCalendarMonthEnd({
    ...start,
    month: CALENDAR_DATE.MONTHS_IN_YEAR,
  });
  return {
    view: CALENDAR_VIEW.YEAR,
    start,
    end,
    days: [],
    months,
  };
};

export const buildCalendarPeriod = (
  date: CalendarDate,
  view: CalendarView
): CalendarPeriod => {
  toCalendarUtcDate(date);
  let start = date;
  let end = date;
  if (view === CALENDAR_VIEW.WEEK) {
    start = getCalendarWeekStart(date);
    end = addCalendarDays(
      start,
      CALENDAR_DATE.DAYS_IN_WEEK - 1
    );
  }
  if (view === CALENDAR_VIEW.MONTH) {
    start = { ...date, day: CALENDAR_DATE.FIRST_DAY };
    end = getCalendarMonthEnd(start);
  }
  if (view === CALENDAR_VIEW.YEAR) {
    return buildCalendarYear(date);
  }
  const days =
    view === CALENDAR_VIEW.MONTH
      ? buildCalendarMonth(date).days
      : buildCalendarDays(start, end);
  return { view, start, end, days, months: [] };
};
