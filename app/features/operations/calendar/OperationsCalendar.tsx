import type { ReactElement } from "react";
import { getCalendarToday } from "@/app/components/calendar/utils";
import type { OperationsCalendarProps } from "./models/OperationsCalendarProps.interface";
import { OperationsCalendarView } from "./OperationsCalendarView";

export const OperationsCalendar = ({
  snapshot,
}: OperationsCalendarProps): ReactElement => (
  <OperationsCalendarView
    snapshot={snapshot}
    today={getCalendarToday(new Date())}
  />
);
