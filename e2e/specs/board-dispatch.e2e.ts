import { E2E_DISPATCH_READINGS } from "../constants/E2eDispatchSheet.constants";
import { E2E_DISPATCH_SHEET_EXPECTED } from "../constants/E2eDispatchSheet.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createBoardCategoryUnitsPage } from "../pages/BoardCategoryUnits.page";
import { createDispatchSheetPage } from "../pages/DispatchSheet.page";
import { expect, test } from "../support/dispatchSheetTest";

const TWO_SELECTED = 2;

test.describe("Dispatch from the board", () => {
  test("dispatches the units tapped on the category through the reservation picker", async ({
    boardDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const units = createBoardCategoryUnitsPage(page);
    const sheet = createDispatchSheetPage(page);
    const [first, second, third] = dispatchSheet.unitCodes;

    await units.goTo(dispatchSheet.categoryId);
    await expect(units.getDispatchAction()).toHaveCount(
      E2E_COUNT.NONE
    );

    await units.selectUnit(first);
    await units.selectUnit(second);
    await expect(
      units.getDispatchBar(TWO_SELECTED)
    ).toBeVisible();

    await units.getDispatchAction().click();
    await units
      .getPickerAction(dispatchSheet.customerName)
      .click();

    await expect(sheet.getDialog()).toContainText(
      dispatchSheet.categoryName
    );
    await expect(sheet.getUnit(first)).toBeChecked();
    await expect(sheet.getUnit(second)).toBeChecked();
    await expect(sheet.getUnit(third)).toBeDisabled();
    await expect(sheet.getSubmit()).toBeEnabled();

    await sheet.getSubmit().click();

    await expect(sheet.getDialog()).toHaveCount(
      E2E_COUNT.NONE
    );
    await expect(units.getSelectUnit(first)).toHaveCount(
      E2E_COUNT.NONE
    );
    const state = await dispatchSheet.readDispatchState();

    expect(state.dispatchCount).toBe(
      E2E_DISPATCH_SHEET_EXPECTED.ONE_DISPATCH
    );
    expect(state.reservationStatus).toBe(
      E2E_DISPATCH_SHEET_EXPECTED.RESERVATION_STATUS
    );
  });

  test("asks for the readings of the motor units tapped on the board", async ({
    boardMotorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const units = createBoardCategoryUnitsPage(page);
    const sheet = createDispatchSheetPage(page);
    const [first, second] = dispatchSheet.unitCodes;

    await units.goTo(dispatchSheet.categoryId);
    await units.selectUnit(first);
    await units.selectUnit(second);
    await units.getDispatchAction().click();
    await units
      .getPickerAction(dispatchSheet.customerName)
      .click();

    await expect(sheet.getSubmit()).toBeDisabled();

    for (const code of [first, second]) {
      await sheet
        .getFuelPreset(
          code,
          E2E_DISPATCH_READINGS.FIRST.PRESET
        )
        .click();
      await sheet
        .getUsageField(
          code,
          E2E_DISPATCH_READINGS.HOURS_LABEL
        )
        .fill(E2E_DISPATCH_READINGS.FIRST.HOURS_TEXT);
    }

    await expect(sheet.getSubmit()).toBeEnabled();
    await sheet.getSubmit().click();

    await expect(sheet.getDialog()).toHaveCount(
      E2E_COUNT.NONE
    );
    const readings =
      await dispatchSheet.readDispatchReadings();

    expect(readings[first].fuelOut).toBe(
      E2E_DISPATCH_READINGS.FIRST.FUEL
    );
    expect(readings[second].usageOut).toBe(
      E2E_DISPATCH_READINGS.FIRST.USAGE
    );
  });
});
