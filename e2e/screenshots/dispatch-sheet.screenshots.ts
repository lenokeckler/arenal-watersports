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
    await expect(
      board.getReservation(dispatchSheet.customerName)
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_DISPATCH_SHEET_SCREENSHOT_BASENAME.LIST_WITH_EQUIPMENT,
      testInfo.project.name
    );
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();
    await expect(sheet.getUnit(first)).toBeVisible();
    await captureFullPage(
      page,
      E2E_DISPATCH_SHEET_SCREENSHOT_BASENAME.CHOOSING_UNITS,
      testInfo.project.name
    );

    await sheet.getUnit(first).click();
    await sheet.getUnit(second).click();
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
    await sheet.getUnit(first).click();
    await sheet.getUnit(second).click();
    await sheet
      .getGaugeLine(
        first,
        E2E_DISPATCH_READINGS.SECOND.LINE
      )
      .click();
    await captureFullPage(
      page,
      E2E_DISPATCH_SHEET_SCREENSHOT_BASENAME.READINGS,
      testInfo.project.name
    );
  });
});
