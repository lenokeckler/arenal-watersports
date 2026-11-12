import {
  E2E_CLOSE_GROUP,
  E2E_CLOSE_GROUP_SCREENSHOT_BASENAME,
} from "../constants/E2eCloseGroup.constants";
import { E2E_DISPATCH_READINGS } from "../constants/E2eDispatchSheet.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createDispatchSheetPage } from "../pages/DispatchSheet.page";
import { createOutOnWaterPage } from "../pages/OutOnWater.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Group closing screenshots", () => {
  test("captures the closing sheet with the readings and with a damage report", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);
    const outOnWater = createOutOnWaterPage(page);
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
    await sheet
      .getFuelPreset(
        second,
        E2E_DISPATCH_READINGS.SECOND.PRESET
      )
      .click();
    await sheet
      .getUsageField(
        second,
        E2E_DISPATCH_READINGS.HOURS_LABEL
      )
      .fill(E2E_DISPATCH_READINGS.SECOND.HOURS_TEXT);
    await sheet.getSubmit().click();
    await expect(sheet.getDialog()).toHaveCount(
      E2E_COUNT.NONE
    );

    await outOnWater.goTo();
    await outOnWater
      .getCloseButton(dispatchSheet.customerName)
      .click();
    await outOnWater
      .getCloseFuelPreset(
        first,
        E2E_CLOSE_GROUP.FIRST.PRESET
      )
      .click();
    await outOnWater
      .getCloseUsage(first)
      .fill(E2E_CLOSE_GROUP.FIRST.HOURS_TEXT);
    await outOnWater
      .getCloseFuelPreset(
        second,
        E2E_CLOSE_GROUP.SECOND.PRESET
      )
      .click();
    await outOnWater
      .getCloseUsage(second)
      .fill(E2E_CLOSE_GROUP.SECOND.HOURS_TEXT);
    await expect(
      outOnWater.getCloseConfirm()
    ).toBeEnabled();
    await captureFullPage(
      page,
      E2E_CLOSE_GROUP_SCREENSHOT_BASENAME.SHEET,
      testInfo.project.name
    );

    await outOnWater.getCloseDamage(first).check();
    await outOnWater
      .getCloseCause(first)
      .selectOption({ label: E2E_CLOSE_GROUP.CAUSE_LABEL });
    await outOnWater
      .getCloseDescription(first)
      .fill(E2E_CLOSE_GROUP.DESCRIPTION);
    await expect(
      outOnWater.getCloseConfirm()
    ).toBeEnabled();
    await captureFullPage(
      page,
      E2E_CLOSE_GROUP_SCREENSHOT_BASENAME.DAMAGE,
      testInfo.project.name
    );
  });

  test("captures the closing sheet with a unit sent to maintenance", async ({
    dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);
    const outOnWater = createOutOnWaterPage(page);
    const [first, second] = dispatchSheet.unitCodes;

    await board.goTo();
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();
    await sheet.getUnit(first).check();
    await sheet.getUnit(second).check();
    await sheet.getSubmit().click();
    await expect(sheet.getDialog()).toHaveCount(
      E2E_COUNT.NONE
    );

    await outOnWater.goTo();
    await outOnWater
      .getCloseButton(dispatchSheet.customerName)
      .click();
    await outOnWater.getCloseMaintenance(first).check();
    await expect(
      outOnWater.getCloseConfirm()
    ).toBeEnabled();
    await captureFullPage(
      page,
      E2E_CLOSE_GROUP_SCREENSHOT_BASENAME.MAINTENANCE,
      testInfo.project.name
    );
  });
});
