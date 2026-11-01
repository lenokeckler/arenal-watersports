import {
  RESERVATION_HISTORY_FILTER_PARAM as PARAM,
  RESERVATION_TYPE,
} from "@/app/constants";
import { E2E_RESERVATION_HISTORY_DAY_OFFSET as OFFSET } from "../constants/E2eReservationHistory.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createReservationHistoryPage } from "../pages/ReservationHistory.page";
import { buildReservationHistoryDay } from "../support/buildReservationHistoryDay";
import { expectReservationHistoryRecords } from "../support/expectReservationHistoryRecords";
import {
  expect,
  test,
} from "../support/reservationHistoryTest";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation history filter states", () => {
  test("explains an inverted date range without results or pagination", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const early = buildReservationHistoryDay(testInfo);
    const late = buildReservationHistoryDay(
      testInfo,
      OFFSET.SECOND
    );
    const record = await createHistoryRecord({
      startsAt: early.startsAt,
    });
    await signInAsSeededWorker(page);
    const historyPage = createReservationHistoryPage(page);
    await historyPage.goTo({
      ...early.query,
      [PARAM.FROM]: late.date,
    });

    await expect(
      historyPage.getInvertedRangeError()
    ).toBeVisible();
    await expectReservationHistoryRecords(
      historyPage,
      [],
      [record.customerName]
    );
    await expect(historyPage.getNextPage()).toHaveCount(
      E2E_COUNT.NONE
    );
    await expect(
      historyPage.getFilteredEmptyTitle()
    ).toHaveCount(E2E_COUNT.NONE);
  });

  test("says there are no results when valid filters match nothing", async ({
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const historyPage = createReservationHistoryPage(page);
    await signInAsSeededWorker(page);
    await historyPage.goTo({
      ...day.query,
      [PARAM.TYPE]: RESERVATION_TYPE.COMBO,
    });

    await expect(
      historyPage.getFilteredEmptyTitle()
    ).toBeVisible();
  });
});
