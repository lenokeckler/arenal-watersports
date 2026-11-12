import { E2E_DAMAGE_REPORTS_SCREENSHOT_BASENAME } from "../constants/E2eDamageReports.constants";
import { createDamageReportsPage } from "../pages/DamageReports.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Damage reports screenshots", () => {
  test("captures the reports of a unit", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const reports = createDamageReportsPage(page);

    await reports.goTo(
      await dispatchSheet.addDamageReports()
    );
    await expect(reports.getReports()).toHaveCount(2);
    await captureFullPage(
      page,
      E2E_DAMAGE_REPORTS_SCREENSHOT_BASENAME.LIST,
      testInfo.project.name
    );
  });

  test("captures a unit without reports", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const reports = createDamageReportsPage(page);

    await reports.goTo(
      await dispatchSheet.readUnitId(
        dispatchSheet.unitCodes[1]
      )
    );
    await expect(reports.getEmptyMessage()).toBeVisible();
    await captureFullPage(
      page,
      E2E_DAMAGE_REPORTS_SCREENSHOT_BASENAME.EMPTY,
      testInfo.project.name
    );
  });
});
