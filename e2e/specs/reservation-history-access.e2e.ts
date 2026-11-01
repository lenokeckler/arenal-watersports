import { E2E_RESERVATION_HISTORY_COPY as COPY } from "../constants/E2eReservationHistory.constants";
import { createReservationHistoryDetailPage } from "../pages/ReservationHistoryDetail.page";
import { createReservationHistoryPage } from "../pages/ReservationHistory.page";
import { buildReservationHistoryDay } from "../support/buildReservationHistoryDay";
import { RESERVATION_HISTORY_ACCESS_MODES } from "../support/reservationHistoryAccessModes";
import {
  expect,
  test,
} from "../support/reservationHistoryTest";

test.describe("Reservation history access", () => {
  for (const mode of RESERVATION_HISTORY_ACCESS_MODES) {
    test(`opens the list and the detail in ${mode.title} mode`, async ({
      activeWorker,
      createHistoryRecord,
      page,
    }, testInfo) => {
      const day = buildReservationHistoryDay(testInfo);
      const record = await createHistoryRecord({
        startsAt: day.startsAt,
      });
      await mode.signIn(page, activeWorker);
      const historyPage =
        createReservationHistoryPage(page);
      await historyPage.goTo(day.query);

      await expect(historyPage.getHeading()).toHaveText(
        COPY.PAGE_TITLE
      );
      await historyPage
        .getRecord(record.customerName)
        .click();
      const detailPage =
        createReservationHistoryDetailPage(page);

      await expect(
        detailPage.getField(COPY.CUSTOMER_LABEL)
      ).toContainText(record.customerName);
    });
  }
});
