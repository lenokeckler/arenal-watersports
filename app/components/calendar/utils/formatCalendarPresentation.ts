import {
  CALENDAR_PRESENTATION,
  CALENDAR_VIEW,
} from "@/app/constants";
import type {
  CalendarDate,
  CalendarPeriod,
} from "../models";
import type { CalendarCell } from "../models/CalendarCell.interface";
import { toCalendarUtcDate } from "./calendarDateArithmetic";
import { resolveCalendarCellClass } from "../styles/Calendar.styles";

export const formatCalendarDate = (
  date: CalendarDate,
  monthOnly = false
): string =>
  new Intl.DateTimeFormat(CALENDAR_PRESENTATION.LOCALE, {
    ...(monthOnly
      ? CALENDAR_PRESENTATION.MONTH_OPTIONS
      : CALENDAR_PRESENTATION.DATE_OPTIONS),
    timeZone: CALENDAR_PRESENTATION.TIME_ZONE,
  }).format(toCalendarUtcDate(date));

export const getCalendarPeriodTitle = (
  period: CalendarPeriod
): string => {
  if (period.view === CALENDAR_VIEW.YEAR) {
    return period.start.year.toString();
  }
  if (period.view === CALENDAR_VIEW.WEEK) {
    return `${formatCalendarDate(period.start)}${CALENDAR_PRESENTATION.PERIOD_SEPARATOR}${formatCalendarDate(period.end)}`;
  }
  return formatCalendarDate(
    period.start,
    period.view === CALENDAR_VIEW.MONTH
  );
};

export const buildCalendarCells = (
  days: CalendarDate[],
  today: CalendarDate,
  month: number
): CalendarCell[] =>
  days.map((date) => {
    const isToday =
      date.year === today.year &&
      date.month === today.month &&
      date.day === today.day;
    return {
      date,
      key: toCalendarUtcDate(date).toISOString(),
      label: date.day.toString(),
      fullLabel: formatCalendarDate(date),
      current: isToday
        ? CALENDAR_PRESENTATION.CURRENT_DATE
        : null,
      className: resolveCalendarCellClass(
        isToday,
        date.month !== month
      ),
    };
  });
