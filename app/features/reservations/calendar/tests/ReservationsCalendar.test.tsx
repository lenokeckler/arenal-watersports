import { describe, expect, it } from "vitest";
import { CALENDAR_VIEW, PATHS } from "@/app/constants";
import { createReservationsCalendarPage } from "./ReservationsCalendar.page";
import {
  renderReservationsCalendar,
  setupReservationsCalendarTests,
} from "./reservationsCalendarTestSetup";

setupReservationsCalendarTests();

describe("ReservationsCalendar", () => {
  it("provides all four calendar view choices", () => {
    renderReservationsCalendar();
    const page = createReservationsCalendarPage();

    expect(page.getHeading()).toBeVisible();
    expect(page.getView(CALENDAR_VIEW.DAY)).toBeVisible();
    expect(page.getView(CALENDAR_VIEW.WEEK)).toBeVisible();
    expect(page.getView(CALENDAR_VIEW.MONTH)).toBeVisible();
    expect(page.getView(CALENDAR_VIEW.YEAR)).toBeVisible();
  });

  it("links to the reservation creation flow", () => {
    renderReservationsCalendar();
    const page = createReservationsCalendarPage();

    expect(page.getCreateReservationLink()).toHaveAttribute(
      "href",
      PATHS.RESERVATIONS.NEW
    );
  });

  it("hides external guide registration without permission", () => {
    renderReservationsCalendar();

    expect(
      createReservationsCalendarPage().queryExternalGuideRegistrationLink()
    ).not.toBeInTheDocument();
  });

  it("shows external guide registration with permission", () => {
    renderReservationsCalendar(undefined, undefined, true);

    expect(
      createReservationsCalendarPage().queryExternalGuideRegistrationLink()
    ).toHaveAttribute(
      "href",
      PATHS.RESERVATIONS.EXTERNAL_GUIDE_NEW
    );
  });
});
