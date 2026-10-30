import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarRefreshDependencies } from "./ReservationCalendarRefreshDependencies.interface";
import type { ReservationCalendarRefreshController } from "./ReservationCalendarRefreshController.interface";
import type { ReservationCalendarSelectionTracker } from "./ReservationCalendarSelectionTracker.interface";

export interface ReservationCalendarPeriodSelectionHandlerDependencies extends ReservationCalendarRefreshDependencies {
  refreshController: ReservationCalendarRefreshController;
  selectionTracker: ReservationCalendarSelectionTracker;
  snapshot: NullableRef<ReservationCalendarSnapshot>;
}
