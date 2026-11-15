import { CURRENCY_CODE } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as copy } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeFormCopy.constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { E2E_WORKER } from "../constants/E2eWorker.constants";
import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationChargePage } from "../pages/ReservationCharge.page";
import { expect, test } from "../support/activeWorkerTest";
import { createReservationChargeFixture as seedCharge } from "../support/createReservationChargeFixture";
import { readReservationChargeParts } from "../support/readReservationChargeParts";
import { removeReservationChargeFixtures } from "../support/removeReservationChargeFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

const tariffPart = (amount: string, currency: string) => ({
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

  test("starts with one amount and a button that names the other currency", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedCharge(
      activeWorker.id,
      testInfo.project.name
    );
    const charge = createReservationChargePage(page);

    await charge.goTo(reservation.id);

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

  test("records an amount in each currency and lists both parts in the receipt", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedCharge(
      activeWorker.id,
      testInfo.project.name
    );
    const charge = createReservationChargePage(page);

    await charge.goTo(reservation.id);
    await charge
      .getAddSecondAmount(CURRENCY_CODE.CRC)
      .click();
    await charge.fillAmount(
      values.MIXED_AMOUNT_USD,
      CURRENCY_CODE.USD
    );
    await charge.fillAmount(
      values.MIXED_AMOUNT_CRC,
      CURRENCY_CODE.CRC
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

  test("returns to one amount when the second one is removed", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedCharge(
      activeWorker.id,
      testInfo.project.name
    );
    const charge = createReservationChargePage(page);

    await charge.goTo(reservation.id);
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

        return parts.charges.map((part) => part.currency);
      })
      .toEqual([CURRENCY_CODE.USD]);
  });

  test("accepts an amount far above the catalog proposal and keeps it as agreed", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedCharge(
      activeWorker.id,
      testInfo.project.name
    );
    const charge = createReservationChargePage(page);

    await charge.goTo(reservation.id);
    await charge.fillAmount(values.HIGH_AMOUNT);
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

        return [
          parts.charges[0]?.amount,
          parts.agreedAmountUsd,
        ];
      })
      .toEqual([
        Number(values.HIGH_AMOUNT),
        Number(values.HIGH_AMOUNT),
      ]);
  });

  test("edits the price inside the reservation summary", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedCharge(
      activeWorker.id,
      testInfo.project.name
    );
    const charge = createReservationChargePage(page);

    await charge.goTo(reservation.id);

    await expect(
      charge
        .getSummary()
        .getByLabel(copy.AMOUNT_LABEL[CURRENCY_CODE.USD])
    ).toBeVisible();
  });
});
