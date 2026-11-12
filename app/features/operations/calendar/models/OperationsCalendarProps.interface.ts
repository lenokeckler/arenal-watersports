import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";

export interface OperationsCalendarProps {
  snapshot: NullableUndefined<ReservationCalendarSnapshot>;
}
