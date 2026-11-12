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
  const [scrollRequest, setScrollRequest] = useState(0);
  const actions = useReservationsCalendarSelectionActions(
    displayedAnchor,
    setSelectedDay,
    setSelectedMonth
  );
  useScrollToSelectedAgenda(
    getSelectedAgendaId(selectedDay, selectedMonth),
    scrollRequest
  );
  const selectDay = (date: CalendarDate): void => {
    actions.selectDay(date);
    setScrollRequest((request) => request + 1);
  };
  const selectMonth = (date: CalendarDate): void => {
    actions.selectMonth(date);
    setScrollRequest((request) => request + 1);
  };
  return {
    selectedDay,
    selectedMonth,
    selectDay,
    selectMonth,
  };
};
