import { useCallback, useEffect, useRef } from "react";
import type { CalendarPeriodChangeHandler } from "@/app/components/calendar/models/CalendarPeriodChangeHandler.type";

export const useReservationCalendarPeriodChangeHandler = (
  onPeriodChange: CalendarPeriodChangeHandler,
  resetPage: () => void
): CalendarPeriodChangeHandler => {
  const onPeriodChangeRef = useRef(onPeriodChange);
  useEffect(() => {
    onPeriodChangeRef.current = onPeriodChange;
  }, [onPeriodChange]);
  return useCallback(
    (period) => {
      resetPage();
      onPeriodChangeRef.current(period);
    },
    [resetPage]
  );
};
