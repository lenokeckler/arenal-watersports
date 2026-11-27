import {
  CURRENCY_CODE,
  RESERVATION_STATUS,
} from "@/app/constants";
import { RESERVATION_REFUND_FORM_COPY as copy } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON as reason } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as validation } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundValidationCopy.constants";
import {
  E2E_RESERVATION_REFUND as values,
  E2E_RESERVATION_REFUND_CHARGES as charges,
} from "../constants/E2eReservationRefund.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailRefundPage } from "../pages/ReservationDetailRefund.page";
import { createReservationRefundPage } from "../pages/ReservationRefund.page";
import { createReservationRefundFixture as seed } from "../support/createReservationRefundFixture";
import { readReservationRefundState } from "../support/readReservationRefundState";
import {
  expect,
  test,
} from "../support/reservationRefundTest";
import { readReservationNetAmount } from "../support/readReservationNetAmount";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };
const readUsdNet = (
  reservationId: string
): Promise<number> =>
  readReservationNetAmount(
    reservationId,
    CURRENCY_CODE.USD
  );

test.describe("Reservation refund rules", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  for (const status of [
    RESERVATION_STATUS.CLOSED,
    RESERVATION_STATUS.CANCELLED,
  ]) {
    test(`refunds a ${status} reservation`, async ({
      activeWorker,
      reservationsPage: page,
    }, testInfo) => {
      const reservation = await seed(
        activeWorker.id,
        testInfo.project.name,
        [charges.USD],
        status
      );
      const refund = createReservationRefundPage(page);

      await createReservationDetailPage(page).goTo(
        reservation.id
      );
      await createReservationDetailRefundPage(page)
        .getRefundLink(reservation.code)
        .click();
      await refund.fillRefund(
        values.PARTIAL_AMOUNT,
        reason.CANCELLED_TRIP
      );
      await refund.submit();

      await expect(refund.getStatus()).toHaveText(
        copy.SUCCESS(reservation.code),
        submitWait
      );
      await expect
        .poll(
          async () =>
            (
              await readReservationRefundState(
                activeWorker.id,
                reservation.id
              )
            ).refunds
        )
        .toBe(1);
    });
  }

  test("lowers the net of its reservation by the refunded amount", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const reservation = await seed(
      activeWorker.id,
      testInfo.project.name,
      [charges.USD]
    );
    const refund = createReservationRefundPage(page);
    const netBefore = await readUsdNet(reservation.id);

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

    expect(await readUsdNet(reservation.id)).toBeCloseTo(
      netBefore - values.PARTIAL_AMOUNT_VALUE,
      2
    );
  });

  test("requires the free text of Otro and stores it as the reason", async ({
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
      reason.OTHER
    );
    await refund.submit();
    await expect(
      refund.getText(validation.OTHER_REQUIRED)
    ).toBeVisible();

    await refund.fillOtherReason(values.OTHER_REASON_TEXT);
    await refund.submit();

    await expect(refund.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      submitWait
    );
    await expect
      .poll(async () => {
        const state = await readReservationRefundState(
          activeWorker.id,
          reservation.id
        );

        return [state.refunds, state.reason];
      })
      .toEqual([1, values.OTHER_REASON_TEXT]);
  });
});
