import { CURRENCY_CODE } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as copy } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeFormCopy.constants";
import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { expect, test } from "../support/activeWorkerTest";
import { openSeededCharge } from "../support/openSeededCharge";
import { readReservationChargeParts } from "../support/readReservationChargeParts";
import { removeReservationChargeFixtures } from "../support/removeReservationChargeFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

test.describe("Reservation charge second currency field", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeReservationChargeFixtures(activeWorker);
  });

  test("starts with one amount and a button that names the other currency", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const { charge } = await openSeededCharge(
      page,
      activeWorker.id,
      testInfo.project.name
    );

    await expect(
      charge.getAmount(CURRENCY_CODE.USD)
    ).toBeVisible();
    await expect(
      charge.getAmount(CURRENCY_CODE.CRC)
    ).toHaveCount(0);
    await expect(
      charge.getAddSecondAmount(CURRENCY_CODE.CRC)
    ).toBeVisible();
  });

  test("returns to one amount when the second one is removed", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const { charge, reservation } = await openSeededCharge(
      page,
      activeWorker.id,
      testInfo.project.name
    );

    await charge
      .getAddSecondAmount(CURRENCY_CODE.CRC)
      .click();
    await expect(
      charge.getAmount(CURRENCY_CODE.CRC)
    ).toBeVisible();
    await charge
      .getRemoveSecondAmount(CURRENCY_CODE.CRC)
      .click();
    await expect(
      charge.getAmount(CURRENCY_CODE.CRC)
    ).toHaveCount(0);
    await charge.fillPaymentMethod(values.PAYMENT_METHOD);
    await charge.submit();

    await expect(charge.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      submitWait
    );
    await expect
      .poll(async () => {
        const parts = await readReservationChargeParts(
          activeWorker.id,
          reservation.id
        );

        return {
          agreedAmountCrc: parts.agreedAmountCrc,
          currencies: parts.charges.map(
            (part) => part.currency
          ),
          pricingRows: parts.pricingRows,
        };
      })
      .toEqual({
        agreedAmountCrc: null,
        currencies: [CURRENCY_CODE.USD],
        pricingRows: 1,
      });
  });
});
