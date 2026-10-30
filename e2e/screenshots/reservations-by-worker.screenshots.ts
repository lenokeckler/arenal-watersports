import {
  E2E_RESERVATION,
  E2E_RESERVATION_SCREENSHOT,
} from "../constants/E2eReservationsByWorker.constants";
import { createReservationsByWorkerPage } from "../pages/ReservationsByWorker.page";
import { test } from "../support/activeWorkerTest";
import { createReservationsByWorkerReservation } from "../support/createReservationsByWorkerReservation";
import { readSeededAdmin } from "../support/readSeededAdmin";
import { captureFullPage } from "../support/captureFullPage";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservations by worker screenshots", () => {
  test("captures the report", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const admin = await readSeededAdmin();
    const reservation =
      await createReservationsByWorkerReservation(
        activeWorker.id,
        admin.id,
        `${E2E_RESERVATION.CUSTOMER_PREFIX}-${activeWorker.username}`
      );

    try {
      await signInAsSeededWorker(page);
      await createReservationsByWorkerPage(page).goTo();
      await captureFullPage(
        page,
        E2E_RESERVATION_SCREENSHOT.REPORT,
        testInfo.project.name
      );
    } finally {
      await reservation.remove();
    }
  });
});
