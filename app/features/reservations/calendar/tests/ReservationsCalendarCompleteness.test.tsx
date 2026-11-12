import { describe, expect, it } from "vitest";
import { RESERVATIONS_CALENDAR_COPY } from "@/app/constants";
import { calendarActions, store } from "@/app/store";
import { createReservationsCalendarPage } from "./ReservationsCalendar.page";
import { RESERVATIONS_CALENDAR_CONTENT_FIXTURE } from "./ReservationsCalendarContent.constants";
import {
  renderReservationsCalendar,
  setupReservationsCalendarTests,
} from "./reservationsCalendarTestSetup";

setupReservationsCalendarTests();

describe("ReservationsCalendar completeness", () => {
  it("shows missing snapshot information without claiming emptiness", () => {
    renderReservationsCalendar();
    const page = createReservationsCalendarPage();

    expect(
      page.getMessage(
        RESERVATIONS_CALENDAR_COPY.MISSING_SNAPSHOT
      )
    ).toBeVisible();
    expect(
      page.getMessage(
        RESERVATIONS_CALENDAR_COPY.EMPTY_PERIOD
      )
    ).toBeNull();
  });

  it("identifies a supplied complete empty period", () => {
    store.dispatch(
      calendarActions.setAnchor(
        RESERVATIONS_CALENDAR_CONTENT_FIXTURE.date
      )
    );
    renderReservationsCalendar(
      RESERVATIONS_CALENDAR_CONTENT_FIXTURE.emptySnapshot
    );
    const page = createReservationsCalendarPage();

    expect(
      page.getMessage(
        RESERVATIONS_CALENDAR_COPY.EMPTY_PERIOD
      )
    ).toBeVisible();
  });

  it("reports incomplete results independently from time coverage", () => {
    store.dispatch(
      calendarActions.setAnchor(
        RESERVATIONS_CALENDAR_CONTENT_FIXTURE.date
      )
    );
    renderReservationsCalendar(
      RESERVATIONS_CALENDAR_CONTENT_FIXTURE.incompleteSnapshot
    );
    const page = createReservationsCalendarPage();

    expect(
      page.getMessage(
        RESERVATIONS_CALENDAR_COPY.INCOMPLETE_RESULTS
      )
    ).toBeVisible();
    expect(
      page.getMessage(
        RESERVATIONS_CALENDAR_COPY.PARTIAL_COVERAGE
      )
    ).toBeNull();
  });

  it("reports partial coverage without claiming emptiness", () => {
    store.dispatch(
      calendarActions.setAnchor(
        RESERVATIONS_CALENDAR_CONTENT_FIXTURE.date
      )
    );
    renderReservationsCalendar(
      RESERVATIONS_CALENDAR_CONTENT_FIXTURE.partialCoverageSnapshot
    );
    const page = createReservationsCalendarPage();

    expect(
      page.getMessage(
        RESERVATIONS_CALENDAR_COPY.PARTIAL_COVERAGE
      )
    ).toBeVisible();
    expect(
      page.getMessage(
        RESERVATIONS_CALENDAR_COPY.EMPTY_PERIOD
      )
    ).toBeNull();
  });
});
