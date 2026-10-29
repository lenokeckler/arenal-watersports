import { createElement, useCallback } from "react";
import type { CalendarPeriodContent } from "@/app/components/calendar/models/CalendarPeriodContent.type";
import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import { ReservationCalendarGroups } from "../components/ReservationCalendarGroups";
import { buildReservationCalendarContent } from "../utils/buildReservationCalendarContent";
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
