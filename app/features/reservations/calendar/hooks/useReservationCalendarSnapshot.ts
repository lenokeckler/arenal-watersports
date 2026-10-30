import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarSnapshotState } from "../models/ReservationCalendarSnapshotState.interface";
import { useReservationCalendarSnapshotRefresh } from "./useReservationCalendarSnapshotRefresh";
import { useReservationsCalendarRealtime } from "./useReservationsCalendarRealtime";

export const useReservationCalendarSnapshot = (
  initialSnapshot: NullableRef<ReservationCalendarSnapshot>
): ReservationCalendarSnapshotState => {
  const snapshotState =
    useReservationCalendarSnapshotRefresh(initialSnapshot);
  useReservationsCalendarRealtime(snapshotState.onRetry);
  return snapshotState;
};
