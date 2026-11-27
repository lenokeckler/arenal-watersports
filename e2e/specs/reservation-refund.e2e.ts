import { CURRENCY_CODE } from "@/app/constants";
import { RESERVATION_REFUND_FORM_COPY as copy } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON as reason } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_REASON_COPY as reasonCopy } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundReasonCopy.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as validation } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundValidationCopy.constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import {
  E2E_RESERVATION_REFUND as values,
  E2E_RESERVATION_REFUND_CHARGES as charges,
} from "../constants/E2eReservationRefund.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { E2E_WORKER } from "../constants/E2eWorker.constants";
import { createReservationRefundPage } from "../pages/ReservationRefund.page";
import { createReservationRefundFixture as seed } from "../support/createReservationRefundFixture";
import { readReservationRefundState } from "../support/readReservationRefundState";
import {
  expect,
  test,
} from "../support/reservationRefundTest";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

test.describe("Reservation refund", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test("records a refund with a preset reason under the worker who made it", async ({
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
      reason.CUT_SHORT_TRIP
    );
    await refund.submit();

    await expect(refund.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      submitWait
    );
    await expect(
      refund.getText(copy.RECORDED_BY(E2E_WORKER.FULL_NAME))
    ).toBeVisible();
    await expect(
      refund.getText(
        formatMoney({
          amount: values.PARTIAL_AMOUNT_VALUE,
          currency: CURRENCY_CODE.USD,
        })
      )
    ).toBeVisible();
    await expect
      .poll(() =>
        readReservationRefundState(
          activeWorker.id,
          reservation.id
        )
      )
      .toEqual({
        amount: values.PARTIAL_AMOUNT_VALUE,
        currency: CURRENCY_CODE.USD,
        isAuthor: true,
        reason: reasonCopy[reason.CUT_SHORT_TRIP],
        recordedByName: E2E_WORKER.FULL_NAME,
        refunds: 1,
      });
  });

  test("refuses an amount above the net and stores nothing", async ({
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
    await expect(refund.getStatus()).toHaveCount(0);
    expect(
      (
        await readReservationRefundState(
          activeWorker.id,
          reservation.id
        )
      ).refunds
    ).toBe(0);
  });
});
