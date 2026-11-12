import { E2E_MAINTENANCE_HISTORY_SCREENSHOT_BASENAME } from "../constants/E2eMaintenanceHistory.constants";
import { createMaintenanceHistoryPage } from "../pages/MaintenanceHistory.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Maintenance history screenshots", () => {
  test("captures the jobs of the history", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const history = createMaintenanceHistoryPage(page);

    await dispatchSheet.addMaintenanceJobs();
    await history.goTo();
    await expect(
      history.getEntry(dispatchSheet.unitCodes[0])
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_MAINTENANCE_HISTORY_SCREENSHOT_BASENAME.LIST,
      testInfo.project.name
    );
  });
});
