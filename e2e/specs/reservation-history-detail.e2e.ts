import { formatReservationHistoryDate } from "@/app/features/board/reservation-history/utils/formatReservationHistoryDate";
import {
  E2E_RESERVATION_HISTORY,
  E2E_RESERVATION_HISTORY_COPY as COPY,
  E2E_RESERVATION_HISTORY_STATUS as STATUS,
} from "../constants/E2eReservationHistory.constants";
import {
  E2E_RESERVATION_HISTORY_MONEY_SYMBOLS,
  E2E_RESERVATION_HISTORY_TIME_PATTERN,
} from "../constants/E2eReservationHistoryDetail.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createReservationHistoryDetailPage } from "../pages/ReservationHistoryDetail.page";
import { buildReservationHistoryDay } from "../support/buildReservationHistoryDay";
import { getMainRegion } from "../support/mainRegion";
import {
  expect,
  test,
} from "../support/reservationHistoryTest";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation history detail", () => {
  test("shows the closed record with who created it and who modified it last", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const record = await createHistoryRecord({
      startsAt: day.startsAt,
    });
    await signInAsSeededWorker(page);
    const detailPage =
      createReservationHistoryDetailPage(page);
    await detailPage.goToRecord(record.id);

    for (const {
      absent,
      label,
      present,
    } of detailPage.getExpectedFields({
      customerName: record.customerName,
      date: formatReservationHistoryDate(day.startsAt),
    })) {
      const field = detailPage.getField(label);
      await expect(field).toContainText(present);
      if (absent) {
        await expect(field).not.toContainText(absent);
      }
    }
    await expect(
      detailPage.getCancellationBlock()
    ).toHaveCount(E2E_COUNT.NONE);
  });

  test("shows the signature times and no money on the detail", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const record = await createHistoryRecord({
      startsAt:
        buildReservationHistoryDay(testInfo).startsAt,
    });
    await signInAsSeededWorker(page);
    const detailPage =
      createReservationHistoryDetailPage(page);
    await detailPage.goToRecord(record.id);

    await expect(
      detailPage.getField(COPY.CUSTOMER_LABEL)
    ).toContainText(record.customerName);
    for (const label of [
      COPY.CREATED_BY_LABEL,
      COPY.UPDATED_BY_LABEL,
    ]) {
      await expect(
        detailPage.getField(label)
      ).toContainText(E2E_RESERVATION_HISTORY_TIME_PATTERN);
    }
    await expect(
      detailPage.getSignatureCard()
    ).toContainText(COPY.SIGNATURE_TIME_ZONE_NOTE);
    for (const symbol of E2E_RESERVATION_HISTORY_MONEY_SYMBOLS) {
      await expect(getMainRegion(page)).not.toContainText(
        symbol
      );
    }
  });

  test("shows the cancellation reason of a cancelled record", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const record = await createHistoryRecord({
      cancellationReason:
        E2E_RESERVATION_HISTORY.CANCELLATION_REASON,
      startsAt:
        buildReservationHistoryDay(testInfo).startsAt,
      status: STATUS.CANCELLED,
    });
    await signInAsSeededWorker(page);
    const detailPage =
      createReservationHistoryDetailPage(page);
    await detailPage.goToRecord(record.id);

    await expect(
      detailPage.getCancellationBlock()
    ).toContainText(
      E2E_RESERVATION_HISTORY.CANCELLATION_REASON
    );
    await expect(
      detailPage.getField(COPY.STATUS_LABEL)
    ).toContainText(COPY.CANCELLED);
  });
});
