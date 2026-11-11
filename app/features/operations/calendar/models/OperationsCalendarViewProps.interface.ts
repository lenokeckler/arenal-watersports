import type { CalendarDate } from "@/app/types";
import type { CalendarPeriodChangeHandler } from "@/app/components/calendar/models/CalendarPeriodChangeHandler.type";
import type { OperationsCalendarProps } from "./OperationsCalendarProps.interface";

export interface OperationsCalendarViewProps extends OperationsCalendarProps {
  onPeriodChange?: CalendarPeriodChangeHandler;
  today: CalendarDate;
}
