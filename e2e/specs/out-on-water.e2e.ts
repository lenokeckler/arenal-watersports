import {
  DURATION_ADJUST_COPY,
  OUT_ON_WATER_COPY,
} from "@/app/features/operations/out-on-water/constants/OutOnWaterCopy.constants";
import { E2E_DISPATCH_LATE } from "../constants/E2eDispatchSheet.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import {
  E2E_OUT_ON_WATER_ADJUST,
  E2E_OUT_ON_WATER_LATE_PATTERN,
  E2E_OUT_ON_WATER_REMAINING_PATTERN,
} from "../constants/E2eOutOnWater.constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createDispatchSheetPage } from "../pages/DispatchSheet.page";
import { createOutOnWaterPage } from "../pages/OutOnWater.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Equipment out", () => {
  test("lists a dispatched group with its units, its hours and the time left", async ({
    dispatchSheet,
    signedInPage: page,
  }) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);
    const outOnWater = createOutOnWaterPage(page);
    const [first, second] = dispatchSheet.unitCodes;

    await outOnWater.goTo();
    await expect(
      outOnWater.getGroup(dispatchSheet.customerName)
    ).toHaveCount(E2E_COUNT.NONE);

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
    const group = outOnWater.getGroup(
      dispatchSheet.customerName
    );

    await expect(outOnWater.getHeading()).toBeVisible();
    await expect(group).toContainText(
      dispatchSheet.categoryName
    );
    await expect(group).toContainText(first);
    await expect(group).toContainText(second);
    await expect(group).toContainText(
      OUT_ON_WATER_COPY.DEPARTED_AT
    );
    await expect(group).toContainText(
      OUT_ON_WATER_COPY.RETURNS_AT
    );
    await expect(group).toContainText(
      E2E_OUT_ON_WATER_REMAINING_PATTERN
    );
  });

  test("keeps a group past its return hour listed and marked as waiting to return with the minutes late", async ({
    dispatchSheet,
    signedInPage: page,
  }) => {
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
    await dispatchSheet.makeDispatchLate(
      E2E_DISPATCH_LATE.MINUTES_LATE
    );

    await outOnWater.goTo();
    const group = outOnWater.getGroup(
      dispatchSheet.customerName
    );

    await expect(group).toContainText(
      OUT_ON_WATER_COPY.OVERDUE_LABEL
    );
    await expect(group).toContainText(
      E2E_OUT_ON_WATER_LATE_PATTERN
    );
  });

  test("extends the duration of a group, moves its return hour and leaves the mark for Reservations", async ({
    dispatchSheet,
    signedInPage: page,
  }) => {
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
      .getAdjustButton(dispatchSheet.customerName)
      .click();
    await expect(outOnWater.getAdjustSave()).toBeDisabled();
    await outOnWater
      .getAdjustPreset(E2E_OUT_ON_WATER_ADJUST.ADD_PRESET)
      .click();
    await outOnWater.getAdjustSave().click();

    await expect(outOnWater.getAdjustDialog()).toHaveCount(
      E2E_COUNT.NONE
    );
    await expect(
      outOnWater.getGroup(dispatchSheet.customerName)
    ).toContainText(DURATION_ADJUST_COPY.EXTENDED_PREFIX);
    expect(
      await dispatchSheet.readDispatchDuration()
    ).toEqual({
      durationMinutes:
        E2E_OUT_ON_WATER_ADJUST.PLAN_MINUTES +
        E2E_OUT_ON_WATER_ADJUST.ADDED_MINUTES,
      extendedMinutes:
        E2E_OUT_ON_WATER_ADJUST.ADDED_MINUTES,
    });
  });
});
