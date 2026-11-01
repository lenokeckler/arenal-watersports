import {
  PAGINATION,
  RESERVATION_HISTORY_FILTER_PARAM as PARAM,
} from "@/app/constants";
import {
  E2E_RESERVATION_HISTORY_COPY as COPY,
  E2E_RESERVATION_HISTORY_LOOKUP as LOOKUP,
  E2E_RESERVATION_HISTORY_PAGES as PAGES,
} from "../constants/E2eReservationHistory.constants";
import { createReservationHistoryPage } from "../pages/ReservationHistory.page";
import { buildReservationHistoryDay } from "../support/buildReservationHistoryDay";
import {
  expect,
  test,
} from "../support/reservationHistoryTest";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation history pagination", () => {
  test.beforeEach(
    async ({ createHistoryRecords, page }, testInfo) => {
      const day = buildReservationHistoryDay(testInfo);
      await createHistoryRecords(
        PAGINATION.DEFAULT_PAGE_SIZE + PAGINATION.ONE_PAGE,
        { startsAt: day.startsAt }
      );
      await signInAsSeededWorker(page);
      await createReservationHistoryPage(page).goTo(
        day.query
      );
    }
  );

  test("moves between pages and keeps the filters in the links", async ({
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const historyPage = createReservationHistoryPage(page);
    const indicator = (current: number) =>
      historyPage.getPageIndicator(current, PAGES.COUNT);

    await expect(indicator(PAGES.FIRST)).toBeVisible();
    await historyPage.getNextPage().click();
    await expect(indicator(PAGES.SECOND)).toBeVisible();
    await expect(page).toHaveURL(
      (url) => url.searchParams.get(PARAM.TO) === day.date
    );
    await historyPage.getPreviousPage().click();
    await expect(indicator(PAGES.FIRST)).toBeVisible();
    await historyPage.goTo({
      ...day.query,
      [PAGES.PARAM]: LOOKUP.PAGE_PARAM_OUT_OF_RANGE,
    });

    await expect(indicator(PAGES.SECOND)).toBeVisible();
  });

  test("returns to page one when a filter is applied from page two", async ({
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const historyPage = createReservationHistoryPage(page);
    await historyPage.getNextPage().click();
    await expect(page).toHaveURL((url) =>
      url.searchParams.has(PAGES.PARAM)
    );
    await historyPage.applyFilters({
      category: COPY.FILTER_ALL,
      from: day.date,
      type: COPY.TYPE_RENTAL,
    });

    await expect(
      historyPage.getPageIndicator(PAGES.FIRST, PAGES.COUNT)
    ).toBeVisible();
    await expect(page).toHaveURL(
      (url) => !url.searchParams.has(PAGES.PARAM)
    );
  });
});
