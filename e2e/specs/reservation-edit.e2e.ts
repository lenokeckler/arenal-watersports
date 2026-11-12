import { randomUUID } from "node:crypto";
import { HTTP_STATUS, PATHS } from "@/app/constants";
import { RESERVATION_EDIT_COPY as copy } from "@/app/features/reservations/reservation-form/constants/ReservationEditCopy.constants";
import { RESERVATION_FORM_UI_COPY as uiCopy } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import {
  E2E_RESERVATION_EDIT as values,
  E2E_RESERVATION_EDIT_SAVE_WAIT as saveWait,
  E2E_RESERVATION_EDIT_SEED as seed,
  E2E_RESERVATION_EDIT_SQL,
} from "../constants/E2eReservationEdit.constants";
import { E2E_RESERVATION_FORM_COPY as formCopy } from "../constants/E2eReservationForm.constants";
import { E2E_WORKER } from "../constants/E2eWorker.constants";
import { E2E_OPERATIONS_AREA_LABEL as operationsArea } from "../constants/E2eWorkMode.constants";
import { createOperationsCalendarPage } from "../pages/OperationsCalendar.page";
import { createReservationEditPage } from "../pages/ReservationEdit.page";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { createActiveWorker } from "../support/createActiveWorker";
import { createReservationEditFixture as seedEdit } from "../support/createReservationEditFixture";
import { removeReservationsForWorker } from "../support/removeReservationsForWorker";
import { runWorkerSql } from "../support/runWorkerSql";
import { signInToReservationsMode } from "../support/signInToReservationsMode";
import { withSecondContext } from "../support/withSecondContext";

test.describe("Reservation edit", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeReservationsForWorker(activeWorker);
  });

  test("edits people and time from the Reservas calendar only", async ({
    activeWorker,
    page,
  }) => {
    const { customerName } = await seedEdit(
      activeWorker.id
    );
    const calendar = createReservationsCalendarPage(page);
    const edit = createReservationEditPage(page);
    const workMode = createWorkModePage(page);

    await calendar.goTo();
    await calendar.getModifyLink(customerName).click();
    await edit.getPeopleInput().fill(values.PEOPLE);
    await edit.getTimeInput().fill(values.TIME);
    await edit.save();

    await expect(edit.getText(copy.SUCCESS)).toBeVisible(
      saveWait
    );
    await expect(
      edit.getText(uiCopy.CATEGORY_CONFLICT_WARNING_TITLE)
    ).toHaveCount(0);
    await expect(
      edit.getText(E2E_WORKER.FULL_NAME)
    ).toBeVisible();
    await calendar.goTo();
    await expect(
      calendar.getBlock(customerName)
    ).toContainText(values.TIME);

    await workMode.goTo();
    await workMode.getCard(operationsArea).click();
    await page.waitForURL(PATHS.BOARD);
    await createOperationsCalendarPage(page).goTo();
    await expect(
      calendar.getBlock(customerName)
    ).toBeVisible();
    await expect(
      calendar.getModifyLink(customerName)
    ).toHaveCount(0);
  });

  test("names a second worker and refuses the stale form", async ({
    activeWorker,
    baseURL,
    browser,
    page,
  }, testInfo) => {
    const { id } = await seedEdit(activeWorker.id);
    const secondWorker = await createActiveWorker();
    const edit = createReservationEditPage(page);

    try {
      await runWorkerSql(
        values.NAME_OPERATION,
        E2E_RESERVATION_EDIT_SQL.NAME_WORKER,
        secondWorker.id,
        { full_name: values.SECOND_WORKER_NAME }
      );
      await edit.goTo(id);
      await edit.getTimeInput().fill(values.TIME);
      await withSecondContext(
        browser,
        { ...testInfo.project.use, baseURL },
        async (context) => {
          const secondPage = await context.newPage();
          const second =
            createReservationEditPage(secondPage);
          await signInToReservationsMode(
            secondPage,
            secondWorker
          );
          await second.goTo(id);
          await second.getPeopleInput().fill(values.PEOPLE);
          await second.save();
          await expect(
            second.getText(values.SECOND_WORKER_NAME)
          ).toBeVisible(saveWait);
        }
      );
      await edit.save();

      await expect(edit.getText(copy.STALE)).toBeVisible(
        saveWait
      );
    } finally {
      await removeReservationsForWorker(activeWorker);
      await secondWorker.remove();
    }
  });

  test("locks combo equipment and saves a people change", async ({
    activeWorker,
    page,
  }) => {
    const { id } = await seedEdit(
      activeWorker.id,
      seed.COMBO
    );
    const edit = createReservationEditPage(page);

    await edit.goTo(id);
    await expect(
      edit.getText(copy.COMBO_LOCKED)
    ).toBeVisible();
    await expect(
      edit.getText(formCopy.CATEGORY_OPTION)
    ).toBeVisible();
    await expect(edit.getEquipmentFields()).toHaveCount(0);
    await edit.getPeopleInput().fill(values.PEOPLE);
    await edit.save();

    await expect(edit.getText(copy.SUCCESS)).toBeVisible();
  });

  test("offers no edit once dispatched or cancelled, and 404 when unknown", async ({
    activeWorker,
    page,
  }) => {
    const reservations = [
      await seedEdit(activeWorker.id, seed.DISPATCHED),
      await seedEdit(activeWorker.id, seed.CANCELLED),
    ];
    const calendar = createReservationsCalendarPage(page);
    const edit = createReservationEditPage(page);

    await calendar.goTo();
    await expect(
      calendar.getBlock(reservations[0].customerName)
    ).toBeVisible();
    for (const { customerName, id } of reservations) {
      await calendar.goTo();
      await expect(
        calendar.getModifyLink(customerName)
      ).toHaveCount(0);
      await edit.goTo(id);
      await expect(
        edit.getText(copy.UNAVAILABLE_TITLE)
      ).toBeVisible();
      await expect(edit.getSubmit()).toHaveCount(0);
    }

    const response = await edit.goTo(randomUUID());
    expect(response?.status()).toBe(HTTP_STATUS.NOT_FOUND);
  });
});
