import type { CalendarCell } from "./CalendarCell.interface";

export interface CalendarMonthProps {
  title: string;
  showTitle?: boolean;
  cells: CalendarCell[];
}
