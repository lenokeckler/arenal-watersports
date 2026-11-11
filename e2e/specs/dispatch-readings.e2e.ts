import { DISPATCH_SHEET_COPY } from "@/app/components/dispatch-board/constants/DispatchSheetCopy.constants";
import { E2E_DISPATCH_READINGS } from "../constants/E2eDispatchSheet.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createDispatchSheetPage } from "../pages/DispatchSheet.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Dispatch sheet readings", () => {
  test("asks for the gauge and the hours of each motor unit and writes them on the item and on the unit", async ({
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
    await sheet.getUnit(first).check();
    await sheet.getUnit(second).check();

    await expect(sheet.getSubmit()).toBeDisabled();

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

    await expect(sheet.getSubmit()).toBeEnabled();
    await sheet.getSubmit().click();

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

  test("refuses hours below the last reading and keeps the dispatch closed", async ({
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
    await sheet.getUnit(first).check();
    await sheet.getUnit(second).check();

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
        .fill(E2E_DISPATCH_READINGS.HOURS_BELOW_LAST);
    }

    await expect(sheet.getDialog()).toContainText(
      DISPATCH_SHEET_COPY.USAGE_BELOW_PREFIX
    );
    await expect(sheet.getSubmit()).toBeDisabled();
    expect(
      (await dispatchSheet.readDispatchState())
        .dispatchCount
    ).toBe(E2E_COUNT.NONE);
  });
});
