import { useCallback } from "react";
import type { CalendarDate } from "@/app/types";
import { calendarActions } from "@/app/store";
import { useAppDispatch } from "@/app/store/hooks";

export const useReservationsCalendarSelectionActions = (
  displayedAnchor: CalendarDate,
  setSelectedDay: (date: CalendarDate | undefined) => void,
  setSelectedMonth: (date: CalendarDate | undefined) => void
) => {
  const dispatch = useAppDispatch();
  const selectDay = useCallback(
    (date: CalendarDate): void => {
      setSelectedDay(date);
      setSelectedMonth(undefined);
      if (
        date.year !== displayedAnchor.year ||
        date.month !== displayedAnchor.month
      ) {
        dispatch(calendarActions.setAnchor(date));
      }
    },
    [
      dispatch,
      displayedAnchor,
      setSelectedDay,
      setSelectedMonth,
    ]
  );
  const selectMonth = useCallback(
    (date: CalendarDate): void => {
      setSelectedDay(undefined);
      setSelectedMonth(date);
    },
    [setSelectedDay, setSelectedMonth]
  );
  return { selectDay, selectMonth };
};
