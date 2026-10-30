import type { CalendarDate } from "@/app/types";
import type { OperationsCalendarProps } from "./OperationsCalendarProps.interface";

export interface OperationsCalendarViewProps extends OperationsCalendarProps {
  today: CalendarDate;
}
