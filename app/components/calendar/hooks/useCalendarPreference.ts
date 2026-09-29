import { useEffect } from "react";
import type { CalendarView } from "../models";
import { CALENDAR_VIEW } from "@/app/constants";
import { calendarActions } from "@/app/store";
import { useAppDispatch } from "@/app/store/hooks";
import type { CalendarViewProps } from "../models/CalendarViewProps.interface";
import {
  getCalendarPreferenceError,
  readCalendarPreference,
} from "../services/calendarPreference";

export const useCalendarPreference = ({
  today,
  allowedViews,
}: CalendarViewProps): void => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let selectedView: CalendarView = CALENDAR_VIEW.DAY;
    let preferenceError = null;
    try {
      const stored = readCalendarPreference(
        window.localStorage
      );
      if (stored && allowedViews.includes(stored)) {
        selectedView = stored;
      }
    } catch (error) {
      preferenceError = getCalendarPreferenceError(error);
    }
    dispatch(
      calendarActions.setCalendar({
        anchor: today,
        selectedView,
        preferenceError,
      })
    );
  }, [dispatch, today, allowedViews]);
};
