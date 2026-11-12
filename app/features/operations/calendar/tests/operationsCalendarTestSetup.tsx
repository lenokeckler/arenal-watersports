import { afterEach, beforeEach } from "vitest";
import {
  cleanup,
  render,
  type RenderResult,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { CALENDAR_VIEW } from "@/app/constants";
import { calendarActions, store } from "@/app/store";
import type { OperationsCalendarViewProps } from "../models/OperationsCalendarViewProps.interface";
import { OperationsCalendarView } from "../OperationsCalendarView";
import { OPERATIONS_CALENDAR_DEFAULTS } from "./OperationsCalendar.constants";

export const renderOperationsCalendar = (
  overrides: Partial<OperationsCalendarViewProps> = {}
): RenderResult => {
  const props = {
    ...OPERATIONS_CALENDAR_DEFAULTS,
    ...overrides,
  };
  return render(
    <Provider store={store}>
      <OperationsCalendarView {...props} />
    </Provider>
  );
};

export const setupOperationsCalendarTests = (): void => {
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
    window.localStorage.clear();
  });
};
