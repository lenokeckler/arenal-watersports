import { E2E_BOARD_DISPATCH_SCREENSHOT_BASENAME } from "../constants/E2eDispatchSheet.constants";
import { createBoardCategoryUnitsPage } from "../pages/BoardCategoryUnits.page";
import { createDispatchSheetPage } from "../pages/DispatchSheet.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

const TWO_SELECTED = 2;

test.describe("Dispatch from the board screenshots", () => {
  test("captures the tapped units, the reservation picker and the sheet", async ({
    boardDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const units = createBoardCategoryUnitsPage(page);
    const sheet = createDispatchSheetPage(page);
    const [first, second] = dispatchSheet.unitCodes;

    await units.goTo(dispatchSheet.categoryId);
    await units.selectUnit(first);
    await units.selectUnit(second);
    await expect(
      units.getDispatchBar(TWO_SELECTED)
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_BOARD_DISPATCH_SCREENSHOT_BASENAME.SELECTED_UNITS,
      testInfo.project.name
    );

    await units.getDispatchAction().click();
    await expect(
      units.getPickerAction(dispatchSheet.customerName)
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_BOARD_DISPATCH_SCREENSHOT_BASENAME.PICKER,
      testInfo.project.name
    );

    await units
      .getPickerAction(dispatchSheet.customerName)
      .click();
    await expect(sheet.getUnit(first)).toBeChecked();
    await captureFullPage(
      page,
      E2E_BOARD_DISPATCH_SCREENSHOT_BASENAME.SHEET,
      testInfo.project.name
    );
  });
});
