import { EQUIPMENT_PERIOD } from "@/app/constants";
import { CALENDAR_MATH } from "@/app/constants/operations/CalendarMath.constants";
import type { MonthDay } from "./models/MonthDay.interface";

export const countLeadingBlanks = (month: string): number =>
  (new Date(
    `${month}${EQUIPMENT_PERIOD.FIRST_DAY_SUFFIX}${EQUIPMENT_PERIOD.NOON_SUFFIX}`
  ).getUTCDay() +
    CALENDAR_MATH.MONDAY_SHIFT) %
  CALENDAR_MATH.DAYS_PER_WEEK;

const countDays = (month: string): number => {
  const [year, number] = month.split("-").map(Number);

  return new Date(Date.UTC(year, number, 0)).getUTCDate();
};

export const buildMonthDays = (
  month: string,
  today: string
): MonthDay[] =>
  Array.from({ length: countDays(month) }, (_, index) => {
    const isoDate = `${month}-${(index + 1).toString().padStart(CALENDAR_MATH.DAY_DIGITS, "0")}`;

    return {
      day: index + 1,
      isFuture: isoDate > today,
      isToday: isoDate === today,
      isoDate,
    };
  });
