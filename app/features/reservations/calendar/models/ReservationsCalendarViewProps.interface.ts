import type { CalendarDate } from "@/app/types";
import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "./ReservationCalendarSnapshot.interface";

export interface ReservationsCalendarViewProps {
  snapshot?: NullableUndefined<ReservationCalendarSnapshot>;
  today: CalendarDate;
}
