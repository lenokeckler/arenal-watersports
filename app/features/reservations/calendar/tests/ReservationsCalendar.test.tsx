import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { CALENDAR_VIEW } from "@/app/constants";
import { store, calendarActions } from "@/app/store";
import { ReservationsCalendar } from "../ReservationsCalendar";
import { createReservationsCalendarPage } from "./ReservationsCalendar.page";

describe("ReservationsCalendar", () => {
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

  it("provides all four calendar view choices", () => {
    render(
      <Provider store={store}>
        <ReservationsCalendar />
      </Provider>
    );
    const page = createReservationsCalendarPage();

    expect(page.getHeading()).toBeVisible();
    expect(page.getView(CALENDAR_VIEW.DAY)).toBeVisible();
    expect(page.getView(CALENDAR_VIEW.WEEK)).toBeVisible();
    expect(page.getView(CALENDAR_VIEW.MONTH)).toBeVisible();
    expect(page.getView(CALENDAR_VIEW.YEAR)).toBeVisible();
  });
});
