import { useCallback } from "react";
import type { CalendarDate } from "@/app/types";
import type { CalendarDayContent } from "@/app/components/calendar/models/CalendarDayContent.type";
import type { NullableUndefined } from "@/app/types";
import { useAppSelector } from "@/app/store/hooks";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarDayContentOptions } from "../models/ReservationCalendarDayContentOptions.interface";
import { buildReservationCalendarDayContent } from "../utils/buildReservationCalendarDayContent";

export const useReservationCalendarDayContent = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>,
  options: ReservationCalendarDayContentOptions = {}
): CalendarDayContent => {
  const enableDetailLinks =
    options.enableDetailLinks === true;
  const { renderBlockActions } = options;
  const reserveMobileFabSpace =
    options.reserveMobileFabSpace === true;
  const showCoverageMessages =
    options.showCoverageMessages === true;
  const showGuides = options.showGuides === true;
  const selectedView = useAppSelector(
    (state) => state.calendar.selectedView
  );
  return useCallback(
    (date: CalendarDate) =>
      buildReservationCalendarDayContent(
        snapshot,
        {
          enableDetailLinks,
          renderBlockActions,
          reserveMobileFabSpace,
          showCoverageMessages,
          showGuides,
        },
        selectedView,
        date
      ),
    [
      snapshot,
      enableDetailLinks,
      selectedView,
      renderBlockActions,
      reserveMobileFabSpace,
      showCoverageMessages,
      showGuides,
    ]
  );
};
