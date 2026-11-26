import { CURRENCY_CODE } from "@/app/constants";
import { RESERVATION_REFUND_FORM_COPY as copy } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON as reason } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundReason.constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import {
  E2E_RESERVATION_REFUND as values,
  E2E_RESERVATION_REFUND_CHARGES as charges,
} from "../constants/E2eReservationRefund.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailChargePage } from "../pages/ReservationDetailCharge.page";
import { createReservationDetailRefundPage } from "../pages/ReservationDetailRefund.page";
import { createReservationRefundPage } from "../pages/ReservationRefund.page";
import { createReservationRefundFixture as seed } from "../support/createReservationRefundFixture";
import {
  expect,
  test,
} from "../support/reservationRefundTest";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

test.describe("Reservation refund button", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test("hides the refund button while nothing was charged", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const reservation = await seed(
      activeWorker.id,
      testInfo.project.name,
      []
    );

    await createReservationDetailPage(page).goTo(
      reservation.id
    );

    await expect(
      createReservationDetailChargePage(page).getChargeLink(
        reservation.code
      )
    ).toBeVisible();
    await expect(
      createReservationDetailRefundPage(page).getRefundLink(
        reservation.code
      )
    ).toHaveCount(0);
  });

  test("shows the button after a charge and lists what is available in each currency apart", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const reservation = await seed(
      activeWorker.id,
      testInfo.project.name,
      [charges.USD, charges.CRC]
    );
    const refund = createReservationRefundPage(page);

    await createReservationDetailPage(page).goTo(
      reservation.id
    );
    await createReservationDetailRefundPage(page)
      .getRefundLink(reservation.code)
      .click();

    await expect(
      refund.getAvailableFigure(CURRENCY_CODE.USD)
    ).toHaveText(formatMoney(charges.USD));
    await expect(
      refund.getAvailableFigure(CURRENCY_CODE.CRC)
    ).toHaveText(formatMoney(charges.CRC));
  });

  test("removes the button once the whole net was refunded", async ({
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
      values.FULL_AMOUNT,
      reason.CANCELLED_TRIP
    );
    await refund.submit();
    await expect(refund.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      submitWait
    );
    await refund.getBackLink().click();

    await expect(
      createReservationDetailChargePage(page).getChargeLink(
        reservation.code
      )
    ).toBeVisible();
    await expect(
      createReservationDetailRefundPage(page).getRefundLink(
        reservation.code
      )
    ).toHaveCount(0);
  });
});
