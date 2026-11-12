import type { CalendarDate } from "@/app/types";
import type { NullableUndefined } from "@/app/types";
import type { CalendarHeatLevel } from "../constants/CalendarHeatLevel.constants";

export interface CalendarDateSelection {
  getCount: (
    date: CalendarDate
  ) => NullableUndefined<number>;
  getAccessibleLabel: (
    dateLabel: string,
    count: number
  ) => string;
  getHeatLevel: (date: CalendarDate) => CalendarHeatLevel;
  onSelect: (date: CalendarDate) => void;
  selectedDate?: CalendarDate;
}
