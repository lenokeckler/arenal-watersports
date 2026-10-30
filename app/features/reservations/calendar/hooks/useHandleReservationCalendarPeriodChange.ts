import { useCallback } from "react";
import type { CalendarPeriodChangeHandler } from "@/app/components/calendar/models/CalendarPeriodChangeHandler.type";
import type { ReservationCalendarPeriodSelectionHandlerDependencies } from "../models/ReservationCalendarPeriodSelectionHandlerDependencies.interface";
import { handleReservationCalendarPeriodChange } from "../utils/handleReservationCalendarPeriodChange";

export const useHandleReservationCalendarPeriodChange = ({
  refreshController,
  selectionTracker,
  setState,
  snapshot,
}: ReservationCalendarPeriodSelectionHandlerDependencies): CalendarPeriodChangeHandler =>
  useCallback(
    (period) =>
      handleReservationCalendarPeriodChange({
        period,
        refreshController,
        selectionTracker,
        setState,
        snapshot,
      }),
    [
      refreshController,
      selectionTracker,
      setState,
      snapshot,
    ]
  );
