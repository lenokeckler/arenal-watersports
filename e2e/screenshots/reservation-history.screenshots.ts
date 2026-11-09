import {
  RESERVATION_HISTORY_FILTER_PARAM as PARAM,
  RESERVATION_TYPE,
} from "@/app/constants";
import {
  E2E_RESERVATION_HISTORY,
  E2E_RESERVATION_HISTORY_DAY_OFFSET as OFFSET,
  E2E_RESERVATION_HISTORY_STATUS as STATUS,
} from "../constants/E2eReservationHistory.constants";
import {
  E2E_RESERVATION_HISTORY_DETAIL_ID,
  E2E_RESERVATION_HISTORY_SCREENSHOT as SCREENSHOT,
} from "../constants/E2eReservationHistoryDetail.constants";
import { createReservationHistoryDetailPage } from "../pages/ReservationHistoryDetail.page";
import { createReservationHistoryPage } from "../pages/ReservationHistory.page";
import { buildReservationHistoryDay } from "../support/buildReservationHistoryDay";
import { captureFullPage } from "../support/captureFullPage";
import {
  expect,
  test,
} from "../support/reservationHistoryTest";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation history screenshots", () => {
  test("captures the list and its filter states", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const late = buildReservationHistoryDay(
      testInfo,
      OFFSET.SECOND
    );
    const closed = await createHistoryRecord({
      startsAt: day.startsAt,
    });
    await createHistoryRecord({
      cancellationReason:
        E2E_RESERVATION_HISTORY.CANCELLATION_REASON,
      startsAt: day.startsAt,
      status: STATUS.CANCELLED,
    });
    await signInAsSeededWorker(page);
    const historyPage = createReservationHistoryPage(page);
    const capture = (name: string): Promise<void> =>
      captureFullPage(page, name, testInfo.project.name);

    await historyPage.goTo(day.query);
    await expect(
      historyPage.getRecord(closed.customerName)
    ).toBeVisible();
    await capture(SCREENSHOT.LIST);

    await historyPage.goTo({
      ...day.query,
      [PARAM.TYPE]: RESERVATION_TYPE.COMBO,
    });
    await expect(
      historyPage.getFilteredEmptyTitle()
    ).toBeVisible();
    await capture(SCREENSHOT.NO_RESULTS);

    await historyPage.goTo({
      ...day.query,
      [PARAM.FROM]: late.date,
    });
    await expect(
      historyPage.getInvertedRangeError()
    ).toBeVisible();
    await capture(SCREENSHOT.INVERTED_RANGE);
  });

  test("captures the detail states", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const closed = await createHistoryRecord({
      startsAt: day.startsAt,
    });
    const cancelled = await createHistoryRecord({
      cancellationReason:
        E2E_RESERVATION_HISTORY.CANCELLATION_REASON,
      startsAt: day.startsAt,
      status: STATUS.CANCELLED,
    });
    await signInAsSeededWorker(page);
    const detailPage =
      createReservationHistoryDetailPage(page);
    const capture = (name: string): Promise<void> =>
      captureFullPage(page, name, testInfo.project.name);

    await detailPage.goToRecord(closed.id);
    await expect(detailPage.getBackLink()).toBeVisible();
    await capture(SCREENSHOT.DETAIL_CLOSED);

    await detailPage.goToRecord(cancelled.id);
    await expect(
      detailPage.getCancellationBlock()
    ).toBeVisible();
    await capture(SCREENSHOT.DETAIL_CANCELLED);

    await detailPage.goToRecord(
      E2E_RESERVATION_HISTORY_DETAIL_ID.UNKNOWN
    );
    await expect(
      detailPage.getNotFoundTitle()
    ).toBeVisible();
    await capture(SCREENSHOT.NOT_FOUND);
  });
});
