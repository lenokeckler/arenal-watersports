import {
  E2E_DISPATCH_READINGS,
  E2E_DISPATCH_SHEET_SCREENSHOT_BASENAME,
} from "../constants/E2eDispatchSheet.constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createDispatchSheetPage } from "../pages/DispatchSheet.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Dispatch sheet screenshots", () => {
  test("captures the sheet before and after choosing the units", async ({
    dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);
    const [first, second] = dispatchSheet.unitCodes;

    await board.goTo();
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();
    await expect(sheet.getUnit(first)).toBeVisible();
    await captureFullPage(
      page,
      E2E_DISPATCH_SHEET_SCREENSHOT_BASENAME.CHOOSING_UNITS,
      testInfo.project.name
    );

    await sheet.getUnit(first).check();
    await sheet.getUnit(second).check();
    await expect(sheet.getSubmit()).toBeEnabled();
    await captureFullPage(
      page,
      E2E_DISPATCH_SHEET_SCREENSHOT_BASENAME.READY_TO_CONFIRM,
      testInfo.project.name
    );
  });

  test("captures the readings of the motor units", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);
    const [first, second] = dispatchSheet.unitCodes;

    await board.goTo();
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();
    await sheet.getUnit(first).check();
    await sheet.getUnit(second).check();
    await sheet
      .getFuelPreset(
        first,
        E2E_DISPATCH_READINGS.FIRST.PRESET
      )
      .click();
    await sheet
      .getUsageField(
        first,
        E2E_DISPATCH_READINGS.HOURS_LABEL
      )
      .fill(E2E_DISPATCH_READINGS.FIRST.HOURS_TEXT);
    await expect(sheet.getFuelField(first)).toHaveValue(
      String(E2E_DISPATCH_READINGS.FIRST.FUEL)
    );
    await captureFullPage(
      page,
      E2E_DISPATCH_SHEET_SCREENSHOT_BASENAME.READINGS,
      testInfo.project.name
    );
  });
});
