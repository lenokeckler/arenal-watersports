import { CALENDAR_MATH } from "@/app/constants/operations/CalendarMath.constants";

export const shiftMonthKey = (
  key: string,
  offset: number
): string => {
  const [year, month] = key.split("-").map(Number);
  const { MONTHS_PER_YEAR, MONTH_DIGITS } = CALENDAR_MATH;
  const index =
    year * MONTHS_PER_YEAR + (month - 1) + offset;
  const nextMonth = (index % MONTHS_PER_YEAR) + 1;

  return `${Math.floor(index / MONTHS_PER_YEAR)}-${nextMonth.toString().padStart(MONTH_DIGITS, "0")}`;
};

export const listRecentMonths = (
  currentKey: string,
  count: number
): string[] =>
  Array.from({ length: count }, (_, index) =>
    shiftMonthKey(currentKey, index - count + 1)
  );
