import { afterEach, beforeEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import {
  CALENDAR_ALLOWED_VIEWS,
  CALENDAR_VIEW,
} from "@/app/constants";
import { store, calendarActions } from "@/app/store";
import { CalendarView } from "../CalendarView";
import type { CalendarViewProps } from "../models/CalendarViewProps.interface";
import { CALENDAR_FIXTURE } from "./Calendar.constants";

export const renderCalendar = (
  allowedViews: CalendarViewProps["allowedViews"] = CALENDAR_ALLOWED_VIEWS.RESERVATIONS
) =>
  render(
    <Provider store={store}>
      <CalendarView
        today={CALENDAR_FIXTURE.leapEnd}
        allowedViews={allowedViews}
      />
    </Provider>
  );

export const setupCalendarViewTests = (): void => {
  beforeEach(() => {
    window.localStorage.clear();
    store.dispatch(
      calendarActions.setCalendar({
        anchor: null,
        selectedView: CALENDAR_VIEW.DAY,
        preferenceError: null,
      })
    );
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    window.localStorage.clear();
  });
};
