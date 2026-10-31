"use client";

import type { ReactElement } from "react";
import {
  CALENDAR_ALLOWED_VIEWS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import { CalendarView } from "@/app/components/calendar/CalendarView";
import type { ReservationsCalendarViewProps } from "./models/ReservationsCalendarViewProps.interface";
import { useReservationsCalendarViewModel } from "./hooks/useReservationsCalendarViewModel";
import { ReservationsCalendarRefreshStatus } from "./components/ReservationsCalendarRefreshStatus";
import { ReservationCalendarCreateLink } from "./components/ReservationCalendarCreateLink";

export const ReservationsCalendarView = ({
  snapshot,
  today,
}: ReservationsCalendarViewProps): ReactElement => {
  const calendar =
    useReservationsCalendarViewModel(snapshot);
  return (
    <>
      <ReservationCalendarCreateLink />
      <CalendarView
        heading={RESERVATIONS_CALENDAR_COPY.TITLE}
        today={today}
        allowedViews={CALENDAR_ALLOWED_VIEWS.RESERVATIONS}
        dayContent={calendar.dayContent}
        onPeriodChange={calendar.onPeriodChange}
        periodContent={calendar.periodContent}
      />
      <ReservationsCalendarRefreshStatus
        hasRefreshError={calendar.hasRefreshError}
        isRefreshing={calendar.isRefreshing}
        onRetry={calendar.onRetry}
      />
    </>
  );
};
