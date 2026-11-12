import { RESERVATION_SPLIT_BLOCK } from "@/app/features/reservations/reservation-split/constants/ReservationSplitBlock.constants";
import { RESERVATION_SPLIT_FEEDBACK_COPY as feedback } from "@/app/features/reservations/reservation-split/constants/ReservationSplitFeedbackCopy.constants";
import { RESERVATION_SPLIT_UI_COPY as copy } from "@/app/features/reservations/reservation-split/constants/ReservationSplitUiCopy.constants";
import { RESERVATION_SPLIT_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/reservation-split/constants/ReservationSplitUnavailableCopy.constants";
import {
  E2E_RESERVATION_SPLIT as values,
  E2E_RESERVATION_SPLIT_SCREENSHOT_STATE as state,
} from "../constants/E2eReservationSplit.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationSplitPage } from "../pages/ReservationSplit.page";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { createReservationSplitFixture as seedSplit } from "../support/createReservationSplitFixture";
import { removeReservationSplitFixtures } from "../support/removeReservationSplitFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test("captures every reservation split state", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const project = testInfo.project.name;
  const calendar = createReservationsCalendarPage(page);
  const split = createReservationSplitPage(page);
  const captureState = (name: string): Promise<void> =>
    captureFullPage(
      page,
      `${values.SCREENSHOT_BASENAME}-${name}`,
      project
    );

  try {
    const original = await seedSplit(
      activeWorker.id,
      project
    );
    const locked = await seedSplit(
      activeWorker.id,
      project,
      {
        status: values.UNAVAILABLE_STATUS,
      }
    );
    await calendar.goTo();
    await expect(
      calendar.getSplitLink(original.customerName)
    ).toBeVisible();
    await captureState(state.CALENDAR);

    await calendar
      .getSplitLink(original.customerName)
      .click();
    await expect(split.getSubmit()).toBeVisible();
    await captureState(state.FORM);

    await split.submit();
    await expect(
      split.getText(feedback.TIME_REQUIRED)
    ).toBeVisible();
    await captureState(state.ERROR);

    await split.fillDeparture(original);
    await split.getAddDeparture().click();
    await captureState(state.TWO_DEPARTURES);

    await split.goTo(original.id);
    await split.fillDeparture(original);
    await split.submit();
    await expect(
      split.getText(
        copy.SUCCESS(values.EXPECTED_DEPARTURES)
      )
    ).toBeVisible({ timeout: E2E_TIMEOUT_MS.POST_SUBMIT });
    await captureState(state.SUCCESS);

    await split.goTo(locked.id);
    await expect(
      split.getText(
        unavailable[RESERVATION_SPLIT_BLOCK.NOT_SCHEDULED]
          .title
      )
    ).toBeVisible();
    await captureState(state.UNAVAILABLE);

    await calendar.goTo();
    await expect(
      calendar.getOriginBlock(
        original.customerName,
        original.code
      )
    ).toBeVisible();
    await captureState(state.ORIGIN_MARKER);
  } finally {
    await removeReservationSplitFixtures(activeWorker);
  }
});
