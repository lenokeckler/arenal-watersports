import { useEffect } from "react";
import type { CalendarView } from "@/app/types";
import { CALENDAR_VIEW, STRING } from "@/app/constants";
import { calendarActions } from "@/app/store";
import { useAppDispatch } from "@/app/store/hooks";
import type { CalendarViewProps } from "../models/CalendarViewProps.interface";
import {
  getCalendarPreferenceError,
  readCalendarPreference,
} from "../services/calendarPreference";

export const useCalendarPreference = ({
  allowedViews,
}: CalendarViewProps): void => {
  const dispatch = useAppDispatch();
  const allowedViewsSignature = allowedViews.join(
    STRING.COMMA
  );
  useEffect(() => {
    let selectedView: CalendarView = CALENDAR_VIEW.DAY;
    let preferenceError = null;
    try {
      const stored = readCalendarPreference(
        window.localStorage
      );
      if (
        stored &&
        allowedViewsSignature
          .split(STRING.COMMA)
          .includes(stored)
      ) {
        selectedView = stored;
      }
    } catch (error) {
      preferenceError = getCalendarPreferenceError(error);
    }
    dispatch(calendarActions.setSelectedView(selectedView));
    dispatch(
      calendarActions.setPreferenceError(preferenceError)
    );
  }, [dispatch, allowedViewsSignature]);
};
