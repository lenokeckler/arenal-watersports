import { createElement, useCallback } from "react";
import type { CalendarPeriodContent } from "@/app/components/calendar/models/CalendarPeriodContent.type";
import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { ReservationCalendarGroups } from "../components/ReservationCalendarGroups";
import { buildReservationCalendarContent } from "@/app/components/reservation-calendar/utils/buildReservationCalendarContent";
import { getReservationCalendarMessages } from "../utils/getReservationCalendarMessages";

export const useReservationCalendarPeriodContent = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>
): CalendarPeriodContent =>
  useCallback(
    (period) => {
      const content = buildReservationCalendarContent(
        snapshot,
        period
      );
      return createElement(ReservationCalendarGroups, {
        content,
        messages: getReservationCalendarMessages(content),
        period,
      });
    },
    [snapshot]
  );
