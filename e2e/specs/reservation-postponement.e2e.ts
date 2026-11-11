import { RESERVATION_POSTPONEMENT_CAUSE as cause } from "@/app/features/reservations/reservation-postponement/constants/ReservationPostponementCause.constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as feedback } from "@/app/features/reservations/reservation-postponement/constants/ReservationPostponementFeedbackCopy.constants";
import { RESERVATION_POSTPONEMENT_FORM_COPY as copy } from "@/app/features/reservations/reservation-postponement/constants/ReservationPostponementFormCopy.constants";
import { E2E_RESERVATION_POSTPONEMENT as values } from "../constants/E2eReservationPostponement.constants";
import { E2E_RESERVATION_POSTPONEMENT_SQL as sql } from "../constants/E2eReservationPostponementSql.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationPostponementPage } from "../pages/ReservationPostponement.page";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { expect, test } from "../support/activeWorkerTest";
import { buildCostaRicaTomorrow } from "../support/buildCostaRicaTomorrow";
import { createReservationPostponementFixture as seedPostponement } from "../support/createReservationPostponementFixture";
import { readReservationPostponementState } from "../support/readReservationPostponementState";
import { removeReservationPostponementFixtures } from "../support/removeReservationPostponementFixtures";
import { runWorkerSql } from "../support/runWorkerSql";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

test.describe("Reservation postponement", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }, testInfo) => {
    await removeReservationPostponementFixtures(
      activeWorker,
      testInfo.project.name
    );
  });

  test("postpones a scheduled reservation from the calendar for another reason, keeping its charge and deposit", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedPostponement(
      activeWorker.id,
      testInfo.project.name
    );
    const calendar = createReservationsCalendarPage(page);
    const postponement =
      createReservationPostponementPage(page);
    const tomorrow = buildCostaRicaTomorrow();

    await calendar.goTo();
    await calendar
      .getPostponeLink(reservation.customerName)
      .click();
    await expect(
      postponement.getCauseOptions()
    ).toHaveCount(3);
    await postponement.fillDate(tomorrow);
    await postponement.chooseCause(cause.OTHER);
    await postponement.fillReason(values.OTHER_REASON);
    await postponement.submit();

    await expect(postponement.getStatus()).toContainText(
      reservation.time,
      submitWait
    );
    expect(
      await readReservationPostponementState(
        activeWorker.id,
        reservation.id
      )
    ).toEqual({
      cause: cause.OTHER,
      charges: 1,
      deposits: 1,
      isAuthor: true,
      openDispatches: 0,
      readings: 0,
      reason: values.OTHER_REASON,
      startsAt: `${tomorrow} ${reservation.time}`,
      status: values.SCHEDULED_STATUS,
      wasDispatched: false,
    });
  });

  test("postpones a dispatched reservation for weather, closing its dispatch with the readings", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedPostponement(
      activeWorker.id,
      testInfo.project.name,
      true
    );
    const calendar = createReservationsCalendarPage(page);
    const postponement =
      createReservationPostponementPage(page);
    const tomorrow = buildCostaRicaTomorrow();

    await calendar.goTo();
    await calendar
      .getPostponeLink(reservation.customerName)
      .click();
    await expect(
      postponement.getText(copy.NOTE_WEATHER_ONLY)
    ).toBeVisible();
    await expect(
      postponement.getCauseOptions()
    ).toHaveCount(2);
    await postponement.fillDate(tomorrow);
    await postponement.chooseCause(cause.STORM);
    await postponement.submit();
    await expect(
      postponement
        .getUnit(reservation.unit)
        .getByText(feedback.READING_FUEL_REQUIRED)
    ).toBeVisible();

    await postponement.chooseFuel(
      reservation.unit,
      values.RETURN_FUEL,
      values.FUEL_MAX
    );
    await postponement.fillUsage(
      reservation.unit,
      values.USAGE_METRIC,
      values.RETURN_USAGE
    );
    await postponement.submit();

    await expect(postponement.getStatus()).toBeVisible(
      submitWait
    );
    expect(
      await readReservationPostponementState(
        activeWorker.id,
        reservation.id
      )
    ).toEqual({
      cause: cause.STORM,
      charges: 1,
      deposits: 1,
      isAuthor: true,
      openDispatches: 0,
      readings: 1,
      reason: "",
      startsAt: `${tomorrow} ${reservation.time}`,
      status: values.SCHEDULED_STATUS,
      wasDispatched: true,
    });
  });

  test("keeps the form and tells the worker to reload when the reservation changed meanwhile", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedPostponement(
      activeWorker.id,
      testInfo.project.name
    );
    const postponement =
      createReservationPostponementPage(page);

    await postponement.goTo(reservation.id);
    await postponement.fillDate(buildCostaRicaTomorrow());
    await postponement.chooseCause(cause.HEAVY_RAIN);
    await runWorkerSql(
      values.STALE_OPERATION,
      sql.TOUCH,
      activeWorker.id,
      { reservation: reservation.id }
    );
    await postponement.submit();

    await expect(postponement.getAlert()).toHaveText(
      feedback.STALE,
      submitWait
    );
    await expect(postponement.getSubmit()).toBeDisabled();
  });
});
