import type { CalendarDate } from "@/app/types";
import type { CalendarMonthSelection } from "./CalendarMonthSelection.interface";

export interface CalendarMonthTitleProps {
  date: CalendarDate;
  monthSelection?: CalendarMonthSelection;
  title: string;
}
