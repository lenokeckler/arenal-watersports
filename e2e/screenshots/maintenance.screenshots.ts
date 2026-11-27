import { E2E_MAINTENANCE_SCREENSHOT_BASENAME } from "../constants/E2eMaintenance.constants";
import { createMaintenancePage } from "../pages/Maintenance.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Maintenance screenshots", () => {
  test("captures the machines that need maintenance", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const maintenance = createMaintenancePage(page);

    await dispatchSheet.makeMaintenanceNeeds();
    await maintenance.goTo();
    await expect(
      maintenance.getAttentionChip(
        dispatchSheet.unitCodes[0]
      )
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_MAINTENANCE_SCREENSHOT_BASENAME.LIST,
      testInfo.project.name
    );

    await maintenance.openSummary();
    await expect(
      maintenance.getSpendHeading()
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_MAINTENANCE_SCREENSHOT_BASENAME.SUMMARY,
      testInfo.project.name
    );
  });
});
