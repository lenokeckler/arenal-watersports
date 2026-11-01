import type { CalendarDate } from "@/app/types";
import type { NullableUndefined } from "@/app/types";

export const isSameCalendarDate = (
  firstDate: NullableUndefined<CalendarDate>,
  secondDate: CalendarDate
): boolean =>
  firstDate !== undefined &&
  firstDate.year === secondDate.year &&
  firstDate.month === secondDate.month &&
  firstDate.day === secondDate.day;
