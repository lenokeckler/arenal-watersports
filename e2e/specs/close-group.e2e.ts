import { E2E_CLOSE_GROUP } from "../constants/E2eCloseGroup.constants";
import { E2E_DISPATCH_READINGS } from "../constants/E2eDispatchSheet.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";
import { createDispatchSheetPage } from "../pages/DispatchSheet.page";
import { createMaintenancePage } from "../pages/Maintenance.page";
import { createOutOnWaterPage } from "../pages/OutOnWater.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Group closing", () => {
  test("closes a group that came back in order and closes the reservation", async ({
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
      .getCloseButton(dispatchSheet.customerName)
      .click();
    await expect(
      outOnWater.getCloseArrival()
    ).toBeVisible();
    await expect(
      outOnWater.getCloseConfirm()
    ).toBeEnabled();
    await outOnWater.getCloseConfirm().click();

    await expect(outOnWater.getAdjustDialog()).toHaveCount(
      E2E_COUNT.NONE
    );
    await expect(
      outOnWater.getGroup(dispatchSheet.customerName)
    ).toHaveCount(E2E_COUNT.NONE);

    const closing = await dispatchSheet.readGroupClosing();

    expect(closing.closedAt).not.toBeNull();
    expect(closing.reservationStatus).toBe(
      E2E_CLOSE_GROUP.RESERVATION_CLOSED
    );
    expect(closing.damageReports).toBe(E2E_COUNT.NONE);
  });

  test("asks for the fuel and the hours of a motor unit and keeps them on the item and on the unit", async ({
    motorDispatchSheet: dispatchSheet,
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

    await expect(
      outOnWater.getCloseConfirm()
    ).toBeDisabled();
    await outOnWater
      .getCloseUsage(first)
      .fill(E2E_CLOSE_GROUP.HOURS_BELOW_DEPARTURE);
    await expect(
      outOnWater.getCloseConfirm()
    ).toBeDisabled();

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
    await outOnWater.getCloseConfirm().click();

    await expect(
      outOnWater.getGroup(dispatchSheet.customerName)
    ).toHaveCount(E2E_COUNT.NONE);

    const closing = await dispatchSheet.readGroupClosing();

    expect(closing.units[first]).toMatchObject({
      fuelIn: E2E_CLOSE_GROUP.FIRST.FUEL,
      fuelLevel: E2E_CLOSE_GROUP.FIRST.FUEL,
      usageIn: E2E_CLOSE_GROUP.FIRST.USAGE,
      usageTotal: E2E_CLOSE_GROUP.FIRST.USAGE,
    });
    expect(closing.units[second]).toMatchObject({
      fuelIn: E2E_CLOSE_GROUP.SECOND.FUEL,
      fuelLevel: E2E_CLOSE_GROUP.SECOND.FUEL,
      usageIn: E2E_CLOSE_GROUP.SECOND.USAGE,
      usageTotal: E2E_CLOSE_GROUP.SECOND.USAGE,
    });
  });

  test("raises the damage report of a unit that came back damaged and changes its state", async ({
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
      .getCloseButton(dispatchSheet.customerName)
      .click();
    await outOnWater.getCloseDamage(first).check();

    await expect(
      outOnWater.getCloseConfirm()
    ).toBeDisabled();
    await outOnWater
      .getCloseCause(first)
      .selectOption({ label: E2E_CLOSE_GROUP.CAUSE_LABEL });
    await outOnWater
      .getCloseDescription(first)
      .fill(E2E_CLOSE_GROUP.DESCRIPTION);
    await expect(
      outOnWater.getCloseConfirm()
    ).toBeEnabled();
    await outOnWater.getCloseConfirm().click();

    await expect(
      outOnWater.getGroup(dispatchSheet.customerName)
    ).toHaveCount(E2E_COUNT.NONE);

    const closing = await dispatchSheet.readGroupClosing();

    expect(closing.damageReports).toBe(
      E2E_CLOSE_GROUP.ONE_REPORT
    );
    expect(closing.units[first].status).toBe(
      E2E_CLOSE_GROUP.UNIT_DAMAGED
    );
    expect(closing.units[second].status).toBe(
      E2E_CLOSE_GROUP.UNIT_AVAILABLE
    );
  });

  test("sends a unit to maintenance when it is marked at the return and lists it as out of service", async ({
    dispatchSheet,
    signedInPage: page,
  }) => {
    const board = createDispatchBoardPage(page);
    const sheet = createDispatchSheetPage(page);
    const outOnWater = createOutOnWaterPage(page);
    const maintenance = createMaintenancePage(page);
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
    await outOnWater.getCloseConfirm().click();
    await expect(
      outOnWater.getGroup(dispatchSheet.customerName)
    ).toHaveCount(E2E_COUNT.NONE);

    const closing = await dispatchSheet.readGroupClosing();

    expect(closing.units[first].status).toBe(
      E2E_CLOSE_GROUP.UNIT_IN_MAINTENANCE
    );
    expect(closing.units[second].status).toBe(
      E2E_CLOSE_GROUP.UNIT_AVAILABLE
    );
    expect(closing.damageReports).toBe(E2E_COUNT.NONE);

    await maintenance.goTo();
    await expect(
      maintenance
        .getServiceSection()
        .getByRole("listitem")
        .filter({ hasText: first })
    ).toBeVisible();
  });
});
