import type { NullableRef } from "@/app/types";
import type { CalendarPeriod } from "@/app/components/calendar/models";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { buildReservationCalendarContent } from "@/app/components/reservation-calendar/utils/buildReservationCalendarContent";

export const isReservationCalendarSnapshotCompleteForPeriod =
  (
    snapshot: NullableRef<ReservationCalendarSnapshot>,
    period: CalendarPeriod
  ): boolean => {
    if (snapshot === null) {
      return false;
    }
    const content = buildReservationCalendarContent(
      snapshot,
      period
    );
    return content.coversPeriod && content.hasAllResults;
  };
