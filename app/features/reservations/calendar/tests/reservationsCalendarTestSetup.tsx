import { afterEach, beforeEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { CALENDAR_VIEW } from "@/app/constants";
import { calendarActions, store } from "@/app/store";
import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { ReservationsCalendar } from "../ReservationsCalendar";

export const renderReservationsCalendar = (
  snapshot?: NullableUndefined<ReservationCalendarSnapshot>
) =>
  render(
    <Provider store={store}>
      <ReservationsCalendar snapshot={snapshot} />
    </Provider>
  );

export const setupReservationsCalendarTests = (): void => {
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
