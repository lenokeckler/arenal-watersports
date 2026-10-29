import {
  CALENDAR_DATE_ERROR,
  STRING,
} from "@/app/constants";
import { yearMonthDayInCR } from "@/app/utils/generators/dateConversion";
import type { CalendarDate } from "../models";
import { toCalendarUtcDate } from "./calendarDateArithmetic";

export const getCalendarToday = (
  serverInstant: Date
): CalendarDate => {
  if (!Number.isFinite(serverInstant.getTime())) {
    throw new RangeError(
      CALENDAR_DATE_ERROR.INVALID_INSTANT
    );
  }
  const [year, month, day] = yearMonthDayInCR(serverInstant)
    .split(STRING.DASH)
    .map(Number);
  const date = { year, month, day };
  toCalendarUtcDate(date);
  return date;
};
