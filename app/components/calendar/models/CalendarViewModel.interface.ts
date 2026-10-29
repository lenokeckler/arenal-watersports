import type { NullableRef } from "@/app/types";
import type { CalendarView } from "./index";
import type { CalendarCell } from "./CalendarCell.interface";
import type { CalendarMonthProps } from "./CalendarMonthProps.interface";
import type { CalendarToolbarProps } from "./CalendarToolbarProps.interface";

export interface CalendarViewModel {
  hasAccess: boolean;
  daysClassName: string;
  selectedView: CalendarView;
  preferenceError: NullableRef<string>;
  toolbar: CalendarToolbarProps;
  days: CalendarCell[];
  months: CalendarMonthProps[];
}
