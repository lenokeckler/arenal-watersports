"use client";

import type { ReactElement } from "react";
import {
  CALENDAR_ALLOWED_VIEWS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import { CalendarView } from "@/app/components/calendar/CalendarView";
import type { ReservationsCalendarViewProps } from "./models/ReservationsCalendarViewProps.interface";
import { useReservationsCalendarViewModel } from "./hooks/useReservationsCalendarViewModel";

export const ReservationsCalendarView = ({
  snapshot,
  today,
}: ReservationsCalendarViewProps): ReactElement => {
  const calendar =
    useReservationsCalendarViewModel(snapshot);
  return (
    <CalendarView
      heading={RESERVATIONS_CALENDAR_COPY.TITLE}
      today={today}
      allowedViews={CALENDAR_ALLOWED_VIEWS.RESERVATIONS}
      dayContent={calendar.dayContent}
      periodContent={calendar.periodContent}
    />
  );
};
