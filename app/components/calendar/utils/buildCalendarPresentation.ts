import { CALENDAR_DATE } from "@/app/constants";
import type { CalendarPresentation } from "../models/CalendarPresentation.type";
import type {
  CalendarDate,
  CalendarPeriod,
} from "../models";
import {
  buildCalendarCells,
  formatCalendarDate,
} from "./formatCalendarPresentation";

export const buildCalendarPresentation = (
  period: CalendarPeriod,
  today: CalendarDate
): CalendarPresentation => ({
  period,
  days: buildCalendarCells(
    period.days,
    today,
    period.start.month
  ),
  months: period.months.map((month) => ({
    title: formatCalendarDate(
      { ...month, day: CALENDAR_DATE.FIRST_DAY },
      true
    ),
    date: {
      day: CALENDAR_DATE.FIRST_DAY,
      month: month.month,
      year: month.year,
    },
    cells: buildCalendarCells(
      month.days,
      today,
      month.month
    ),
  })),
});
