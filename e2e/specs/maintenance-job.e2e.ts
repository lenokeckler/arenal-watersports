import { PATHS } from "@/app/constants";
import { E2E_MAINTENANCE_JOB } from "../constants/E2eMaintenanceJob.constants";
import { E2E_MAINTENANCE_SEED } from "../constants/E2eMaintenance.constants";
import { createMaintenanceJobPage } from "../pages/MaintenanceJob.page";
import { createMaintenancePage } from "../pages/Maintenance.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Maintenance job", () => {
  test("registers a job with its cost, its currency and the external mark in the name of who did it", async ({
    activeWorker,
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const form = createMaintenanceJobPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await form.goTo();
    await expect(form.getHeading()).toBeVisible();
    await form.getUnit().selectOption({
      label: `${unit}${E2E_MAINTENANCE_JOB.UNIT_SEPARATOR}${dispatchSheet.categoryName}`,
    });
    await form.getWorkType().selectOption({
      label: E2E_MAINTENANCE_JOB.PART_CHANGE,
    });
    await form
      .getDescription()
      .fill(E2E_MAINTENANCE_JOB.DESCRIPTION);
    await form.getCost().fill(E2E_MAINTENANCE_JOB.COST);
    await form.getCurrency().selectOption({
      label: E2E_MAINTENANCE_JOB.CURRENCY_LABEL,
    });
    await form.getExternal().check();
    await form.getSubmit().click();

    await page.waitForURL(
      `**${PATHS.OPERATIONS.MAINTENANCE}`
    );

    const { jobs } =
      await dispatchSheet.readMaintenanceJobs();

    expect(jobs).toHaveLength(1);
    expect(jobs[0]).toMatchObject({
      costAmount: E2E_MAINTENANCE_JOB.COST_AMOUNT,
      costCurrency: E2E_MAINTENANCE_JOB.CURRENCY_VALUE,
      createdBy: activeWorker.id,
      description: E2E_MAINTENANCE_JOB.DESCRIPTION,
      isExternal: true,
      unitCode: unit,
      workType: "part_change",
    });
  });

  test("schedules the next oil change from the interval and the unit leaves the oil change list", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const form = createMaintenanceJobPage(page);
    const maintenance = createMaintenancePage(page);
    const [unit] = dispatchSheet.unitCodes;

    await dispatchSheet.makeMaintenanceNeeds();
    await maintenance.goTo();
    await expect(
      maintenance.getAttentionChip(unit)
    ).toContainText(E2E_MAINTENANCE_SEED.OVERAGE_TEXT);

    await form.goTo();
    await form.getUnit().selectOption({
      label: `${unit}${E2E_MAINTENANCE_JOB.UNIT_SEPARATOR}${dispatchSheet.categoryName}`,
    });
    await form.getWorkType().selectOption({
      label: E2E_MAINTENANCE_JOB.OIL_CHANGE,
    });
    await form
      .getNextOilChange()
      .fill(E2E_MAINTENANCE_JOB.OIL_INTERVAL);
    await form.getSubmit().click();

    await page.waitForURL(
      `**${PATHS.OPERATIONS.MAINTENANCE}`
    );
    await maintenance.goTo();
    await expect(maintenance.getHeading()).toBeVisible();
    await expect(
      maintenance.getAttentionChip(unit)
    ).toHaveCount(0);

    const { nextOilChangeAt } =
      await dispatchSheet.readMaintenanceJobs();

    expect(nextOilChangeAt[unit]).toBe(
      E2E_MAINTENANCE_JOB.NEW_THRESHOLD_VALUE
    );
  });
});
