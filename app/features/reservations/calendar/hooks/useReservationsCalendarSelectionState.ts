import { useCallback, useEffect, useState } from "react";
import type { CalendarDate } from "@/app/types";
import type { NullableUndefined } from "@/app/types";
import {
  DOCUMENT,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import { calendarActions } from "@/app/store";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/store/hooks";
import type { ReservationsCalendarSelectionState } from "../models/ReservationsCalendarSelectionState.interface";

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
  const dispatch = useAppDispatch();
  const anchor = useAppSelector(
    (state) => state.calendar.anchor
  );
  const displayedAnchor = anchor ?? today;
  const [selectedDay, setSelectedDay] =
    useState<NullableUndefined<CalendarDate>>();
  const [selectedMonth, setSelectedMonth] =
    useState<NullableUndefined<CalendarDate>>();
  useEffect(() => {
    const agendaId = getSelectedAgendaId(
      selectedDay,
      selectedMonth
    );
    if (agendaId === undefined) {
      return;
    }
    document.getElementById(agendaId)?.scrollIntoView({
      behavior: DOCUMENT.SMOOTH,
      block: "start",
    });
  }, [selectedDay, selectedMonth]);
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
    [dispatch, displayedAnchor]
  );
  const selectMonth = useCallback(
    (date: CalendarDate): void => {
      setSelectedDay(undefined);
      setSelectedMonth(date);
    },
    []
  );
  return {
    selectedDay,
    selectedMonth,
    selectDay,
    selectMonth,
  };
};
