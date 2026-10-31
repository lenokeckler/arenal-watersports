import { CALENDAR_VIEW, PATHS } from "@/app/constants";
import { E2E_OPERATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { E2E_OPERATIONS_CALENDAR_ATTRIBUTES } from "../constants/E2eOperationsCalendar.constants";
import { createOperationsCalendarPage } from "../pages/OperationsCalendar.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addOperationsArea } from "../support/addOperationsArea";
import { addReservationsArea } from "../support/addReservationsArea";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";

test.describe("Operations calendar", () => {
  test.beforeEach(async ({ activeWorker, page }) => {
    await addOperationsArea(activeWorker.id);
    await addReservationsArea(activeWorker.id);
    await submitActiveWorkerSignIn(page, activeWorker);
    await expect(page).toHaveURL(PATHS.MODE);
    const workModePage = createWorkModePage(page);
    await workModePage
      .getCard(E2E_OPERATIONS_AREA_LABEL)
      .click();
    await expect(page).toHaveURL(PATHS.HOME);
  });

  test("shows only daily and weekly views and loads a week", async ({
    page,
  }) => {
    const calendarPage = createOperationsCalendarPage(page);
    await calendarPage.goTo();

    await expect(calendarPage.getHeading()).toBeVisible();
    await expect(
      calendarPage.getView(CALENDAR_VIEW.DAY)
    ).toBeVisible();
    await expect(
      calendarPage.getView(CALENDAR_VIEW.WEEK)
    ).toBeVisible();
    await expect(
      calendarPage.getView(CALENDAR_VIEW.MONTH)
    ).toHaveCount(0);
    await expect(
      calendarPage.getView(CALENDAR_VIEW.YEAR)
    ).toHaveCount(0);
    await calendarPage.selectView(CALENDAR_VIEW.WEEK);
    await expect(
      calendarPage.getView(CALENDAR_VIEW.WEEK)
    ).toHaveAttribute(
      E2E_OPERATIONS_CALENDAR_ATTRIBUTES.PRESSED,
      E2E_OPERATIONS_CALENDAR_ATTRIBUTES.TRUE
    );
  });
});
