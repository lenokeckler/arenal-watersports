import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { CalendarPeriodChangeHandler } from "@/app/components/calendar/models/CalendarPeriodChangeHandler.type";

export interface ReservationCalendarSnapshotState {
  hasRefreshError: boolean;
  isRefreshing: boolean;
  onPeriodChange: CalendarPeriodChangeHandler;
  onRetry: () => void;
  snapshot: NullableRef<ReservationCalendarSnapshot>;
}
