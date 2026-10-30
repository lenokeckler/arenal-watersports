import type { NullableUndefined } from "@/app/types";
import type { CalendarDate } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";

export interface ReservationsCalendarProps {
  snapshot?: NullableUndefined<ReservationCalendarSnapshot>;
  today?: NullableUndefined<CalendarDate>;
}
