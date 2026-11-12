import type { ReactElement } from "react";
import type { ReservationsCalendarProps } from "./models/ReservationsCalendarProps.interface";
import { getCalendarToday } from "@/app/components/calendar/utils";
import { ReservationsCalendarView } from "./ReservationsCalendarView";

export const ReservationsCalendar = ({
  canRegisterExternalGuide,
  snapshot,
  today,
}: ReservationsCalendarProps): ReactElement => (
  <ReservationsCalendarView
    canRegisterExternalGuide={canRegisterExternalGuide}
    snapshot={snapshot}
    today={today ?? getCalendarToday(new Date())}
  />
);
