import { formatReservationHistoryDate } from "@/app/features/board/reservation-history/utils/formatReservationHistoryDate";
import {
  E2E_RESERVATION_HISTORY,
  E2E_RESERVATION_HISTORY_COPY as COPY,
  E2E_RESERVATION_HISTORY_STATUS as STATUS,
} from "../constants/E2eReservationHistory.constants";
import { createReservationHistoryDetailPage } from "../pages/ReservationHistoryDetail.page";
import { createReservationHistoryPage } from "../pages/ReservationHistory.page";
import { buildReservationHistoryDay } from "../support/buildReservationHistoryDay";
import { expectReservationHistoryRecords } from "../support/expectReservationHistoryRecords";
import {
  expect,
  test,
} from "../support/reservationHistoryTest";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation history list", () => {
  test("lists a closed record with its date, equipment, guide and attendant", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const closed = await createHistoryRecord({
      startsAt: day.startsAt,
    });
    await signInAsSeededWorker(page);
    const historyPage = createReservationHistoryPage(page);
    await historyPage.goTo(day.query);
    const row = historyPage.getRecord(closed.customerName);

    await expect(row).toContainText(
      formatReservationHistoryDate(day.startsAt)
    );
    await expect(row).not.toContainText(COPY.CANCELLED);
    for (const {
      absent,
      label,
      present,
    } of historyPage.getExpectedLines()) {
      const line = historyPage.getRecordLine(
        closed.customerName,
        label
      );
      await expect(line).toContainText(present);
      if (absent) {
        await expect(line).not.toContainText(absent);
      }
    }
  });

  test("marks a cancelled record as cancelled", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const cancelled = await createHistoryRecord({
      cancellationReason:
        E2E_RESERVATION_HISTORY.CANCELLATION_REASON,
      startsAt: day.startsAt,
      status: STATUS.CANCELLED,
    });
    await signInAsSeededWorker(page);
    const historyPage = createReservationHistoryPage(page);
    await historyPage.goTo(day.query);

    await expect(
      historyPage.getRecord(cancelled.customerName)
    ).toContainText(COPY.CANCELLED);
  });

  test("keeps a scheduled reservation out of the history and its detail", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const scheduled = await createHistoryRecord({
      startsAt: day.startsAt,
      status: STATUS.SCHEDULED,
    });
    await signInAsSeededWorker(page);
    const historyPage = createReservationHistoryPage(page);
    await historyPage.goTo(day.query);

    await expect(
      historyPage.getFilteredEmptyTitle()
    ).toBeVisible();
    await expectReservationHistoryRecords(
      historyPage,
      [],
      [scheduled.customerName]
    );
    const detailPage =
      createReservationHistoryDetailPage(page);
    await detailPage.goToRecord(scheduled.id);

    await expect(
      detailPage.getNotFoundTitle()
    ).toBeVisible();
  });
});
