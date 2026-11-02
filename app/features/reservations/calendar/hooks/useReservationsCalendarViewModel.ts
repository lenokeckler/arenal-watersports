import type { NullableUndefined } from "@/app/types";
import type { CalendarDate } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationsCalendarViewModel } from "../models/ReservationsCalendarViewModel.interface";
import { useReservationCalendarDayContent } from "@/app/components/reservation-calendar/hooks/useReservationCalendarDayContent";
import { useReservationCalendarPeriodContent } from "./useReservationCalendarPeriodContent";
import { useReservationCalendarSnapshot } from "./useReservationCalendarSnapshot";
import { useReservationCalendarSelection } from "./useReservationCalendarSelection";

export const useReservationsCalendarViewModel = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>,
  today: CalendarDate
): ReservationsCalendarViewModel => {
  const snapshotState = useReservationCalendarSnapshot(
    snapshot ?? null
  );
  const dayContent = useReservationCalendarDayContent(
    snapshotState.snapshot ?? undefined,
    { reserveMobileFabSpace: true }
  );
  const calendarSelection = useReservationCalendarSelection(
    snapshotState.snapshot ?? undefined,
    today
  );
  const periodContent = useReservationCalendarPeriodContent(
    snapshotState.snapshot ?? undefined,
    calendarSelection
  );
  return {
    dayContent,
    hasRefreshError: snapshotState.hasRefreshError,
    isRefreshing: snapshotState.isRefreshing,
    onPeriodChange: snapshotState.onPeriodChange,
    onRetry: snapshotState.onRetry,
    periodContent,
    snapshot: snapshotState.snapshot,
    selection: calendarSelection.selection,
  };
};
