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
import { CALENDAR_TEST } from "./CalendarPresentation.constants";

export const renderCalendar = (
  initialAllowedViews: CalendarViewProps["allowedViews"] = CALENDAR_ALLOWED_VIEWS.RESERVATIONS
) => {
  const result = render(
    <Provider store={store}>
      <CalendarView
        heading={CALENDAR_TEST.HEADING}
        today={CALENDAR_FIXTURE.leapEnd}
        allowedViews={initialAllowedViews}
      />
    </Provider>
  );
  const rerenderCalendar = ({
    heading,
    today,
    allowedViews,
  }: CalendarViewProps) =>
    result.rerender(
      <Provider store={store}>
        <CalendarView
          heading={heading}
          today={today}
          allowedViews={allowedViews}
        />
      </Provider>
    );
  return { ...result, rerenderCalendar };
};

export const setupCalendarViewTests = (): void => {
  beforeEach(() => {
    window.localStorage.clear();
    store.dispatch(calendarActions.setAnchor(null));
    store.dispatch(
      calendarActions.setSelectedView(CALENDAR_VIEW.DAY)
    );
    store.dispatch(
      calendarActions.setPreferenceError(null)
    );
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    window.localStorage.clear();
  });
};
