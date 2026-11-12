import { RESERVATION_CANCELLATION_CAUSE } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationCause.constants";
import { RESERVATION_CANCELLATION_CAUSE_COPY as causeCopy } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationCauseCopy.constants";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as feedback } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationFeedbackCopy.constants";
import { RESERVATION_CANCELLATION_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationUnavailableCopy.constants";
import { E2E_RESERVATION_CANCELLATION as cancellation } from "../constants/E2eReservationCancellation.constants";
import {
  E2E_RESERVATION_DISPATCHED_CANCELLATION as values,
  E2E_RESERVATION_DISPATCHED_CANCELLATION_SCREENSHOT_STATE as state,
} from "../constants/E2eReservationDispatchedCancellation.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createOutOnWaterPage } from "../pages/OutOnWater.page";
import { createReservationCancellationPage } from "../pages/ReservationCancellation.page";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { createDispatchedCancellationFixture } from "../support/createDispatchedCancellationFixture";
import { removeDispatchedCancellationFixtures } from "../support/removeDispatchedCancellationFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";
import { switchToOperationsMode } from "../support/switchToOperationsMode";

const causeLabel =
  causeCopy[RESERVATION_CANCELLATION_CAUSE.WEATHER].label;

test("captures every dispatched cancellation state", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const project = testInfo.project.name;
  const calendar = createReservationsCalendarPage(page);
  const form = createReservationCancellationPage(page);
  const outOnWater = createOutOnWaterPage(page);
  const captureState = (name: string): Promise<void> =>
    captureFullPage(
      page,
      `${values.SCREENSHOT_BASENAME}-${name}`,
      project
    );

  try {
    const reservation =
      await createDispatchedCancellationFixture(
        activeWorker.id,
        project
      );
    await calendar.goTo();
    await expect(
      calendar.getCancelLink(reservation.customerName)
    ).toBeVisible();
    await captureState(state.CALENDAR);

    await calendar
      .getCancelLink(reservation.customerName)
      .click();
    await expect(form.getSubmit()).toBeVisible();
    await captureState(state.FORM);

    await form.submit();
    await expect(
      form.getText(feedback.CAUSE_REQUIRED)
    ).toBeVisible();
    await captureState(state.CAUSE_ERROR);

    await form.selectCause(causeLabel);
    await form.submit();
    await expect(
      form.getText(feedback.REASON_REQUIRED)
    ).toBeVisible();
    await captureState(state.REASON_ERROR);

    await form.fillReason(cancellation.REASON);
    await captureState(state.CAUSE_SELECTED);

    await form.submit();
    await expect(form.getStatus()).toBeVisible({
      timeout: E2E_TIMEOUT_MS.POST_SUBMIT,
    });
    await captureState(state.SUCCESS);

    await form.goTo(reservation.id);
    await expect(
      form.getText(unavailable.TITLE)
    ).toBeVisible();
    await captureState(state.UNAVAILABLE);

    await switchToOperationsMode(page, activeWorker);
    await outOnWater.goTo();
    await expect(
      outOnWater.getGroup(reservation.customerName)
    ).toBeVisible();
    await captureState(state.OUT_ON_WATER);
  } finally {
    await removeDispatchedCancellationFixtures(
      activeWorker
    );
  }
});
