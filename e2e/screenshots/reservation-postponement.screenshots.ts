import { RESERVATION_POSTPONEMENT_CAUSE as cause } from "@/app/features/reservations/reservation-postponement/constants/ReservationPostponementCause.constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as feedback } from "@/app/features/reservations/reservation-postponement/constants/ReservationPostponementFeedbackCopy.constants";
import {
  E2E_RESERVATION_POSTPONEMENT as values,
  E2E_RESERVATION_POSTPONEMENT_SCREENSHOT_STATE as state,
} from "../constants/E2eReservationPostponement.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationPostponementPage } from "../pages/ReservationPostponement.page";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { expect, test } from "../support/activeWorkerTest";
import { buildCostaRicaTomorrow } from "../support/buildCostaRicaTomorrow";
import { captureFullPage } from "../support/captureFullPage";
import { createReservationPostponementFixture as seedPostponement } from "../support/createReservationPostponementFixture";
import { removeReservationPostponementFixtures } from "../support/removeReservationPostponementFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test("captures every reservation postponement state", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const project = testInfo.project.name;
  const calendar = createReservationsCalendarPage(page);
  const postponement =
    createReservationPostponementPage(page);
  const captureState = (name: string): Promise<void> =>
    captureFullPage(
      page,
      `${values.SCREENSHOT_BASENAME}-${name}`,
      project
    );

  try {
    const scheduled = await seedPostponement(
      activeWorker.id,
      project
    );
    await calendar.goTo();
    await expect(
      calendar.getPostponeLink(scheduled.customerName)
    ).toBeVisible();
    await captureState(state.CALENDAR);

    await calendar
      .getPostponeLink(scheduled.customerName)
      .click();
    await expect(postponement.getSubmit()).toBeVisible();
    await captureState(state.FORM);

    await postponement.submit();
    await expect(
      postponement.getText(feedback.CAUSE_REQUIRED)
    ).toBeVisible();
    await captureState(state.ERROR);

    await postponement.fillDate(buildCostaRicaTomorrow());
    await postponement.chooseCause(cause.OTHER);
    await postponement.fillReason(values.OTHER_REASON);
    await captureState(state.OTHER_REASON);

    await postponement.submit();
    await expect(postponement.getStatus()).toBeVisible({
      timeout: E2E_TIMEOUT_MS.POST_SUBMIT,
    });
    await captureState(state.SUCCESS);

    const dispatched = await seedPostponement(
      activeWorker.id,
      project,
      true
    );
    await postponement.goTo(dispatched.id);
    await expect(postponement.getSubmit()).toBeVisible();
    await captureState(state.DISPATCHED);

    await postponement.chooseCause(cause.HEAVY_RAIN);
    await postponement.submit();
    await expect(
      postponement
        .getUnit(dispatched.unit)
        .getByText(feedback.READING_FUEL_REQUIRED)
    ).toBeVisible();
    await captureState(state.READINGS_ERROR);
  } finally {
    await removeReservationPostponementFixtures(
      activeWorker,
      project
    );
  }
});
