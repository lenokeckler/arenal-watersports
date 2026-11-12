import type { NullableRef } from "@/app/types";
import type { CalendarPeriodChangeHandler } from "@/app/components/calendar/models/CalendarPeriodChangeHandler.type";
import type { ReservationCalendarSnapshot } from "./ReservationCalendarSnapshot.interface";

export interface CalendarSnapshotState<
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
> {
  snapshot: Snapshot | ReservationCalendarSnapshot;
  hasRefreshError: boolean;
  refreshError: NullableRef<Error>;
  isRefreshing: boolean;
  onPeriodChange: CalendarPeriodChangeHandler;
  onRetry: () => Promise<void>;
}
