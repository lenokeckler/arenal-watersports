import { E2E_DAMAGE_REPORTS_SCREENSHOT_BASENAME } from "../constants/E2eDamageReports.constants";
import { createDamageReportsPage } from "../pages/DamageReports.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Damage reports screenshots", () => {
  test("captures the damage screen and a filter by cause", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const reports = createDamageReportsPage(page);

    await dispatchSheet.addDamageReports();
    await reports.goTo();
    await expect(reports.getHeading()).toBeVisible();
    await captureFullPage(
      page,
      E2E_DAMAGE_REPORTS_SCREENSHOT_BASENAME.LIST,
      testInfo.project.name
    );

    await reports.goToCharts();
    await reports.filterByCause("rollover");
    await expect(page).toHaveURL(/cause=rollover/);
    await captureFullPage(
      page,
      E2E_DAMAGE_REPORTS_SCREENSHOT_BASENAME.FILTERED,
      testInfo.project.name
    );
  });
});
