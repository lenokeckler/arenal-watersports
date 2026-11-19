import type { NullableUndefined } from "@/app/types";
import type { CalendarDate } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarPageSize } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSize.type";

export interface ReservationsCalendarProps {
  canRegisterExternalGuide?: boolean;
  snapshot?: NullableUndefined<ReservationCalendarSnapshot>;
  today?: NullableUndefined<CalendarDate>;
  initialPageSize?: NullableUndefined<ReservationCalendarPageSize>;
  pageSizeReadError?: boolean;
}
