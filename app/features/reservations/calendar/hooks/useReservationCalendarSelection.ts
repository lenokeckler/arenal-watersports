import { useMemo } from "react";
import type { CalendarDate } from "@/app/types";
import type { NullableUndefined } from "@/app/types";
import { RESERVATIONS_CALENDAR_COPY } from "@/app/constants";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationsCalendarSelection } from "../models/ReservationsCalendarSelection.interface";
import { useReservationsCalendarSelectionState } from "./useReservationsCalendarSelectionState";
import { useReservationCalendarHeatMap } from "./useReservationCalendarHeatMap";

export const useReservationCalendarSelection = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>,
  today: CalendarDate
): ReservationsCalendarSelection => {
  const state =
    useReservationsCalendarSelectionState(today);
  const heatMap = useReservationCalendarHeatMap(snapshot);
  const day = useMemo(
    () => ({
      getCount: heatMap.getDayReservationCount,
      getAccessibleLabel: (
        dateLabel: string,
        count: number
      ) =>
        `${dateLabel}${RESERVATIONS_CALENDAR_COPY.RESERVATION_COUNT_SEPARATOR}${RESERVATIONS_CALENDAR_COPY.RESERVATION_COUNT_LABEL(count)}`,
      getHeatLevel: heatMap.getDayHeatLevel,
      onSelect: state.selectDay,
      selectedDate: state.selectedDay,
    }),
    [
      heatMap.getDayReservationCount,
      heatMap.getDayHeatLevel,
      state.selectDay,
      state.selectedDay,
    ]
  );
  const month = useMemo(
    () => ({
      onSelect: state.selectMonth,
      selectedDate: state.selectedMonth,
    }),
    [state.selectMonth, state.selectedMonth]
  );
  const selection = useMemo(
    () => ({ day, month }),
    [day, month]
  );
  return {
    selection,
    selectedDay: state.selectedDay,
    selectedMonth: state.selectedMonth,
  };
};
