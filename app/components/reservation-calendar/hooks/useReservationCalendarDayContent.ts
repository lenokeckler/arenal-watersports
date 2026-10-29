import { createElement, useCallback } from "react";
import { CALENDAR_VIEW } from "@/app/constants";
import type { CalendarDate } from "@/app/types";
import { buildCalendarPeriod } from "@/app/components/calendar/utils";
import type { CalendarDayContent } from "@/app/components/calendar/models/CalendarDayContent.type";
import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarDayContentOptions } from "../models/ReservationCalendarDayContentOptions.interface";
import { ReservationCalendarBlock } from "../components/ReservationCalendarBlock";
import { buildReservationCalendarContent } from "../utils/buildReservationCalendarContent";
import { getReservationCalendarMessages } from "../utils/getReservationCalendarMessages";
import { ReservationCalendarDayContent } from "../components/ReservationCalendarDayContent";

export const useReservationCalendarDayContent = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>,
  options: ReservationCalendarDayContentOptions = {}
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
      if (options.showCoverageMessages === true) {
        return createElement(
          ReservationCalendarDayContent,
          {
            blocks: group?.blocks ?? [],
            messages:
              getReservationCalendarMessages(content),
            showGuides: options.showGuides === true,
          }
        );
      }
      if (group === undefined) {
        return null;
      }
      return group.blocks.map((block) =>
        createElement(ReservationCalendarBlock, {
          block,
          showGuides: options.showGuides === true,
          key: block.id,
        })
      );
    },
    [
      snapshot,
      options.showCoverageMessages,
      options.showGuides,
    ]
  );
