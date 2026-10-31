import { useEffect, useMemo } from "react";
import { CALENDAR_VIEW } from "@/app/constants";
import { useAppSelector } from "@/app/store/hooks";
import type { CalendarViewProps } from "../models/CalendarViewProps.interface";
import type { CalendarViewModel } from "../models/CalendarViewModel.interface";
import { buildCalendarPeriod } from "../utils";
import { getCalendarPeriodTitle } from "../utils/formatCalendarPresentation";
import { useCalendarPreference } from "./useCalendarPreference";
import { useCalendarActions } from "./useCalendarActions";
import { buildCalendarPresentation } from "../utils/buildCalendarPresentation";
import {
  CALENDAR_DAYS_CLASS,
  CALENDAR_SINGLE_DAY_CLASS,
} from "../styles/Calendar.styles";

export const useCalendarViewModel = (
  props: CalendarViewProps
): CalendarViewModel => {
  useCalendarPreference(props);
  const storedState = useAppSelector(
    (root) => root.calendar
  );
  const selectedView = props.allowedViews.includes(
    storedState.selectedView
  )
    ? storedState.selectedView
    : CALENDAR_VIEW.DAY;
  const state = { ...storedState, selectedView };
  const actions = useCalendarActions(props, state);
  const anchor = state.anchor ?? props.today;
  const anchorDay = anchor.day;
  const anchorMonth = anchor.month;
  const anchorYear = anchor.year;
  const onPeriodChange = props.onPeriodChange;
  const period = useMemo(
    () =>
      buildCalendarPeriod(
        {
          day: anchorDay,
          month: anchorMonth,
          year: anchorYear,
        },
        selectedView
      ),
    [anchorDay, anchorMonth, anchorYear, selectedView]
  );
  useEffect(() => {
    onPeriodChange?.(period);
  }, [onPeriodChange, period]);
  const hasAccess =
    props.allowedViews.includes(selectedView);
  return {
    hasAccess,
    daysClassName:
      selectedView === CALENDAR_VIEW.DAY
        ? CALENDAR_SINGLE_DAY_CLASS
        : CALENDAR_DAYS_CLASS,
    selectedView,
    preferenceError: state.preferenceError,
    toolbar: {
      heading: props.heading,
      title: getCalendarPeriodTitle(period),
      selectedView,
      allowedViews: props.allowedViews,
      ...actions,
    },
    ...buildCalendarPresentation(period, props.today),
  };
};
