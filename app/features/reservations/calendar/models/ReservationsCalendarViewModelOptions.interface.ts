import type { CalendarDate } from "@/app/types";
import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarPageSize } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSize.type";

export interface ReservationsCalendarViewModelOptions {
  initialPageSize?: NullableUndefined<ReservationCalendarPageSize>;
  pageSizeReadError?: boolean;
  snapshot: NullableUndefined<ReservationCalendarSnapshot>;
  today: CalendarDate;
}
