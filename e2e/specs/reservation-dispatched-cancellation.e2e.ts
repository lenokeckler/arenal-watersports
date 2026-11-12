import { DEPOSIT_STATUS } from "@/app/constants";
import { RESERVATION_CANCELLATION_CAUSE } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationCause.constants";
import { RESERVATION_CANCELLATION_CAUSE_COPY as causeCopy } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationCauseCopy.constants";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as feedback } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationFeedbackCopy.constants";
import { RESERVATION_CANCELLATION_FORM_COPY as copy } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationFormCopy.constants";
import { E2E_CLOSE_GROUP as close } from "../constants/E2eCloseGroup.constants";
import { E2E_RESERVATION_CANCELLATION as cancellation } from "../constants/E2eReservationCancellation.constants";
import { E2E_RESERVATION_DISPATCHED_CANCELLATION as values } from "../constants/E2eReservationDispatchedCancellation.constants";
import {
  E2E_COUNT,
  E2E_TIMEOUT_MS,
} from "../constants/E2eRuntime.constants";
import { createOutOnWaterPage } from "../pages/OutOnWater.page";
import { createReservationCancellationPage } from "../pages/ReservationCancellation.page";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { expect, test } from "../support/activeWorkerTest";
import { cancelDispatchedReservation } from "../support/cancelDispatchedReservation";
import { closeDispatchedGroup } from "../support/closeDispatchedGroup";
import { createDispatchedCancellationFixture } from "../support/createDispatchedCancellationFixture";
import { readDispatchedCancellationState } from "../support/readDispatchedCancellationState";
import { expectDispatchedUnitStatus } from "../support/expectDispatchedUnitStatus";
import { removeDispatchedCancellationFixtures } from "../support/removeDispatchedCancellationFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";
import { switchToOperationsMode } from "../support/switchToOperationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };
const cause = RESERVATION_CANCELLATION_CAUSE.WEATHER;
const returnedCause =
  RESERVATION_CANCELLATION_CAUSE.TRIP_PROBLEM;

test.describe("Dispatched reservation cancellation", () => {
  test.describe.configure({ mode: cancellation.TEST_MODE });

  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeDispatchedCancellationFixtures(
      activeWorker
    );
  });

  test("cancels a dispatched reservation with a cause, keeping the deposit, the charge and the open group", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation =
      await createDispatchedCancellationFixture(
        activeWorker.id,
        testInfo.project.name
      );
    const calendar = createReservationsCalendarPage(page);
    const form = createReservationCancellationPage(page);

    await calendar.goTo();
    await calendar
      .getCancelLink(reservation.customerName)
      .click();
    await form.submit();
    await expect(
      form.getText(feedback.CAUSE_REQUIRED)
    ).toBeVisible();

    await form.selectCause(causeCopy[cause].label);
    await expect(
      form.getCause(causeCopy[cause].label)
    ).toBeChecked();
    await form.submit();
    await expect(
      form.getText(feedback.REASON_REQUIRED)
    ).toBeVisible();

    await form.fillReason(cancellation.REASON);
    await form.submit();
    await expect(form.getStatus()).toHaveText(
      copy.SUCCESS_DISPATCHED(reservation.code),
      submitWait
    );

    expect(
      await readDispatchedCancellationState(
        activeWorker.id,
        reservation.id
      )
    ).toMatchObject({
      cause,
      charges: 1,
      closedGroups: E2E_COUNT.NONE,
      depositStatus: DEPOSIT_STATUS.HELD,
      openGroups: 1,
      reason: cancellation.REASON,
      status: cancellation.CANCELLED_STATUS,
    });
    await expectDispatchedUnitStatus(
      activeWorker.id,
      reservation.unitCode,
      values.UNIT_OCCUPIED
    );
  });

  test("records the return of the cancelled group in operations and frees the unit", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation =
      await createDispatchedCancellationFixture(
        activeWorker.id,
        testInfo.project.name
      );
    const outOnWater = createOutOnWaterPage(page);

    await cancelDispatchedReservation(
      page,
      reservation.id,
      returnedCause
    );

    await switchToOperationsMode(page, activeWorker);
    await outOnWater.goTo();
    await expect(
      outOnWater.getGroup(reservation.customerName)
    ).toBeVisible();
    await closeDispatchedGroup(page, reservation);
    await expect(
      outOnWater.getGroup(reservation.customerName)
    ).toHaveCount(E2E_COUNT.NONE, submitWait);

    expect(
      await readDispatchedCancellationState(
        activeWorker.id,
        reservation.id
      )
    ).toMatchObject({
      cause: returnedCause,
      closedGroups: 1,
      depositStatus: DEPOSIT_STATUS.HELD,
      fuelIn: String(close.FIRST.FUEL),
      openGroups: E2E_COUNT.NONE,
      status: cancellation.CANCELLED_STATUS,
      usageIn: close.FIRST.USAGE.toFixed(2),
    });
    await expectDispatchedUnitStatus(
      activeWorker.id,
      reservation.unitCode,
      values.UNIT_AVAILABLE
    );
  });
});
