import type { CalendarCell } from "./CalendarCell.interface";
import type { CalendarDate } from "@/app/types";
import type { CalendarDateSelection } from "./CalendarDateSelection.interface";
import type { CalendarMonthSelection } from "./CalendarMonthSelection.interface";

export interface CalendarMonthProps {
  date: CalendarDate;
  title: string;
  showTitle?: boolean;
  cells: CalendarCell[];
  daySelection?: CalendarDateSelection;
  monthSelection?: CalendarMonthSelection;
}
