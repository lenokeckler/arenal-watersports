import { EQUIPMENT_PERIOD } from "@/app/constants";
import { CALENDAR_MATH } from "@/app/constants/operations/CalendarMath.constants";
import type { NullableRef } from "@/app/types";
import { shiftMonthKey } from "./listRecentMonths";

export const listCalendarMonths = (
  recentMonths: string[],
  firstRecordDate: NullableRef<string>
): string[] => {
  const firstRecordMonth = firstRecordDate?.slice(
    0,
    EQUIPMENT_PERIOD.MONTH_KEY_LENGTH
  );
  const months = [...recentMonths];

  while (
    firstRecordMonth &&
    months[0] > firstRecordMonth &&
    months.length < CALENDAR_MATH.MAX_CALENDAR_MONTHS
  ) {
    months.unshift(shiftMonthKey(months[0], -1));
  }

  return months;
};
