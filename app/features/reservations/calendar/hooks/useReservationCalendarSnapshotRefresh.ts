import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { useCalendarSnapshot } from "@/app/components/reservation-calendar/hooks/useCalendarSnapshot";
import { readReservationCalendarPeriod } from "../actions/readReservationCalendarPeriod";

export const useReservationCalendarSnapshotRefresh = (
  initialSnapshot: NullableRef<ReservationCalendarSnapshot>
) =>
  useCalendarSnapshot(
    initialSnapshot,
    readReservationCalendarPeriod
  );
