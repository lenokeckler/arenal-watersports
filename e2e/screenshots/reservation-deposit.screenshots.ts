import { CURRENCY_CODE } from "@/app/constants";
import { formatReservationDetailAmount } from "@/app/features/reservations/reservation-detail/utils/formatReservationDetailAmount";
import { RESERVATION_DEPOSIT_FORM_COPY as copy } from "@/app/features/reservations/reservation-deposit/constants/ReservationDepositFormCopy.constants";
import { RESERVATION_DEPOSIT_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/reservation-deposit/constants/ReservationDepositUnavailableCopy.constants";
import { RESERVATION_DEPOSIT_VALIDATION_COPY as validation } from "@/app/features/reservations/reservation-deposit/constants/ReservationDepositValidationCopy.constants";
import {
  E2E_RESERVATION_DEPOSIT as values,
  E2E_RESERVATION_DEPOSIT_SCREENSHOT_STATE as state,
} from "../constants/E2eReservationDeposit.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationDepositPage } from "../pages/ReservationDeposit.page";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailDepositPage } from "../pages/ReservationDetailDeposit.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { createReservationDepositFixture as seed } from "../support/createReservationDepositFixture";
import { removeReservationDepositFixtures } from "../support/removeReservationDepositFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

test("captures every reservation deposit state", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const project = testInfo.project.name;
  const deposit = createReservationDepositPage(page);
  const detailDeposit =
    createReservationDetailDepositPage(page);
  const captureState = (name: string): Promise<void> =>
    captureFullPage(
      page,
      `${values.SCREENSHOT_BASENAME}-${name}`,
      project
    );

  try {
    const reservation = await seed(
      activeWorker.id,
      project
    );
    const declined = await seed(activeWorker.id, project);
    await createReservationDetailPage(page).goTo(
      reservation.id
    );
    await expect(
      detailDeposit.getDepositLink(reservation.code)
    ).toBeVisible();
    await captureState(state.DETAIL);

    await detailDeposit
      .getDepositLink(reservation.code)
      .click();
    await expect(deposit.getSubmit()).toBeVisible();
    await captureState(state.FORM);

    await deposit.getAmount().fill(values.INVALID_AMOUNT);
    await deposit.submit();
    await expect(
      deposit.getText(validation.AMOUNT.format)
    ).toBeVisible();
    await captureState(state.ERROR);

    await deposit.getAmount().fill(values.EDITED_AMOUNT);
    await deposit.submit();
    await expect(deposit.getStatus()).toHaveText(
      copy.SUCCESS_RECEIVED(reservation.code),
      submitWait
    );
    await captureState(state.SUCCESS);

    await deposit.getBackLink().click();
    await expect(
      detailDeposit.getText(
        formatReservationDetailAmount(
          values.EDITED_AMOUNT_VALUE,
          CURRENCY_CODE.USD
        )
      )
    ).toBeVisible(submitWait);
    await expect(
      detailDeposit.getDepositLink(reservation.code)
    ).toHaveCount(0);
    await captureState(state.DETAIL_RECORDED);

    await deposit.goTo(declined.id);
    await deposit.chooseDeclined();
    await expect(
      deposit.getText(copy.DECISION_DECLINED_NOTE)
    ).toBeVisible();
    await captureState(state.DECLINED);

    await deposit.goTo(reservation.id);
    await expect(
      deposit.getText(unavailable.TITLE.already_decided)
    ).toBeVisible();
    await captureState(state.UNAVAILABLE);
  } finally {
    await removeReservationDepositFixtures(
      activeWorker,
      project
    );
  }
});
