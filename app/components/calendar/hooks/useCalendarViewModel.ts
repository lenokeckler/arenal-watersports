import { CALENDAR_VIEW } from "@/app/constants";
import { useAppSelector } from "@/app/store/hooks";
import type { CalendarViewProps } from "../models/CalendarViewProps.interface";
import type { CalendarViewModel } from "../models/CalendarViewModel.interface";
import { getCalendarPeriodTitle } from "../utils/formatCalendarPresentation";
import { useCalendarPreference } from "./useCalendarPreference";
import { useCalendarActions } from "./useCalendarActions";
import { useCalendarPeriod } from "./useCalendarPeriod";
import { buildCalendarPresentation } from "../utils/buildCalendarPresentation";
import {
  CALENDAR_DAYS_CLASS,
  CALENDAR_SINGLE_DAY_CLASS,
  CALENDAR_WEEK_DAYS_CLASS,
} from "../styles/Calendar.styles";

const getDaysClassName = (
  selectedView: CalendarViewModel["selectedView"]
): string => {
  if (selectedView === CALENDAR_VIEW.DAY) {
    return CALENDAR_SINGLE_DAY_CLASS;
  }
  if (selectedView === CALENDAR_VIEW.WEEK) {
    return CALENDAR_WEEK_DAYS_CLASS;
  }
  return CALENDAR_DAYS_CLASS;
};

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
  const period = useCalendarPeriod(
    anchor,
    selectedView,
    props.onPeriodChange
  );
  const hasAccess =
    props.allowedViews.includes(selectedView);
  return {
    hasAccess,
    daysClassName: getDaysClassName(selectedView),
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
