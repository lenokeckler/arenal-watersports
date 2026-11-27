import { describe, expect, it } from "vitest";
import { CALENDAR_VIEW, PATHS } from "@/app/constants";
import { RESERVATION_CALENDAR_LIST } from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import { calendarActions, store } from "@/app/store";
import { createReservationsCalendarPage } from "./ReservationsCalendar.page";
import { RESERVATIONS_CALENDAR_TEST_COPY } from "./ReservationsCalendarTest.constants";
import { RESERVATIONS_CALENDAR_SELECTION as fixture } from "./ReservationsCalendarSelection.constants";
import { RESERVATIONS_CALENDAR_AGENDA_PAGINATION_SNAPSHOT as paginationSnapshot } from "./ReservationsCalendarAgendaPagination.constants";
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

  it("places compact pagination directly below the period agenda", async () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(fixture.SNAPSHOT);
    const page = createReservationsCalendarPage();
    await page.selectView(CALENDAR_VIEW.MONTH);

    expect(page.getAgendaPagination()).toBeVisible();
    expect(page.getPageSizeSelector()).toBeVisible();
    expect(
      page.isAgendaPaginationImmediatelyAfterPeriodAgenda()
    ).toBe(true);
    expect(
      page.queryGlobalReservationList()
    ).not.toBeInTheDocument();
  });

  it("shows only the selected period page after advancing", async () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(paginationSnapshot);
    const page = createReservationsCalendarPage();
    await page.selectView(CALENDAR_VIEW.MONTH);

    expect(page.getPeriodReservationBlocks()).toHaveLength(
      RESERVATION_CALENDAR_LIST.PAGE_SIZE_OPTIONS[0]
    );

    await page.goToNextAgendaPage();

    expect(page.getPeriodReservationBlocks()).toHaveLength(
      paginationSnapshot.totalCount -
        RESERVATION_CALENDAR_LIST.PAGE_SIZE_OPTIONS[0]
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

    const externalGuideRegistrationLink =
      createReservationsCalendarPage().queryExternalGuideRegistrationLink();

    expect(externalGuideRegistrationLink).toHaveAttribute(
      "href",
      PATHS.RESERVATIONS.EXTERNAL_GUIDE_NEW
    );
    expect(
      externalGuideRegistrationLink
    ).toHaveAccessibleName(
      RESERVATIONS_CALENDAR_TEST_COPY.EXTERNAL_GUIDE_LINK_NAME
    );
  });
});
