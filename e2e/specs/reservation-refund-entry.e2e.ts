import { RESERVATION_REFUND_FORM_COPY as copy } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON as reason } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundUnavailableCopy.constants";
import {
  E2E_RESERVATION_REFUND as values,
  E2E_RESERVATION_REFUND_CHARGES as charges,
} from "../constants/E2eReservationRefund.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailRefundPage } from "../pages/ReservationDetailRefund.page";
import { createReservationRefundPage } from "../pages/ReservationRefund.page";
import { createReservationRefundFixture as seed } from "../support/createReservationRefundFixture";
import {
  expect,
  test,
} from "../support/reservationRefundTest";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

test.describe("Reservation refund entry rules", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test("says there is nothing to refund when nothing was charged", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const reservation = await seed(
      activeWorker.id,
      testInfo.project.name,
      []
    );
    const refund = createReservationRefundPage(page);

    await refund.goTo(reservation.id);

    await expect(
      refund.getText(unavailable.TITLE)
    ).toBeVisible();
  });

  test("shows the button when only an extra time charge was recorded", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const reservation = await seed(
      activeWorker.id,
      testInfo.project.name,
      [charges.EXTRA_TIME_USD]
    );

    await createReservationDetailPage(page).goTo(
      reservation.id
    );

    await expect(
      createReservationDetailRefundPage(page).getRefundLink(
        reservation.code
      )
    ).toBeVisible();
  });

  test("keeps the button after a partial refund", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const reservation = await seed(
      activeWorker.id,
      testInfo.project.name,
      [charges.USD]
    );
    const refund = createReservationRefundPage(page);

    await refund.goTo(reservation.id);
    await refund.fillRefund(
      values.PARTIAL_AMOUNT,
      reason.CANCELLED_TRIP
    );
    await refund.submit();
    await expect(refund.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      submitWait
    );
    await refund.getBackLink().click();

    await expect(
      createReservationDetailRefundPage(page).getRefundLink(
        reservation.code
      )
    ).toBeVisible();
  });
});
