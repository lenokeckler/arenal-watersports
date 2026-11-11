import { afterEach, beforeEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { CALENDAR_VIEW } from "@/app/constants";
import { calendarActions, store } from "@/app/store";
import type { NullableUndefined } from "@/app/types";
import type { CalendarDate } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { ReservationsCalendar } from "../ReservationsCalendar";

let agendaScrollMock = vi.fn();
const scrollIntoViewDescriptor =
  Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "scrollIntoView"
  );

export const getAgendaScrollMock = () => agendaScrollMock;

export const renderReservationsCalendar = (
  snapshot?: NullableUndefined<ReservationCalendarSnapshot>,
  today?: NullableUndefined<CalendarDate>
) =>
  render(
    <Provider store={store}>
      <ReservationsCalendar
        snapshot={snapshot}
        today={today}
      />
    </Provider>
  );

export const setupReservationsCalendarTests = (): void => {
  beforeEach(() => {
    agendaScrollMock = vi.fn();
    Object.defineProperty(
      HTMLElement.prototype,
      "scrollIntoView",
      { configurable: true, value: agendaScrollMock }
    );
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
    if (scrollIntoViewDescriptor === undefined) {
      Reflect.deleteProperty(
        HTMLElement.prototype,
        "scrollIntoView"
      );
      return;
    }
    Object.defineProperty(
      HTMLElement.prototype,
      "scrollIntoView",
      scrollIntoViewDescriptor
    );
  });
};
