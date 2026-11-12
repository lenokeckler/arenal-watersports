import { OUT_ON_WATER_COPY } from "@/app/features/operations/out-on-water/constants/OutOnWaterCopy.constants";
import { E2E_DISPATCH_LATE } from "../constants/E2eDispatchSheet.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import {
  E2E_OUT_ON_WATER_ADJUST,
  E2E_OUT_ON_WATER_SCREENSHOT_BASENAME,
} from "../constants/E2eOutOnWater.constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createDispatchSheetPage } from "../pages/DispatchSheet.page";
import { createOutOnWaterPage } from "../pages/OutOnWater.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Equipment out screenshots", () => {
  test("captures the list of the equipment that is out", async ({
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
    await expect(
      outOnWater.getGroup(dispatchSheet.customerName)
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_OUT_ON_WATER_SCREENSHOT_BASENAME.LIST,
      testInfo.project.name
    );

    await dispatchSheet.makeDispatchLate(
      E2E_DISPATCH_LATE.MINUTES_LATE
    );
    await outOnWater.goTo();
    await expect(
      outOnWater.getGroup(dispatchSheet.customerName)
    ).toContainText(OUT_ON_WATER_COPY.OVERDUE_LABEL);
    await captureFullPage(
      page,
      E2E_OUT_ON_WATER_SCREENSHOT_BASENAME.LATE,
      testInfo.project.name
    );

    await outOnWater
      .getAdjustButton(dispatchSheet.customerName)
      .click();
    await outOnWater
      .getAdjustPreset(E2E_OUT_ON_WATER_ADJUST.ADD_PRESET)
      .click();
    await expect(outOnWater.getAdjustSave()).toBeEnabled();
    await captureFullPage(
      page,
      E2E_OUT_ON_WATER_SCREENSHOT_BASENAME.ADJUST,
      testInfo.project.name
    );
  });
});
