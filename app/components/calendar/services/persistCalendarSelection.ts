import type { NullableRef } from "@/app/types";
import type { CalendarView } from "@/app/types";
import {
  getCalendarPreferenceError,
  writeCalendarPreference,
} from "./calendarPreference";

export const persistCalendarSelection = (
  view: CalendarView
): NullableRef<string> => {
  try {
    writeCalendarPreference(window.localStorage, view);
    return null;
  } catch (error) {
    return getCalendarPreferenceError(error);
  }
};
