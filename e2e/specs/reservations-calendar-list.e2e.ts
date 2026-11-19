import { PATHS } from "@/app/constants";
import { createReservationsCalendarListPage } from "../pages/ReservationsCalendarList.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { E2E_RESERVATIONS_CALENDAR_COPY } from "../constants/E2eReservationsCalendar.constants";
import { expect, test } from "../support/activeWorkerTest";
import { addReservationsArea } from "../support/addReservationsArea";
import { createReservationsCalendarHeatFixture } from "../support/createReservationsCalendarHeatFixture";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";

test.describe("Reservations period agenda pagination", () => {
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

  test("paginates the period agenda and saves its page-size preference", async ({
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
      const calendarListPage =
        createReservationsCalendarListPage(page);
      await calendarListPage.goTo();
      await calendarListPage.selectMonthView();
      const fixtureReservationCount =
        heatFixture.dates.reduce(
          (totalCount, { count }) => totalCount + count,
          0
        );

      await expect(
        calendarListPage.getPeriodAgenda()
      ).toBeVisible();
      await expect(
        calendarListPage.getPageSizeSelector()
      ).toHaveValue(
        E2E_RESERVATIONS_CALENDAR_COPY.DEFAULT_PAGE_SIZE
      );
      await expect(
        calendarListPage.getPreviousPageButton()
      ).toBeDisabled();
      await expect(
        calendarListPage.getNextPageButton()
      ).toBeEnabled();
      await expect
        .poll(() =>
          calendarListPage.getReservationEntries().count()
        )
        .toBe(
          Number(
            E2E_RESERVATIONS_CALENDAR_COPY.DEFAULT_PAGE_SIZE
          )
        );

      await calendarListPage.getNextPageButton().click();
      await expect(
        calendarListPage.getPreviousPageButton()
      ).toBeEnabled();
      await expect
        .poll(() =>
          calendarListPage.getReservationEntries().count()
        )
        .toBeGreaterThan(0);
      await expect
        .poll(() =>
          calendarListPage.getReservationEntries().count()
        )
        .toBeLessThan(
          Number(
            E2E_RESERVATIONS_CALENDAR_COPY.DEFAULT_PAGE_SIZE
          )
        );
      await calendarListPage.selectYearView();
      await expect(
        calendarListPage.getPreviousPageButton()
      ).toBeDisabled();
      await calendarListPage.selectMonthView();
      await expect(
        calendarListPage.getPreviousPageButton()
      ).toBeDisabled();

      await calendarListPage.selectPageSize(
        E2E_RESERVATIONS_CALENDAR_COPY.PREFERENCE_PAGE_SIZE
      );
      await expect(
        calendarListPage.getPageSizeSelector()
      ).toHaveValue(
        E2E_RESERVATIONS_CALENDAR_COPY.PREFERENCE_PAGE_SIZE
      );
      await expect
        .poll(() =>
          calendarListPage.getReservationEntries().count()
        )
        .toBeGreaterThanOrEqual(fixtureReservationCount);

      await calendarListPage.reload();
      await expect(
        calendarListPage.getPageSizeSelector()
      ).toHaveValue(
        E2E_RESERVATIONS_CALENDAR_COPY.PREFERENCE_PAGE_SIZE
      );
    } finally {
      await heatFixture.remove();
    }
  });
});
