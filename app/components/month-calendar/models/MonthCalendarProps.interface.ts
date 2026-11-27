import type { NullableRef } from "@/app/types";
import type { CalendarMark } from "./CalendarMark.type";
import type { MonthCalendarDay } from "./MonthCalendarDay.interface";

export interface MonthCalendarProps {
  days: MonthCalendarDay[];
  label: string;
  legend: CalendarMark[];
  month: string;
  nextHref: NullableRef<string>;
  previousHref: NullableRef<string>;
}
