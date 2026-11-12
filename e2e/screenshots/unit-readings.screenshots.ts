import { E2E_UNIT_READINGS_SCREENSHOT_BASENAME } from "../constants/E2eUnitReadings.constants";
import { createUnitReadingsPage } from "../pages/UnitReadings.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Unit readings screenshots", () => {
  test("captures the list of units with a motor", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const readings = createUnitReadingsPage(page);

    await dispatchSheet.makeMaintenanceNeeds();
    await readings.goTo();
    await expect(
      readings.getCard(dispatchSheet.unitCodes[0])
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_UNIT_READINGS_SCREENSHOT_BASENAME.LIST,
      testInfo.project.name
    );
  });

  test("captures the correction form", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const readings = createUnitReadingsPage(page);

    await readings.goTo();
    await readings.openCorrection(
      dispatchSheet.unitCodes[0]
    );
    await expect(
      readings.getCorrectionHeading()
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_UNIT_READINGS_SCREENSHOT_BASENAME.FORM,
      testInfo.project.name
    );
  });
});
