import type { ReactElement } from "react";
import {
  CALENDAR_ALLOWED_VIEWS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import { CalendarView } from "@/app/components/calendar/CalendarView";
import { getCalendarToday } from "@/app/components/calendar/utils";

export const ReservationsCalendar = (): ReactElement => (
  <CalendarView
    heading={RESERVATIONS_CALENDAR_COPY.TITLE}
    today={getCalendarToday(new Date())}
    allowedViews={CALENDAR_ALLOWED_VIEWS.RESERVATIONS}
  />
);
