import type { CalendarDate } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";

export interface OperationsCalendarConnectedProps {
  initialSnapshot: ReservationCalendarSnapshot;
  today: CalendarDate;
}
