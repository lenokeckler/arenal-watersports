import { CALENDAR_VIEW, PATHS } from "@/app/constants";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { E2E_RESERVATIONS_CALENDAR_ATTRIBUTES } from "../constants/E2eReservationsCalendar.constants";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addReservationsArea } from "../support/addReservationsArea";
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

  test("shows all reservation calendar views and selects a week", async ({
    page,
  }) => {
    const calendarPage =
      createReservationsCalendarPage(page);
    await calendarPage.goTo();

    await expect(calendarPage.getHeading()).toBeVisible();
    await expect(
      calendarPage.getCreateReservationLink()
    ).toHaveAttribute("href", PATHS.RESERVATIONS.NEW);
    await expect(
      calendarPage.getPeriodContent()
    ).toBeVisible();
    await expect(
      calendarPage.getView(CALENDAR_VIEW.DAY)
    ).toBeVisible();
    await expect(
      calendarPage.getView(CALENDAR_VIEW.WEEK)
    ).toBeVisible();
    await expect(
      calendarPage.getView(CALENDAR_VIEW.MONTH)
    ).toBeVisible();
    await expect(
      calendarPage.getView(CALENDAR_VIEW.YEAR)
    ).toBeVisible();
    await calendarPage.selectView(CALENDAR_VIEW.WEEK);
    await expect(
      calendarPage.getView(CALENDAR_VIEW.WEEK)
    ).toHaveAttribute(
      E2E_RESERVATIONS_CALENDAR_ATTRIBUTES.PRESSED,
      E2E_RESERVATIONS_CALENDAR_ATTRIBUTES.TRUE
    );
  });
});
