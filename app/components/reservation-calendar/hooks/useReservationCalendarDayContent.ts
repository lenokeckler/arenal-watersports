import { createElement, useCallback } from "react";
import { CALENDAR_VIEW } from "@/app/constants";
import type { CalendarDate } from "@/app/types";
import { buildCalendarPeriod } from "@/app/components/calendar/utils";
import type { CalendarDayContent } from "@/app/components/calendar/models/CalendarDayContent.type";
import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import { ReservationCalendarBlock } from "../components/ReservationCalendarBlock";
import { buildReservationCalendarContent } from "../utils/buildReservationCalendarContent";

export const useReservationCalendarDayContent = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>
): CalendarDayContent =>
  useCallback(
    (date: CalendarDate) => {
      const period = buildCalendarPeriod(
        date,
        CALENDAR_VIEW.DAY
      );
      const content = buildReservationCalendarContent(
        snapshot,
        period
      );
      const group = content.groups[0];
      if (group === undefined) {
        return null;
      }
      return group.blocks.map((block) =>
        createElement(ReservationCalendarBlock, {
          block,
          key: block.id,
        })
      );
    },
    [snapshot]
  );
