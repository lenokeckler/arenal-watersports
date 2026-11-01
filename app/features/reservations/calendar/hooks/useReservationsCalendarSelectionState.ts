import { useState } from "react";
import type { CalendarDate } from "@/app/types";
import type { NullableUndefined } from "@/app/types";
import { RESERVATIONS_CALENDAR_COPY } from "@/app/constants";
import { useAppSelector } from "@/app/store/hooks";
import type { ReservationsCalendarSelectionState } from "../models/ReservationsCalendarSelectionState.interface";
import { useScrollToSelectedAgenda } from "./useScrollToSelectedAgenda";
import { useReservationsCalendarSelectionActions } from "./useReservationsCalendarSelectionActions";

const getSelectedAgendaId = (
  selectedDay: NullableUndefined<CalendarDate>,
  selectedMonth: NullableUndefined<CalendarDate>
): NullableUndefined<string> => {
  if (selectedDay !== undefined) {
    return RESERVATIONS_CALENDAR_COPY.SELECTED_DAY_AGENDA_ID;
  }
  if (selectedMonth !== undefined) {
    return RESERVATIONS_CALENDAR_COPY.SELECTED_MONTH_AGENDA_ID;
  }
  return undefined;
};

export const useReservationsCalendarSelectionState = (
  today: CalendarDate
): ReservationsCalendarSelectionState => {
  const anchor = useAppSelector(
    (state) => state.calendar.anchor
  );
  const displayedAnchor = anchor ?? today;
  const [selectedDay, setSelectedDay] =
    useState<NullableUndefined<CalendarDate>>();
  const [selectedMonth, setSelectedMonth] =
    useState<NullableUndefined<CalendarDate>>();
  useScrollToSelectedAgenda(
    getSelectedAgendaId(selectedDay, selectedMonth)
  );
  const { selectDay, selectMonth } =
    useReservationsCalendarSelectionActions(
      displayedAnchor,
      setSelectedDay,
      setSelectedMonth
    );
  return {
    selectedDay,
    selectedMonth,
    selectDay,
    selectMonth,
  };
};
