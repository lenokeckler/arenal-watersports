import { createElement } from "react";
import { CALENDAR_VIEW } from "@/app/constants";
import type {
  CalendarDate,
  CalendarView,
  NullableUndefined,
} from "@/app/types";
import { buildCalendarPeriod } from "@/app/components/calendar/utils";
import type { CalendarDayContent } from "@/app/components/calendar/models/CalendarDayContent.type";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarDayContentOptions } from "../models/ReservationCalendarDayContentOptions.interface";
import { ReservationCalendarBlock } from "../components/ReservationCalendarBlock";
import { buildReservationCalendarContent } from "./buildReservationCalendarContent";
import { getReservationCalendarMessages } from "./getReservationCalendarMessages";
import { ReservationCalendarDayContent } from "../components/ReservationCalendarDayContent";

export const buildReservationCalendarDayContent = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>,
  options: ReservationCalendarDayContentOptions,
  selectedView: CalendarView,
  date: CalendarDate
): ReturnType<CalendarDayContent> => {
  const period = buildCalendarPeriod(
    date,
    CALENDAR_VIEW.DAY
  );
  const content = buildReservationCalendarContent(
    snapshot,
    period
  );
  const group = content.groups[0];
  const showEquipmentImage =
    selectedView !== CALENDAR_VIEW.WEEK;
  if (options.showCoverageMessages === true) {
    return createElement(ReservationCalendarDayContent, {
      blocks: group?.blocks ?? [],
      messages: getReservationCalendarMessages(content),
      reserveMobileFabSpace:
        options.reserveMobileFabSpace === true,
      showEquipmentImage,
      showGuides: options.showGuides === true,
    });
  }
  if (group === undefined) {
    return null;
  }
  return group.blocks.map((block) =>
    createElement(ReservationCalendarBlock, {
      actions: options.renderBlockActions?.(block),
      block,
      reserveMobileFabSpace:
        options.reserveMobileFabSpace === true,
      showEquipmentImage,
      showGuides: options.showGuides === true,
      key: block.id,
    })
  );
};
