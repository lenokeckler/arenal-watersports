import type { NullableRef } from "@/app/types";
import type { CalendarView } from "@/app/types";
import type { CalendarCell } from "./CalendarCell.interface";
import type { CalendarMonthProps } from "./CalendarMonthProps.interface";
import type { CalendarToolbarProps } from "./CalendarToolbarProps.interface";
import type { CalendarPeriod } from "./CalendarPeriod.interface";

export interface CalendarViewModel {
  hasAccess: boolean;
  daysClassName: string;
  selectedView: CalendarView;
  preferenceError: NullableRef<string>;
  toolbar: CalendarToolbarProps;
  period: CalendarPeriod;
  days: CalendarCell[];
  months: CalendarMonthProps[];
}
