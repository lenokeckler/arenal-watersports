import type { CalendarCell } from "./CalendarCell.interface";
import type { CalendarDateSelection } from "./CalendarDateSelection.interface";
import type { CalendarMonthSelection } from "./CalendarMonthSelection.interface";
import type { CalendarDate } from "@/app/types";

export interface CalendarMonthCellProps {
  cell: CalendarCell;
  date: CalendarDate;
  daySelection?: CalendarDateSelection;
  monthSelection?: CalendarMonthSelection;
}
