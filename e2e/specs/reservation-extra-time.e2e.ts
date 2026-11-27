import {
  PAYMENT_CHOICE,
  PAYMENT_CHOICE_COPY,
} from "@/app/constants";
import { RESERVATION_DETAIL_EXTRA_TIME_STATE as DETAIL_STATE } from "@/app/features/reservations/reservation-detail/constants/ReservationDetail.constants";
import { RESERVATION_EXTRA_TIME_FORM_COPY as form } from "@/app/features/reservations/reservation-extra-time/constants/ReservationExtraTimeFormCopy.constants";
import { RESERVATION_EXTRA_TIME_OUTCOME as OUTCOME } from "@/app/features/reservations/reservation-extra-time/constants/ReservationExtraTimeOutcome.constants";
import { RESERVATION_EXTRA_TIME_SOURCE as SOURCE } from "@/app/features/reservations/reservation-extra-time/constants/ReservationExtraTimeSource.constants";
import { RESERVATION_EXTRA_TIME_UI_COPY as ui } from "@/app/features/reservations/reservation-extra-time/constants/ReservationExtraTimeUiCopy.constants";
import { RESERVATION_EXTRA_TIME_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/reservation-extra-time/constants/ReservationExtraTimeUnavailableCopy.constants";
import { RESERVATION_EXTRA_TIME_UNAVAILABLE_REASON as REASON } from "@/app/features/reservations/reservation-extra-time/constants/ReservationExtraTimeUnavailableReason.constants";
import { E2E_WORKER } from "../constants/E2eWorker.constants";
import {
  E2E_RESERVATION_EXTRA_TIME as values,
  E2E_RESERVATION_EXTRA_TIME_SCENARIO as SCENARIO,
} from "../constants/E2eReservationExtraTime.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailExtraTimePage } from "../pages/ReservationDetailExtraTime.page";
import { createReservationExtraTimePage } from "../pages/ReservationExtraTime.page";
import { expect, test } from "../support/activeWorkerTest";
import { createReservationExtraTimeFixture as seed } from "../support/createReservationExtraTimeFixture";
import { readReservationExtraTimeState } from "../support/readReservationExtraTimeState";
import { removeReservationExtraTimeFixtures } from "../support/removeReservationExtraTimeFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

test.describe("Reservation extra time", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeReservationExtraTimeFixtures(activeWorker);
  });

  test("charges the minutes a group stayed past its hour, from the detail, apart from the tariff", async ({
    activeWorker,
    page,
  }) => {
    const reservation = await seed(
      activeWorker.id,
      SCENARIO.OVERDUE
    );
    const detail =
      createReservationDetailExtraTimePage(page);
    const extraTime = createReservationExtraTimePage(page);

    await createReservationDetailPage(page).goTo(
      reservation.id
    );
    await expect(
      detail.getState(
        DETAIL_STATE.PENDING,
        values.OVERDUE_DURATION
      )
    ).toBeVisible();
    await detail.getResolveLink(reservation.code).click();

    await expect(extraTime.getGroupItems()).toHaveCount(1);
    await expect(extraTime.getGroupItems()).toContainText(
      ui.SOURCE[SOURCE.OVERDUE]
    );
    await expect(extraTime.getGroups()).toContainText(
      values.SCREEN_DURATION.OVERDUE
    );
    await extraTime.chooseOutcome(OUTCOME.CHARGED);
    await extraTime.fillAmount(values.AMOUNT);
    await extraTime.choosePaymentMethod(
      PAYMENT_CHOICE.CASH
    );
    await extraTime.submit(OUTCOME.CHARGED);

    await expect(extraTime.getStatus()).toHaveText(
      form.SUCCESS[OUTCOME.CHARGED](reservation.code),
      submitWait
    );
    await expect(
      extraTime.getText(
        form.RECORDED_BY(E2E_WORKER.FULL_NAME)
      )
    ).toBeVisible();
    await expect
      .poll(() =>
        readReservationExtraTimeState(
          activeWorker.id,
          reservation.id
        )
      )
      .toEqual({
        chargeRows: [
          values.CHARGE_KIND,
          Number(values.AMOUNT).toFixed(2),
          values.CURRENCY,
          PAYMENT_CHOICE_COPY[PAYMENT_CHOICE.CASH],
        ].join(values.ID_CODE_SEPARATOR),
        charges: 1,
        minutes: String(values.OVERDUE_MINUTES),
        outcome: OUTCOME.CHARGED,
      });

    await createReservationDetailPage(page).goTo(
      reservation.id
    );
    await expect(
      detail.getState(
        DETAIL_STATE.CHARGED,
        values.OVERDUE_DURATION
      )
    ).toBeVisible();
    await expect(
      detail.getResolveLink(reservation.code)
    ).toHaveCount(0);
  });

  test("lets an extension of Operaciones go as a courtesy, without money", async ({
    activeWorker,
    page,
  }) => {
    const reservation = await seed(
      activeWorker.id,
      SCENARIO.EXTENDED
    );
    const extraTime = createReservationExtraTimePage(page);

    await extraTime.goTo(reservation.id);
    await expect(extraTime.getGroupItems()).toContainText(
      ui.EXTENDED_BY(values.SCREEN_DURATION.EXTENDED)
    );
    await extraTime.chooseOutcome(OUTCOME.COURTESY);
    await extraTime.submit(OUTCOME.COURTESY);

    await expect(extraTime.getStatus()).toHaveText(
      form.SUCCESS[OUTCOME.COURTESY](reservation.code),
      submitWait
    );
    await expect
      .poll(() =>
        readReservationExtraTimeState(
          activeWorker.id,
          reservation.id
        )
      )
      .toEqual({
        chargeRows: "",
        charges: 0,
        minutes: String(values.EXTENDED_MINUTES),
        outcome: OUTCOME.COURTESY,
      });
  });

  test("counts only the new departure of a reservation postponed after dispatch", async ({
    activeWorker,
    page,
  }) => {
    const reservation = await seed(
      activeWorker.id,
      SCENARIO.POSTPONED
    );
    const extraTime = createReservationExtraTimePage(page);

    await extraTime.goTo(reservation.id);

    await expect(extraTime.getGroupItems()).toHaveCount(1);
    await expect(extraTime.getGroups()).toContainText(
      values.SCREEN_DURATION.POSTPONED
    );
  });

  test("waits while a group is still out", async ({
    activeWorker,
    page,
  }) => {
    const reservation = await seed(
      activeWorker.id,
      SCENARIO.OUT
    );
    const extraTime = createReservationExtraTimePage(page);

    await extraTime.goTo(reservation.id);

    await expect(extraTime.getStatus()).toContainText(
      unavailable.BODY[REASON.GROUPS_OUT]
    );
  });
});
