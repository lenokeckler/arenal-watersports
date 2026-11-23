import {
  CURRENCY_CODE,
  RESERVATION_STATUS,
} from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as copy } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeUnavailableCopy.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as validation } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeValidationCopy.constants";
import {
  E2E_RESERVATION_CHARGE as values,
  E2E_RESERVATION_CHARGE_SCREENSHOT_STATE as state,
} from "../constants/E2eReservationCharge.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationChargePage } from "../pages/ReservationCharge.page";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailChargePage } from "../pages/ReservationDetailCharge.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { createReservationChargeFixture as seedCharge } from "../support/createReservationChargeFixture";
import { createUsdOnlyChargeFixture } from "../support/createUsdOnlyChargeFixture";
import { openSeededCharge } from "../support/openSeededCharge";
import { removeReservationChargeFixtures } from "../support/removeReservationChargeFixtures";
import { removeUsdOnlyChargeFixture } from "../support/removeUsdOnlyChargeFixture";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test("captures every reservation charge state", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const project = testInfo.project.name;
  const charge = createReservationChargePage(page);
  const detailCharge =
    createReservationDetailChargePage(page);
  const captureState = (name: string): Promise<void> =>
    captureFullPage(
      page,
      `${values.SCREENSHOT_BASENAME}-${name}`,
      project
    );

  try {
    const cancelled = await seedCharge(
      activeWorker.id,
      project,
      RESERVATION_STATUS.CANCELLED
    );
    const reservation = await seedCharge(
      activeWorker.id,
      project
    );
    await createReservationDetailPage(page).goTo(
      reservation.id
    );
    await expect(
      detailCharge.getChargeLink(reservation.code)
    ).toBeVisible();
    await captureState(state.DETAIL);

    await detailCharge
      .getChargeLink(reservation.code)
      .click();
    await expect(charge.getSubmit()).toBeVisible();
    await captureState(state.FORM);

    await charge.submit();
    await expect(
      charge.getText(validation.METHOD_REQUIRED)
    ).toBeVisible();
    await captureState(state.ERROR);

    await charge.fillPaymentMethod(values.PAYMENT_METHOD);
    await charge.submit();
    await expect(charge.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
    );
    await captureState(state.SUCCESS);

    await charge.goTo(cancelled.id);
    await expect(
      charge.getText(unavailable.TITLE)
    ).toBeVisible();
    await captureState(state.UNAVAILABLE);

    const { charge: mixedCharge, reservation: mixed } =
      await openSeededCharge(
        page,
        activeWorker.id,
        project
      );
    await mixedCharge.fillMixedAmounts(
      values.MIXED_AMOUNT_USD,
      values.MIXED_AMOUNT_CRC
    );
    await captureState(state.MIXED);

    await mixedCharge.fillPaymentMethod(
      values.PAYMENT_METHOD
    );
    await mixedCharge.submit();
    await expect(mixedCharge.getStatus()).toHaveText(
      copy.SUCCESS(mixed.code),
      { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
    );
    await captureState(state.MIXED_SUCCESS);
  } finally {
    await removeReservationChargeFixtures(activeWorker);
  }
});

test("captures the charge currency group with colones chosen", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const project = testInfo.project.name;
  const charge = createReservationChargePage(page);
  const reservation = await createUsdOnlyChargeFixture(
    activeWorker.id,
    project
  );

  try {
    await charge.goTo(reservation.id);
    await charge.selectCurrency(CURRENCY_CODE.CRC);
    await expect(
      charge.getCurrencyOption(CURRENCY_CODE.CRC)
    ).toBeChecked();
    await captureFullPage(
      page,
      `${values.SCREENSHOT_BASENAME}-${state.CURRENCY}`,
      project
    );
  } finally {
    await removeUsdOnlyChargeFixture(
      activeWorker,
      reservation.categoryName
    );
  }
});
