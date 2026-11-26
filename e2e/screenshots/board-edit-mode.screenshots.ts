import { E2E_BOARD_EDIT_SCREENSHOT_BASENAME } from "../constants/E2eBoardEdit.constants";
import { createBoardCategoryUnitsPage } from "../pages/BoardCategoryUnits.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Unit board edit mode screenshots", () => {
  test("captures the edit mode and the modify panel", async ({
    boardMotorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const units = createBoardCategoryUnitsPage(page);
    const [first] = dispatchSheet.unitCodes;

    await units.goTo(dispatchSheet.categoryId);
    await units.getEditToggle().click();
    await expect(units.getModifyUnit(first)).toBeVisible();
    await captureFullPage(
      page,
      E2E_BOARD_EDIT_SCREENSHOT_BASENAME.EDIT_MODE,
      testInfo.project.name
    );

    await units.getModifyUnit(first).click();
    await expect(units.getSaveUnit()).toBeVisible();
    await captureFullPage(
      page,
      E2E_BOARD_EDIT_SCREENSHOT_BASENAME.MODIFY_PANEL,
      testInfo.project.name
    );
  });
});
