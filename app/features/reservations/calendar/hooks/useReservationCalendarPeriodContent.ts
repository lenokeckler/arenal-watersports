import { createElement, useCallback } from "react";
import type { CalendarPeriodContent } from "@/app/components/calendar/models/CalendarPeriodContent.type";
import type { NullableUndefined } from "@/app/types";
import {
  CALENDAR_VIEW,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationsCalendarSelection } from "../models/ReservationsCalendarSelection.interface";
import { ReservationCalendarGroups } from "../components/ReservationCalendarGroups";
import { buildReservationCalendarContent } from "@/app/components/reservation-calendar/utils/buildReservationCalendarContent";
import { buildCalendarPeriod } from "@/app/components/calendar/utils";
import type { CalendarPeriod } from "@/app/components/calendar/models/CalendarPeriod.interface";
import { getReservationCalendarMessages } from "../utils/getReservationCalendarMessages";
import type { ReservationCalendarAgendaContent } from "../models/ReservationCalendarAgendaContent.interface";

const buildAgendaContent = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>,
  period: CalendarPeriod,
  emptyMessage?: string
): ReservationCalendarAgendaContent => {
  const content = buildReservationCalendarContent(
    snapshot,
    period
  );
  return {
    content,
    messages: getReservationCalendarMessages(
      content,
      emptyMessage
    ),
  };
};

const getSelectedAgendaContent = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>,
  period: NullableUndefined<CalendarPeriod>,
  emptyMessage?: string
): NullableUndefined<ReservationCalendarAgendaContent> =>
  period === undefined
    ? undefined
    : buildAgendaContent(snapshot, period, emptyMessage);

const getSelectedDayPeriod = (
  period: CalendarPeriod,
  selectedDay: ReservationsCalendarSelection["selectedDay"]
): NullableUndefined<CalendarPeriod> => {
  if (
    selectedDay !== undefined &&
    selectedDay.year === period.start.year &&
    (period.view === CALENDAR_VIEW.YEAR ||
      (period.view === CALENDAR_VIEW.MONTH &&
        selectedDay.month === period.start.month))
  ) {
    return buildCalendarPeriod(
      selectedDay,
      CALENDAR_VIEW.DAY
    );
  }
  return undefined;
};

const getSelectedMonthPeriod = (
  period: CalendarPeriod,
  selectedMonth: ReservationsCalendarSelection["selectedMonth"]
): NullableUndefined<CalendarPeriod> => {
  if (
    period.view === CALENDAR_VIEW.YEAR &&
    selectedMonth !== undefined &&
    selectedMonth.year === period.start.year
  ) {
    return buildCalendarPeriod(
      selectedMonth,
      CALENDAR_VIEW.MONTH
    );
  }
  return undefined;
};

export const useReservationCalendarPeriodContent = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>,
  selection: ReservationsCalendarSelection
): CalendarPeriodContent =>
  useCallback(
    (period) =>
      createElement(ReservationCalendarGroups, {
        period,
        periodAgenda: buildAgendaContent(snapshot, period),
        selectedDayAgenda: getSelectedAgendaContent(
          snapshot,
          getSelectedDayPeriod(
            period,
            selection.selectedDay
          ),
          RESERVATIONS_CALENDAR_COPY.EMPTY_DAY
        ),
        selectedMonthAgenda: getSelectedAgendaContent(
          snapshot,
          getSelectedMonthPeriod(
            period,
            selection.selectedMonth
          )
        ),
      }),
    [selection, snapshot]
  );
