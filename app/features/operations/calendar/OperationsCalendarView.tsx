"use client";

import type { ReactElement } from "react";
import { OPERATIONS_CALENDAR_COPY } from "@/app/constants";
import { CalendarView } from "@/app/components/calendar/CalendarView";
import type { OperationsCalendarViewProps } from "./models/OperationsCalendarViewProps.interface";
import { useOperationsCalendarViewModel } from "./hooks/useOperationsCalendarViewModel";

export const OperationsCalendarView = (
  props: OperationsCalendarViewProps
): ReactElement => {
  const calendar = useOperationsCalendarViewModel(props);
  return (
    <CalendarView
      heading={OPERATIONS_CALENDAR_COPY.TITLE}
      today={props.today}
      onPeriodChange={props.onPeriodChange}
      {...calendar}
    />
  );
};
