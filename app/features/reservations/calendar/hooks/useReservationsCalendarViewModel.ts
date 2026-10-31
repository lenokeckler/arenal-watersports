import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationsCalendarViewModel } from "../models/ReservationsCalendarViewModel.interface";
import { useReservationCalendarDayContent } from "@/app/components/reservation-calendar/hooks/useReservationCalendarDayContent";
import { useReservationCalendarPeriodContent } from "./useReservationCalendarPeriodContent";
import { useReservationCalendarSnapshot } from "./useReservationCalendarSnapshot";

export const useReservationsCalendarViewModel = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>
): ReservationsCalendarViewModel => {
  const snapshotState = useReservationCalendarSnapshot(
    snapshot ?? null
  );
  const dayContent = useReservationCalendarDayContent(
    snapshotState.snapshot ?? undefined,
    { reserveMobileFabSpace: true }
  );
  const periodContent = useReservationCalendarPeriodContent(
    snapshotState.snapshot ?? undefined
  );
  return {
    dayContent,
    hasRefreshError: snapshotState.hasRefreshError,
    isRefreshing: snapshotState.isRefreshing,
    onPeriodChange: snapshotState.onPeriodChange,
    onRetry: snapshotState.onRetry,
    periodContent,
    snapshot: snapshotState.snapshot,
  };
};
