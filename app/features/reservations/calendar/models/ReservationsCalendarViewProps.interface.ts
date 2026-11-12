import type { CalendarDate } from "@/app/types";
import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";

export interface ReservationsCalendarViewProps {
  canRegisterExternalGuide?: boolean;
  snapshot?: NullableUndefined<ReservationCalendarSnapshot>;
  today: CalendarDate;
}
