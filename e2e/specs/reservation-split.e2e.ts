import { randomUUID } from "node:crypto";
import { HTTP_STATUS } from "@/app/constants";
import { RESERVATION_SPLIT_BLOCK } from "@/app/features/reservations/reservation-split/constants/ReservationSplitBlock.constants";
import { RESERVATION_SPLIT_FEEDBACK_COPY as feedback } from "@/app/features/reservations/reservation-split/constants/ReservationSplitFeedbackCopy.constants";
import { RESERVATION_SPLIT_UI_COPY as copy } from "@/app/features/reservations/reservation-split/constants/ReservationSplitUiCopy.constants";
import { RESERVATION_SPLIT_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/reservation-split/constants/ReservationSplitUnavailableCopy.constants";
import {
  E2E_RESERVATION_SPLIT as values,
  E2E_RESERVATION_SPLIT_SQL as sql,
} from "../constants/E2eReservationSplit.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { E2E_OPERATIONS_AREA_LABEL as operationsArea } from "../constants/E2eWorkMode.constants";
import { createOperationsCalendarPage } from "../pages/OperationsCalendar.page";
import { createReservationSplitPage } from "../pages/ReservationSplit.page";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addOperationsArea } from "../support/addOperationsArea";
import { createReservationSplitFixture as seedSplit } from "../support/createReservationSplitFixture";
import { readReservationSplitState } from "../support/readReservationSplitState";
import { removeReservationSplitFixtures } from "../support/removeReservationSplitFixtures";
import { runWorkerSql } from "../support/runWorkerSql";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

test.describe("Reservation split", () => {
  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeReservationSplitFixtures(activeWorker);
  });

  test("splits an incomplete group into two departures that keep the charge on the original", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const original = await seedSplit(
      activeWorker.id,
      testInfo.project.name
    );
    const calendar = createReservationsCalendarPage(page);
    const split = createReservationSplitPage(page);
    const operations = createOperationsCalendarPage(page);

    await calendar.goTo();
    await calendar
      .getSplitLink(original.customerName)
      .click();
    await split.fillDeparture(original);
    await split.submit();

    await expect(
      split.getText(
        copy.SUCCESS(values.EXPECTED_DEPARTURES)
      )
    ).toBeVisible(submitWait);
    await expect(
      split.getCreatedCodes().filter({
        hasText: values.CODE_PATTERN,
      })
    ).toHaveCount(1);

    await calendar.goTo();
    await expect(
      calendar.getOriginBlock(
        original.customerName,
        original.code
      )
    ).toBeVisible();
    expect(
      await readReservationSplitState(original.id)
    ).toEqual({
      chargesOnDepartures: 0,
      chargesOnOriginal: 1,
      departures: 1,
      depositsOnDepartures: 0,
      depositsOnOriginal: 1,
    });

    await addOperationsArea(activeWorker.id);
    await createWorkModePage(page).goTo();
    await createWorkModePage(page)
      .getCard(operationsArea)
      .click();
    await operations.goTo();
    await expect(
      operations.getOriginBlock(
        original.customerName,
        original.code
      )
    ).toBeVisible();
    await expect(
      operations.getSplitLink(original.customerName)
    ).toHaveCount(0);
  });

  test("blocks assigning more people than the original can give up", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const original = await seedSplit(
      activeWorker.id,
      testInfo.project.name
    );
    const split = createReservationSplitPage(page);

    await split.goTo(original.id);
    await split.stepUp(
      copy.PEOPLE,
      values.DEPARTURE_NUMBER,
      values.OVER_ASSIGNMENT_STEPS
    );

    await expect(
      split.getStepUp(copy.PEOPLE, values.DEPARTURE_NUMBER)
    ).toHaveAttribute(
      values.ARIA_DISABLED,
      values.ARIA_TRUE
    );
    await expect(
      split.getText(copy.STEPPER_AT_MAX)
    ).toBeVisible();
    await expect(
      split.getText(copy.ADD_DEPARTURE_BLOCKED)
    ).toBeVisible();
    await split.submit();
    await expect(
      split.getText(feedback.EQUIPMENT_MIN)
    ).toBeVisible();
    expect(
      (await readReservationSplitState(original.id))
        .departures
    ).toBe(0);
  });

  test("refuses a stale form after the reservation changed", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const original = await seedSplit(
      activeWorker.id,
      testInfo.project.name
    );
    const split = createReservationSplitPage(page);

    await split.goTo(original.id);
    await split.fillDeparture(original);
    await runWorkerSql(
      values.STALE_OPERATION,
      sql.TOUCH,
      activeWorker.id,
      { reservation: original.id }
    );
    await split.submit();

    await expect(split.getAlert()).toHaveText(
      feedback.STALE,
      submitWait
    );
    expect(
      (await readReservationSplitState(original.id))
        .departures
    ).toBe(0);
  });

  test("shows the unavailable state once dispatched or closed, and 404 when unknown", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const split = createReservationSplitPage(page);
    const calendar = createReservationsCalendarPage(page);

    for (const status of values.LOCKED_STATUSES) {
      const locked = await seedSplit(
        activeWorker.id,
        testInfo.project.name,
        { status }
      );

      await calendar.goTo();
      await expect(
        calendar.getSplitLink(locked.customerName)
      ).toHaveCount(0);
      await split.goTo(locked.id);
      await expect(
        split.getText(
          unavailable[RESERVATION_SPLIT_BLOCK.NOT_SCHEDULED]
            .title
        )
      ).toBeVisible();
      await expect(split.getSubmit()).toHaveCount(0);
    }

    const response = await split.goTo(randomUUID());
    expect(response?.status()).toBe(HTTP_STATUS.NOT_FOUND);
  });
});
