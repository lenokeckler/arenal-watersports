import { CALENDAR_VIEW, PATHS } from "@/app/constants";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { E2E_RESERVATIONS_CALENDAR_ATTRIBUTES } from "../constants/E2eReservationsCalendar.constants";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addReservationsArea } from "../support/addReservationsArea";
import { createReservationsCalendarHeatFixture } from "../support/createReservationsCalendarHeatFixture";
import {
  assertAvailableCalendarViews,
  exerciseReservationsCalendarInteractions,
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
    await expect(page).toHaveURL(PATHS.BOARD);
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
});
