import { CALENDAR_VIEW, PATHS } from "@/app/constants";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import {
  E2E_RESERVATIONS_CALENDAR_ATTRIBUTES,
  E2E_RESERVATIONS_CALENDAR_ERRORS,
} from "../constants/E2eReservationsCalendar.constants";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addReservationsArea } from "../support/addReservationsArea";
import { createReservationsCalendarHeatFixture } from "../support/createReservationsCalendarHeatFixture";
import {
  assertAvailableCalendarViews,
  exerciseReservationsCalendarInteractions,
  waitForCalendarPeriod,
} from "../support/reservationsCalendarAssertions";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";

test.describe("Reservations calendar", () => {
  test.beforeEach(async ({ activeWorker, page }) => {
    await addReservationsArea(activeWorker.id);
    await submitActiveWorkerSignIn(page, activeWorker);
    await expect(page).toHaveURL(PATHS.MODE);
    const workModePage = createWorkModePage(page);
    await workModePage
      .getCard(E2E_RESERVATIONS_AREA_LABEL)
      .click();
    await expect(page).toHaveURL(PATHS.HOME);
  });

  test("shows the heat map, selected agendas, and week layout", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const heatFixture =
      await createReservationsCalendarHeatFixture(
        activeWorker.id,
        activeWorker.username,
        testInfo.project.name
      );

    try {
      const calendarPage =
        createReservationsCalendarPage(page);
      await calendarPage.goTo();
      await expect(
        calendarPage.getCreateReservationLink()
      ).toHaveAttribute("href", PATHS.RESERVATIONS.NEW);
      await expect(
        calendarPage.getPeriodContent()
      ).toBeVisible();
      await assertAvailableCalendarViews(calendarPage);
      await exerciseReservationsCalendarInteractions(
        page,
        calendarPage,
        heatFixture,
        testInfo.project.use.isMobile === true
      );
      await expect(
        calendarPage.getView(CALENDAR_VIEW.WEEK)
      ).toHaveAttribute(
        E2E_RESERVATIONS_CALENDAR_ATTRIBUTES.PRESSED,
        E2E_RESERVATIONS_CALENDAR_ATTRIBUTES.TRUE
      );
    } finally {
      await heatFixture.remove();
    }
  });

  test("opens a reservation detail from its calendar card", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const heatFixture =
      await createReservationsCalendarHeatFixture(
        activeWorker.id,
        activeWorker.username,
        testInfo.project.name
      );

    try {
      const calendarPage =
        createReservationsCalendarPage(page);
      await calendarPage.goTo();
      await calendarPage.selectView(CALENDAR_VIEW.MONTH);
      await waitForCalendarPeriod(page, calendarPage);
      const firstHeatDay = heatFixture.dates[0];
      if (firstHeatDay === undefined) {
        throw new Error(
          E2E_RESERVATIONS_CALENDAR_ERRORS.EMPTY_HEAT_FIXTURE
        );
      }
      const [customerName] = firstHeatDay.customerNames;
      if (customerName === undefined) {
        throw new Error(
          E2E_RESERVATIONS_CALENDAR_ERRORS.EMPTY_RESERVATION_NAMES
        );
      }
      const reservationLink = calendarPage
        .getReservationDetailLink(customerName)
        .first();
      await expect(reservationLink).toBeVisible();
      await expect(reservationLink).toHaveAttribute(
        "href",
        /\/reservations\/[^/]+$/
      );
      await reservationLink.click();
      await expect(page).toHaveURL(
        /\/reservations\/[^/]+$/
      );
    } finally {
      await heatFixture.remove();
    }
  });
});
