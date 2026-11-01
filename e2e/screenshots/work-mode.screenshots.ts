import { PATHS } from "@/app/constants";
import {
  E2E_RESERVATIONS_AREA_LABEL,
  E2E_WORK_MODE_SCREENSHOT_BASENAME,
} from "../constants/E2eWorkMode.constants";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addReservationsArea } from "../support/addReservationsArea";
import { captureFullPage } from "../support/captureFullPage";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";

test.describe("Work mode screenshots", () => {
  test("captures the selector, the home with the switch and the selector with the current mode", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const modePage = createWorkModePage(page);
    await addReservationsArea(activeWorker.id);
    await submitActiveWorkerSignIn(page, activeWorker);
    await expect(page).toHaveURL(PATHS.MODE);
    await captureFullPage(
      page,
      E2E_WORK_MODE_SCREENSHOT_BASENAME.SELECTOR,
      testInfo.project.name
    );

    await modePage
      .getCard(E2E_RESERVATIONS_AREA_LABEL)
      .click();
    await expect(
      modePage.getSwitch(E2E_RESERVATIONS_AREA_LABEL)
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_WORK_MODE_SCREENSHOT_BASENAME.HOME_WITH_SWITCH,
      testInfo.project.name
    );

    await modePage.getSwitchLink().click();
    await expect(modePage.getCurrentBadge()).toBeVisible();
    await captureFullPage(
      page,
      E2E_WORK_MODE_SCREENSHOT_BASENAME.SELECTOR_WITH_CURRENT,
      testInfo.project.name
    );
  });
});
