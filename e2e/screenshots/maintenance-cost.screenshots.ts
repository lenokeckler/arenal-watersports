import { E2E_MAINTENANCE_COST_SCREENSHOT_BASENAME } from "../constants/E2eMaintenanceCost.constants";
import { createMaintenanceCostPage } from "../pages/MaintenanceCost.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Maintenance cost screenshots", () => {
  test("captures the cost of each machine", async ({
    motorDispatchSheet: dispatchSheet,
    administratorPage: page,
  }, testInfo) => {
    const report = createMaintenanceCostPage(page);

    await dispatchSheet.addMaintenanceJobs();
    await report.goTo();
    await expect(
      report.getEntry(dispatchSheet.unitCodes[0])
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_MAINTENANCE_COST_SCREENSHOT_BASENAME.LIST,
      testInfo.project.name
    );
  });
});
