import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import {
  E2E_OPERATIONS_AREA_LABEL,
  E2E_RESERVATIONS_AREA_LABEL,
  E2E_WORK_MODE_COPY,
} from "../constants/E2eWorkMode.constants";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addReservationsArea } from "../support/addReservationsArea";
import { readLastWorkMode } from "../support/readLastWorkMode";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";

test.describe("Work mode", () => {
  test("a worker with two areas chooses a mode, switches without signing out and enters straight into the last one", async ({
    activeWorker,
    context,
    page,
  }) => {
    const modePage = createWorkModePage(page);
    await addReservationsArea(activeWorker.id);

    await submitActiveWorkerSignIn(page, activeWorker);
    await expect(page).toHaveURL(PATHS.MODE);
    await modePage
      .getCard(E2E_RESERVATIONS_AREA_LABEL)
      .click();
    await expect(page).toHaveURL(PATHS.HOME);
    await expect(
      modePage.getSwitch(E2E_RESERVATIONS_AREA_LABEL)
    ).toBeVisible();
    expect(await readLastWorkMode(activeWorker.id)).toBe(
      SUPABASE_WORK_AREA.RESERVATIONS
    );

    await modePage.getSwitchLink().click();
    await expect(page).toHaveURL(PATHS.MODE);
    await expect(modePage.getCurrentBadge()).toBeVisible();
    await modePage
      .getCard(E2E_OPERATIONS_AREA_LABEL)
      .click();
    await expect(
      modePage.getSwitch(E2E_OPERATIONS_AREA_LABEL)
    ).toBeVisible();

    await context.clearCookies();
    await submitActiveWorkerSignIn(page, activeWorker);
    await expect(page).toHaveURL(PATHS.HOME);
    await expect(
      modePage.getSwitch(E2E_OPERATIONS_AREA_LABEL)
    ).toBeVisible();
  });

  test("a worker with a single area enters straight in and never sees the selector", async ({
    signedInPage: page,
  }) => {
    const modePage = createWorkModePage(page);

    await expect(page).toHaveURL(PATHS.HOME);
    await expect(modePage.getSwitchLink()).toHaveCount(0);
    await modePage.goTo();
    await expect(page).toHaveURL(PATHS.HOME);
    await expect(
      page.getByText(E2E_WORK_MODE_COPY.HEADING)
    ).toHaveCount(0);
  });
});
