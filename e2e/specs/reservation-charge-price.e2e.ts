import { CURRENCY_CODE } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as copy } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeFormCopy.constants";
import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { expect, test } from "../support/activeWorkerTest";
import { openSeededCharge } from "../support/openSeededCharge";
import { readExpectedChargeProposal } from "../support/readExpectedChargeProposal";
import { readReservationChargeParts } from "../support/readReservationChargeParts";
import { removeReservationChargeFixtures } from "../support/removeReservationChargeFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

test.describe("Reservation charge price", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeReservationChargeFixtures(activeWorker);
  });

  test("accepts an amount far above the catalog proposal and keeps it as agreed", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const { charge, reservation } = await openSeededCharge(
      page,
      activeWorker.id,
      testInfo.project.name
    );
    const proposal = await readExpectedChargeProposal(
      activeWorker.id,
      reservation.id
    );
    const highAmount = Number(values.HIGH_AMOUNT);

    expect(highAmount).toBeGreaterThan(
      proposal * values.HIGH_AMOUNT_FACTOR
    );
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
      .toEqual([highAmount, highAmount]);
  });

  test("edits the price inside the reservation summary and nowhere else", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const { charge, reservation } = await openSeededCharge(
      page,
      activeWorker.id,
      testInfo.project.name
    );

    await expect(
      charge.getAmount(CURRENCY_CODE.USD)
    ).toHaveCount(1);
    await expect(charge.getSummaryAmount()).toHaveCount(1);
    await charge
      .getSummaryAmount()
      .fill(values.ADJUSTED_AMOUNT);
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
        Number(values.ADJUSTED_AMOUNT),
        Number(values.ADJUSTED_AMOUNT),
      ]);
  });
});
