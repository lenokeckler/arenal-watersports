import { PAYMENT_CHOICE } from "@/app/constants";
import { RESERVATION_DETAIL_EXTRA_TIME_STATE as DETAIL_STATE } from "@/app/features/reservations/reservation-detail/constants/ReservationDetail.constants";
import { RESERVATION_EXTRA_TIME_FORM_COPY as form } from "@/app/features/reservations/reservation-extra-time/constants/ReservationExtraTimeFormCopy.constants";
import { RESERVATION_EXTRA_TIME_OUTCOME as OUTCOME } from "@/app/features/reservations/reservation-extra-time/constants/ReservationExtraTimeOutcome.constants";
import {
  E2E_RESERVATION_EXTRA_TIME as values,
  E2E_RESERVATION_EXTRA_TIME_SCENARIO as SCENARIO,
  E2E_RESERVATION_EXTRA_TIME_SCREENSHOT_STATE as state,
} from "../constants/E2eReservationExtraTime.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailExtraTimePage } from "../pages/ReservationDetailExtraTime.page";
import { createReservationExtraTimePage } from "../pages/ReservationExtraTime.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { createReservationExtraTimeFixture as seed } from "../support/createReservationExtraTimeFixture";
import { removeReservationExtraTimeFixtures } from "../support/removeReservationExtraTimeFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test("captures every reservation extra time state", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const extraTime = createReservationExtraTimePage(page);
  const detail = createReservationDetailExtraTimePage(page);
  const captureState = (name: string): Promise<void> =>
    captureFullPage(
      page,
      `${values.SCREENSHOT_BASENAME}-${name}`,
      testInfo.project.name
    );

  try {
    const overdue = await seed(
      activeWorker.id,
      SCENARIO.OVERDUE
    );
    await createReservationDetailPage(page).goTo(
      overdue.id
    );
    await expect(
      detail.getState(
        DETAIL_STATE.PENDING,
        values.OVERDUE_DURATION
      )
    ).toBeVisible();
    await captureState(state.DETAIL);

    await detail.getResolveLink(overdue.code).click();
    await extraTime.chooseOutcome(OUTCOME.CHARGED);
    await extraTime.fillAmount(values.AMOUNT);
    await extraTime.choosePaymentMethod(
      PAYMENT_CHOICE.CASH
    );
    await captureState(state.FORM);

    await extraTime.submit(OUTCOME.CHARGED);
    await expect(extraTime.getStatus()).toHaveText(
      form.SUCCESS[OUTCOME.CHARGED](overdue.code),
      { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
    );
    await captureState(state.CHARGED);

    const postponed = await seed(
      activeWorker.id,
      SCENARIO.POSTPONED
    );
    await extraTime.goTo(postponed.id);
    await expect(extraTime.getGroups()).toBeVisible();
    await captureState(state.POSTPONED);

    const out = await seed(activeWorker.id, SCENARIO.OUT);
    await extraTime.goTo(out.id);
    await expect(extraTime.getStatus()).toBeVisible();
    await captureState(state.UNAVAILABLE);
  } finally {
    await removeReservationExtraTimeFixtures(activeWorker);
  }
});
