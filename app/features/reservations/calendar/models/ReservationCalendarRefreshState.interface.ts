import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";

export interface ReservationCalendarRefreshState {
  hasRefreshError: boolean;
  isRefreshing: boolean;
  snapshot: NullableRef<ReservationCalendarSnapshot>;
}
