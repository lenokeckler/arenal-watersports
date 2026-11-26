import { E2E_DISPATCH_READINGS } from "../constants/E2eDispatchSheet.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createBoardCategoryUnitsPage } from "../pages/BoardCategoryUnits.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Edit mode of the unit board", () => {
  test("keeps the cards free of edit controls until the edit button is pressed", async ({
    boardMotorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const units = createBoardCategoryUnitsPage(page);
    const [first] = dispatchSheet.unitCodes;

    await units.goTo(dispatchSheet.categoryId);

    await expect(units.getModifyUnit(first)).toHaveCount(
      E2E_COUNT.NONE
    );
    await expect(units.getSelectUnit(first)).toHaveCount(
      E2E_COUNT.ONE
    );

    await units.getEditToggle().click();

    await expect(units.getModifyUnit(first)).toHaveCount(
      E2E_COUNT.ONE
    );
    await expect(units.getSelectUnit(first)).toHaveCount(
      E2E_COUNT.NONE
    );
  });

  test("saves the gauge level marked on the edit panel of a unit", async ({
    boardMotorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const units = createBoardCategoryUnitsPage(page);
    const [first] = dispatchSheet.unitCodes;

    await units.goTo(dispatchSheet.categoryId);
    await units.getEditToggle().click();
    await units.getModifyUnit(first).click();
    await units
      .getUnitSheet()
      .getByRole("button", {
        name: E2E_DISPATCH_READINGS.SECOND.LINE,
      })
      .click();
    await units.getSaveUnit().click();

    await expect(units.getUnitSheet()).toHaveCount(
      E2E_COUNT.NONE
    );
    expect(
      (await dispatchSheet.readDispatchReadings())[first]
        .fuelLevel
    ).toBe(E2E_DISPATCH_READINGS.SECOND.FUEL);
  });
});
