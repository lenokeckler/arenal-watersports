import { RESERVATION_REFUND_FORM_COPY as copy } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON as reason } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundUnavailableCopy.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as validation } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundValidationCopy.constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import {
  E2E_RESERVATION_REFUND as values,
  E2E_RESERVATION_REFUND_CHARGES as charges,
  E2E_RESERVATION_REFUND_SCREENSHOT_STATE as state,
} from "../constants/E2eReservationRefund.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailRefundPage } from "../pages/ReservationDetailRefund.page";
import { createReservationRefundPage } from "../pages/ReservationRefund.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { createReservationRefundFixture as seed } from "../support/createReservationRefundFixture";
import { removeReservationRefundFixtures } from "../support/removeReservationRefundFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test("captures every reservation refund state", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const project = testInfo.project.name;
  const refund = createReservationRefundPage(page);
  const detailRefund =
    createReservationDetailRefundPage(page);
  const captureState = (name: string): Promise<void> =>
    captureFullPage(
      page,
      `${values.SCREENSHOT_BASENAME}-${name}`,
      project
    );

  try {
    const empty = await seed(activeWorker.id, project, []);
    const reservation = await seed(
      activeWorker.id,
      project,
      [charges.USD, charges.CRC]
    );
    await createReservationDetailPage(page).goTo(
      reservation.id
    );
    await expect(
      detailRefund.getRefundLink(reservation.code)
    ).toBeVisible();
    await captureState(state.DETAIL);

    await detailRefund
      .getRefundLink(reservation.code)
      .click();
    await expect(refund.getSubmit()).toBeVisible();
    await captureState(state.FORM);

    await refund.fillRefund(
      values.ABOVE_NET_AMOUNT,
      reason.CANCELLED_TRIP
    );
    await refund.submit();
    await expect(
      refund.getText(
        validation.AMOUNT_ABOVE_AVAILABLE(
          formatMoney(charges.USD)
        )
      )
    ).toBeVisible();
    await captureState(state.ERROR);

    await refund.fillRefund(
      values.PARTIAL_AMOUNT,
      reason.OTHER
    );
    await refund.fillOtherReason(values.OTHER_REASON_TEXT);
    await captureState(state.OTHER);

    await refund.submit();
    await expect(refund.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
    );
    await captureState(state.SUCCESS);

    await refund.goTo(empty.id);
    await expect(
      refund.getText(unavailable.TITLE)
    ).toBeVisible();
    await captureState(state.UNAVAILABLE);
  } finally {
    await removeReservationRefundFixtures(activeWorker);
  }
});
