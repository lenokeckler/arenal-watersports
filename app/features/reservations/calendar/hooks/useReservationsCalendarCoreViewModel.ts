import type { NullableUndefined } from "@/app/types";
import type { CalendarDate } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationsCalendarCoreViewModel } from "../models/ReservationsCalendarCoreViewModel.interface";
import { useReservationCalendarDayContent } from "@/app/components/reservation-calendar/hooks/useReservationCalendarDayContent";
import { useReservationCalendarSnapshot } from "./useReservationCalendarSnapshot";
import { useReservationCalendarSelection } from "./useReservationCalendarSelection";
import { renderReservationCalendarBlockActions } from "../utils/renderReservationCalendarBlockActions";

export const useReservationsCalendarCoreViewModel = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>,
  today: CalendarDate
): ReservationsCalendarCoreViewModel => {
  const snapshotState = useReservationCalendarSnapshot(
    snapshot ?? null
  );
  const dayContent = useReservationCalendarDayContent(
    snapshotState.snapshot ?? undefined,
    {
      enableDetailLinks: true,
      renderBlockActions:
        renderReservationCalendarBlockActions,
      reserveMobileFabSpace: true,
    }
  );
  const calendarSelection = useReservationCalendarSelection(
    snapshotState.snapshot ?? undefined,
    today
  );
  return { calendarSelection, dayContent, snapshotState };
};
