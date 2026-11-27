import { E2E_DISPATCH_READINGS } from "../constants/E2eDispatchSheet.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createDispatchSheetPage } from "../pages/DispatchSheet.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Dispatch sheet readings", () => {
  test("starts the gauge at the last level, lets a unit leave untouched and writes the marked level on the item and on the unit", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);
    const [first, second, third] = dispatchSheet.unitCodes;

    await board.goTo();
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();
    await sheet.getUnit(first).click();
    await sheet.getUnit(second).click();

    await expect(sheet.getSubmit()).toBeEnabled();

    await sheet
      .getGaugeLine(
        second,
        E2E_DISPATCH_READINGS.SECOND.LINE
      )
      .click();
    await sheet.confirm();

    await expect(sheet.getDialog()).toHaveCount(
      E2E_COUNT.NONE
    );
    expect(
      await dispatchSheet.readDispatchReadings()
    ).toEqual({
      [first]: {
        fuelLevel: E2E_DISPATCH_READINGS.FIRST.FUEL,
        fuelOut: E2E_DISPATCH_READINGS.FIRST.FUEL,
        usageOut: E2E_DISPATCH_READINGS.FIRST.USAGE,
        usageTotal: E2E_DISPATCH_READINGS.FIRST.USAGE,
      },
      [second]: {
        fuelLevel: E2E_DISPATCH_READINGS.SECOND.FUEL,
        fuelOut: E2E_DISPATCH_READINGS.SECOND.FUEL,
        usageOut: E2E_DISPATCH_READINGS.SECOND.USAGE,
        usageTotal: E2E_DISPATCH_READINGS.SECOND.USAGE,
      },
      [third]: {
        fuelLevel: E2E_DISPATCH_READINGS.LAST_FUEL,
        fuelOut: null,
        usageOut: null,
        usageTotal: E2E_DISPATCH_READINGS.LAST_USAGE,
      },
    });
  });

  test("asks for no hours and no fuel number when dispatching", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);
    const [first, second] = dispatchSheet.unitCodes;

    await board.goTo();
    await sheet
      .getOpenButton(dispatchSheet.customerName)
      .click();
    await sheet.getUnit(first).click();
    await sheet.getUnit(second).click();

    await expect(
      sheet.getDialog().getByLabel(/Horas de motor/)
    ).toHaveCount(E2E_COUNT.NONE);
    expect(
      (await dispatchSheet.readDispatchState())
        .dispatchCount
    ).toBe(E2E_COUNT.NONE);
  });
});
