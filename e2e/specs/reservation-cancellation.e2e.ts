import { RESERVATION_CANCELLATION_FEEDBACK_COPY as feedback } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationFeedbackCopy.constants";
import { RESERVATION_CANCELLATION_FORM_COPY as copy } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationFormCopy.constants";
import {
  E2E_RESERVATION_CANCELLATION as values,
  E2E_RESERVATION_CANCELLATION_SQL as sql,
} from "../constants/E2eReservationCancellation.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { E2E_OPERATIONS_AREA_LABEL as operationsArea } from "../constants/E2eWorkMode.constants";
import { createOperationsCalendarPage } from "../pages/OperationsCalendar.page";
import { createReservationCancellationPage } from "../pages/ReservationCancellation.page";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addOperationsArea } from "../support/addOperationsArea";
import { createReservationCancellationFixture as seedCancellation } from "../support/createReservationCancellationFixture";
import { readReservationCancellationState } from "../support/readReservationCancellationState";
import { removeReservationCancellationFixtures } from "../support/removeReservationCancellationFixtures";
import { runWorkerSql } from "../support/runWorkerSql";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

test.describe("Reservation cancellation", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeReservationCancellationFixtures(
      activeWorker
    );
  });

  test("cancels a scheduled reservation from the calendar with a required reason, keeping its equipment, charge and deposit", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedCancellation(
      activeWorker.id,
      testInfo.project.name
    );
    const calendar = createReservationsCalendarPage(page);
    const cancellation =
      createReservationCancellationPage(page);
    const operations = createOperationsCalendarPage(page);

    await calendar.goTo();
    await calendar
      .getCancelLink(reservation.customerName)
      .click();
    await cancellation.submit();
    await expect(
      cancellation.getText(feedback.REASON_REQUIRED)
    ).toBeVisible();

    await cancellation.fillReason(values.REASON);
    await cancellation.submit();

    await expect(cancellation.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      submitWait
    );
    expect(
      await readReservationCancellationState(
        activeWorker.id,
        reservation.id
      )
    ).toEqual({
      charges: 1,
      deposits: 1,
      isAuthor: true,
      items: 1,
      reason: values.REASON,
      status: values.CANCELLED_STATUS,
    });

    await calendar.goTo();
    await expect(
      calendar.getBlock(reservation.customerName)
    ).toHaveCount(0);

    await addOperationsArea(activeWorker.id);
    await createWorkModePage(page).goTo();
    await createWorkModePage(page)
      .getCard(operationsArea)
      .click();
    await operations.goTo();
    await expect(operations.getHeading()).toBeVisible();
    await expect(
      operations.getBlock(reservation.customerName)
    ).toHaveCount(0);
  });

  test("keeps the reason and tells the worker to reload when the reservation changed meanwhile", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedCancellation(
      activeWorker.id,
      testInfo.project.name
    );
    const cancellation =
      createReservationCancellationPage(page);

    await cancellation.goTo(reservation.id);
    await cancellation.fillReason(values.REASON);
    await runWorkerSql(
      values.STALE_OPERATION,
      sql.TOUCH,
      activeWorker.id,
      { reservation: reservation.id }
    );
    await cancellation.submit();

    await expect(cancellation.getAlert()).toHaveText(
      feedback.STALE,
      submitWait
    );
    await expect(cancellation.getSubmit()).toBeDisabled();
  });
});
