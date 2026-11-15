import { CURRENCY_CODE } from "@/app/constants";
import type { CurrencyCode } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as copy } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeFormCopy.constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { E2E_WORKER } from "../constants/E2eWorker.constants";
import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { expect, test } from "../support/activeWorkerTest";
import type { ReservationChargePartRow } from "../support/models/ReservationChargePartRow.interface";
import { openSeededCharge } from "../support/openSeededCharge";
import { readReservationChargeParts } from "../support/readReservationChargeParts";
import { removeReservationChargeFixtures } from "../support/removeReservationChargeFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

const tariffPart = (
  amount: string,
  currency: CurrencyCode
): ReservationChargePartRow => ({
  amount: Number(amount),
  currency,
  isAuthor: true,
  kind: values.CHARGE_KIND,
  method: values.PAYMENT_METHOD,
});

test.describe("Reservation charge in two currencies", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeReservationChargeFixtures(activeWorker);
  });

  test("records an amount in each currency and lists both parts in the receipt", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const { charge, reservation } = await openSeededCharge(
      page,
      activeWorker.id,
      testInfo.project.name
    );

    await charge.fillMixedAmounts(
      values.MIXED_AMOUNT_USD,
      values.MIXED_AMOUNT_CRC
    );
    await charge.fillPaymentMethod(values.PAYMENT_METHOD);
    await charge.submit();

    await expect(charge.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      submitWait
    );
    await expect(
      charge.getText(
        formatMoney({
          amount: Number(values.MIXED_AMOUNT_USD),
          currency: CURRENCY_CODE.USD,
        })
      )
    ).toBeVisible();
    await expect(
      charge.getText(
        formatMoney({
          amount: Number(values.MIXED_AMOUNT_CRC),
          currency: CURRENCY_CODE.CRC,
        })
      )
    ).toBeVisible();
    await expect(
      charge.getText(copy.RECORDED_BY(E2E_WORKER.FULL_NAME))
    ).toBeVisible();
    await expect
      .poll(() =>
        readReservationChargeParts(
          activeWorker.id,
          reservation.id
        )
      )
      .toEqual({
        agreedAmountCrc: Number(values.MIXED_AMOUNT_CRC),
        agreedAmountUsd: Number(values.MIXED_AMOUNT_USD),
        charges: [
          tariffPart(
            values.MIXED_AMOUNT_USD,
            CURRENCY_CODE.USD
          ),
          tariffPart(
            values.MIXED_AMOUNT_CRC,
            CURRENCY_CODE.CRC
          ),
        ],
        pricingRows: 1,
      });
  });
});
