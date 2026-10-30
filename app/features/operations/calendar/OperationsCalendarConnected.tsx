"use client";

import type { ReactElement } from "react";
import { OperationsCalendarView } from "./OperationsCalendarView";
import { OperationsCalendarRefreshStatus } from "./components/OperationsCalendarRefreshStatus";
import type { OperationsCalendarConnectedProps } from "./models/OperationsCalendarConnectedProps.interface";
import { useOperationsCalendarSnapshot } from "./hooks/useOperationsCalendarSnapshot";
import { useOperationsCalendarRealtime } from "./hooks/useOperationsCalendarRealtime";

export const OperationsCalendarConnected = ({
  initialSnapshot,
  today,
}: OperationsCalendarConnectedProps): ReactElement => {
  const calendar =
    useOperationsCalendarSnapshot(initialSnapshot);
  const hasConnectionError = useOperationsCalendarRealtime(
    calendar.onRetry
  );
  return (
    <>
      <OperationsCalendarView
        snapshot={calendar.snapshot}
        today={today}
        onPeriodChange={calendar.onPeriodChange}
      />
      <OperationsCalendarRefreshStatus
        hasRefreshError={
          calendar.hasRefreshError || hasConnectionError
        }
        onRetry={calendar.onRetry}
      />
    </>
  );
};
