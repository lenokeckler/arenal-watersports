import {
  CALENDAR_PREFERENCE,
  CALENDAR_PREFERENCE_COPY,
  CALENDAR_VIEW,
} from "@/app/constants";
import type { CalendarView } from "@/app/types";
import type { NullableRef } from "@/app/types";

export const readCalendarPreference = (
  storage: Storage
): NullableRef<CalendarView> => {
  const value = storage.getItem(
    CALENDAR_PREFERENCE.STORAGE_KEY
  );
  return (
    Object.values(CALENDAR_VIEW).find(
      (view) => view === value
    ) ?? null
  );
};

export const writeCalendarPreference = (
  storage: Storage,
  view: CalendarView
): void => {
  storage.setItem(CALENDAR_PREFERENCE.STORAGE_KEY, view);
};

export const getCalendarPreferenceError = (
  error: unknown
): string =>
  new Error(CALENDAR_PREFERENCE_COPY.ERROR, {
    cause: error,
  }).message;
