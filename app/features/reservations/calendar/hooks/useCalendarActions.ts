import { CALENDAR_NAVIGATION } from "@/app/constants";
import { calendarActions } from "@/app/store";
import { useAppDispatch } from "@/app/store/hooks";
import type {
  CalendarNavigation,
  CalendarView,
} from "../models";
import type { CalendarState } from "@/app/store/slices/CalendarState.interface";
import type { CalendarActions } from "../models/CalendarActions.type";
import type { CalendarViewProps } from "../models/CalendarViewProps.interface";
import { navigateCalendarPeriod } from "../utils";
import { persistCalendarSelection } from "../services/persistCalendarSelection";

export const useCalendarActions = (
  props: CalendarViewProps,
  state: CalendarState
): CalendarActions => {
  const dispatch = useAppDispatch();
  const anchor = state.anchor ?? props.today;
  const navigate = (direction: CalendarNavigation) =>
    dispatch(
      calendarActions.setAnchor(
        navigateCalendarPeriod(
          anchor,
          state.selectedView,
          direction
        )
      )
    );
  const onSelect = (view: CalendarView) => {
    if (!props.allowedViews.includes(view)) {
      return;
    }
    const preferenceError = persistCalendarSelection(view);
    dispatch(calendarActions.setSelectedView(view));
    dispatch(
      calendarActions.setPreferenceError(preferenceError)
    );
  };
  return {
    onSelect,
    onPrevious: () =>
      navigate(CALENDAR_NAVIGATION.PREVIOUS),
    onNext: () => navigate(CALENDAR_NAVIGATION.NEXT),
    onToday: () =>
      dispatch(calendarActions.setAnchor(props.today)),
  };
};
