import { RESERVATION_CANCELLATION_FEEDBACK_COPY as feedback } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationFeedbackCopy.constants";
import { RESERVATION_CANCELLATION_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationUnavailableCopy.constants";
import {
  E2E_RESERVATION_CANCELLATION as values,
  E2E_RESERVATION_CANCELLATION_SCREENSHOT_STATE as state,
} from "../constants/E2eReservationCancellation.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationCancellationPage } from "../pages/ReservationCancellation.page";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { createReservationCancellationFixture as seedCancellation } from "../support/createReservationCancellationFixture";
import { removeReservationCancellationFixtures } from "../support/removeReservationCancellationFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test("captures every reservation cancellation state", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const project = testInfo.project.name;
  const calendar = createReservationsCalendarPage(page);
  const cancellation =
    createReservationCancellationPage(page);
  const captureState = (name: string): Promise<void> =>
    captureFullPage(
      page,
      `${values.SCREENSHOT_BASENAME}-${name}`,
      project
    );

  try {
    const reservation = await seedCancellation(
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
    await expect(cancellation.getSubmit()).toBeVisible();
    await captureState(state.FORM);

    await cancellation.submit();
    await expect(
      cancellation.getText(feedback.REASON_REQUIRED)
    ).toBeVisible();
    await captureState(state.ERROR);

    await cancellation.fillReason(values.REASON);
    await cancellation.submit();
    await expect(cancellation.getStatus()).toBeVisible({
      timeout: E2E_TIMEOUT_MS.POST_SUBMIT,
    });
    await captureState(state.SUCCESS);

    await cancellation.goTo(reservation.id);
    await expect(
      cancellation.getText(unavailable.TITLE)
    ).toBeVisible();
    await captureState(state.UNAVAILABLE);
  } finally {
    await removeReservationCancellationFixtures(
      activeWorker
    );
  }
});
