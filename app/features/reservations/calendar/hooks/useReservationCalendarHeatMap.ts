import { useMemo } from "react";
import { CALENDAR_HEAT_LEVEL } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";
import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarHeatMap } from "../models/ReservationCalendarHeatMap.interface";
import { buildReservationCalendarHeatMap } from "../utils/buildReservationCalendarHeatMap";

export const useReservationCalendarHeatMap = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>
): ReservationCalendarHeatMap =>
  useMemo(
    () =>
      snapshot === undefined
        ? {
            getDayReservationCount: () => undefined,
            getDayHeatLevel: () => CALENDAR_HEAT_LEVEL.NONE,
          }
        : buildReservationCalendarHeatMap(snapshot),
    [snapshot]
  );
