import type { CalendarCell } from "./CalendarCell.interface";
import type { CalendarDayContent } from "./CalendarDayContent.type";

export interface CalendarDaysProps {
  cells: CalendarCell[];
  className: string;
  dayContent?: CalendarDayContent;
}
