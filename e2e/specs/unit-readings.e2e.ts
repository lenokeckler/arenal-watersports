import { UNIT_CORRECTION_COPY } from "@/app/features/operations/unit-readings/constants/UnitCorrectionCopy.constants";
import { UNIT_READINGS_COPY } from "@/app/features/operations/unit-readings/constants/UnitReadingsCopy.constants";
import { E2E_UNIT_CORRECTION } from "../constants/E2eUnitReadings.constants";
import { createUnitReadingsPage } from "../pages/UnitReadings.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Unit readings", () => {
  test("lists the units with a motor with their oil and service warnings", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const readings = createUnitReadingsPage(page);
    const [overUnit, damagedUnit] = dispatchSheet.unitCodes;

    await dispatchSheet.makeMaintenanceNeeds();
    await readings.goTo();

    await expect(readings.getHeading()).toBeVisible();
    await expect(readings.getCard(overUnit)).toContainText(
      UNIT_READINGS_COPY.OIL_OVERDUE
    );
    await expect(
      readings.getCard(damagedUnit)
    ).toContainText(UNIT_READINGS_COPY.OUT_OF_SERVICE);
    await expect(
      readings.getCard(damagedUnit)
    ).not.toContainText(UNIT_READINGS_COPY.OIL_OVERDUE);
  });

  test("does not list a unit without a motor", async ({
    dispatchSheet,
    signedInPage: page,
  }) => {
    const readings = createUnitReadingsPage(page);

    await readings.goTo();

    await expect(readings.getHeading()).toBeVisible();
    await expect(
      readings.getCard(dispatchSheet.unitCodes[0])
    ).toHaveCount(0);
  });

  test("corrects the gauge, the usage, the impacts and the status in the name of who did it", async ({
    activeWorker,
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const readings = createUnitReadingsPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await readings.goTo();
    await readings.openCorrection(unit);
    await expect(
      readings.getCorrectionHeading()
    ).toBeVisible();

    await readings
      .getFuelMax()
      .fill(E2E_UNIT_CORRECTION.FUEL_MAX);
    await readings
      .getFuelLevel()
      .fill(E2E_UNIT_CORRECTION.FUEL_LEVEL);
    await readings
      .getUsage()
      .fill(E2E_UNIT_CORRECTION.USAGE);
    await readings
      .getImpacts()
      .fill(E2E_UNIT_CORRECTION.IMPACTS);
    await readings
      .getStatus()
      .selectOption(E2E_UNIT_CORRECTION.STATUS);
    await readings.getSubmit().click();

    await expect(readings.getHeading()).toBeVisible();
    await expect
      .poll(
        async () =>
          (await dispatchSheet.readUnitCorrection(unit))
            .corrections.length
      )
      .toBe(1);

    const state =
      await dispatchSheet.readUnitCorrection(unit);

    expect(state).toMatchObject({
      fuelLevel: Number(E2E_UNIT_CORRECTION.FUEL_LEVEL),
      fuelMax: Number(E2E_UNIT_CORRECTION.FUEL_MAX),
      impactCount: Number(E2E_UNIT_CORRECTION.IMPACTS),
      status: E2E_UNIT_CORRECTION.STATUS,
      usageTotal: E2E_UNIT_CORRECTION.USAGE_VALUE,
    });
    expect(state.corrections[0].createdBy).toBe(
      activeWorker.id
    );
    await expect(readings.getCard(unit)).toContainText(
      UNIT_READINGS_COPY.OUT_OF_SERVICE
    );
  });

  test("says nothing changed when the form is sent as it came", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const readings = createUnitReadingsPage(page);

    await readings.goTo();
    await readings.openCorrection(
      dispatchSheet.unitCodes[0]
    );
    await readings.getSubmit().click();

    await expect(
      page.getByText(UNIT_CORRECTION_COPY.ERROR_UNCHANGED)
    ).toBeVisible();
    await expect(
      readings.getCorrectionHeading()
    ).toBeVisible();
  });
});
