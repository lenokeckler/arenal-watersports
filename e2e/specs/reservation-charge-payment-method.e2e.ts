import { RESERVATION_CHARGE_FORM_COPY as copy } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_PAYMENT_CHOICE as choice } from "@/app/features/reservations/reservation-charge/constants/ReservationChargePaymentChoice.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as validation } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeValidationCopy.constants";
import {
  E2E_RESERVATION_CHARGE as values,
  E2E_RESERVATION_CHARGE_PAYMENT_METHOD as methodValues,
} from "../constants/E2eReservationCharge.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationChargePage } from "../pages/ReservationCharge.page";
import { expect, test } from "../support/activeWorkerTest";
import { createReservationChargeFixture as seedCharge } from "../support/createReservationChargeFixture";
import { readReservationChargeState } from "../support/readReservationChargeState";
import { removeReservationChargeFixtures } from "../support/removeReservationChargeFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };
const sinpeLabel = copy.PAYMENT_CHOICE_LABEL[choice.SINPE];

test.describe("Reservation charge payment method", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeReservationChargeFixtures(activeWorker);
  });

  test(
    methodValues.TEST_TITLE_CHOICE,
    async ({ activeWorker, page }, testInfo) => {
      const reservation = await seedCharge(
        activeWorker.id,
        testInfo.project.name
      );
      const charge = createReservationChargePage(page);

      await charge.goTo(reservation.id);
      await charge.submit();
      await expect(
        charge.getText(validation.CHOICE_REQUIRED)
      ).toBeVisible();

      await charge.fillPaymentMethod(sinpeLabel);
      await charge.submit();

      await expect(charge.getStatus()).toHaveText(
        copy.SUCCESS(reservation.code),
        submitWait
      );
      await expect(
        charge.getText(sinpeLabel)
      ).toBeVisible();
      await expect
        .poll(
          async () =>
            (
              await readReservationChargeState(
                activeWorker.id,
                reservation.id
              )
            ).method
        )
        .toBe(sinpeLabel);
    }
  );

  test(
    methodValues.TEST_TITLE_OTHER,
    async ({ activeWorker, page }, testInfo) => {
      const reservation = await seedCharge(
        activeWorker.id,
        testInfo.project.name
      );
      const charge = createReservationChargePage(page);

      await charge.goTo(reservation.id);
      await charge.fillPaymentMethod(
        methodValues.OTHER_METHOD
      );
      await charge.submit();

      await expect(charge.getStatus()).toHaveText(
        copy.SUCCESS(reservation.code),
        submitWait
      );
      await expect(
        charge.getText(methodValues.OTHER_METHOD)
      ).toBeVisible();
      await expect
        .poll(
          async () =>
            (
              await readReservationChargeState(
                activeWorker.id,
                reservation.id
              )
            ).method
        )
        .toBe(methodValues.OTHER_METHOD);
    }
  );
});
