import { MAINTENANCE_COPY } from "@/app/features/operations/maintenance/constants/MaintenanceCopy.constants";
import { UNIT_HISTORY_COPY } from "@/app/features/operations/unit-history/constants/UnitHistoryCopy.constants";
import { E2E_MAINTENANCE_SEED } from "../constants/E2eMaintenance.constants";
import { E2E_MAINTENANCE_RECORD_SEED } from "../constants/E2eMaintenanceRecordSeed.constants";
import { createMaintenancePage } from "../pages/Maintenance.page";
import { createUnitHistoryPage } from "../pages/UnitHistory.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Maintenance", () => {
  test("gathers the machines that reached their oil change with how far they went and the ones out of service", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const maintenance = createMaintenancePage(page);
    const history = createUnitHistoryPage(page);
    const [overUnit, damagedUnit] = dispatchSheet.unitCodes;

    await dispatchSheet.makeMaintenanceNeeds();
    await maintenance.goTo();

    await expect(
      maintenance.getAttentionChip(overUnit)
    ).toContainText(E2E_MAINTENANCE_SEED.OVERAGE_TEXT);
    await expect(
      maintenance.getAttentionChip(damagedUnit)
    ).toContainText(MAINTENANCE_COPY.STATUS.damaged);

    await maintenance.getAttentionChip(damagedUnit).click();

    await expect(
      history.getHeading(damagedUnit)
    ).toBeVisible();
  });

  test("opens the jobs of a day and the history of their machine", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const maintenance = createMaintenancePage(page);
    const history = createUnitHistoryPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await dispatchSheet.addMaintenanceJobs();
    await maintenance.goToDay(
      E2E_MAINTENANCE_RECORD_SEED.PERFORMED_AT
    );

    const job = maintenance.getDay().getByRole("link", {
      name: new RegExp(
        E2E_MAINTENANCE_RECORD_SEED.DESCRIPTION
      ),
    });
    await expect(job).toContainText(unit);
    await job.click();

    await expect(history.getHeading(unit)).toBeVisible();
    await expect(
      history.getJob(
        E2E_MAINTENANCE_RECORD_SEED.DESCRIPTION
      )
    ).toContainText(UNIT_HISTORY_COPY.EXTERNAL);
  });

  test("switches from the calendar to the charts", async ({
    signedInPage: page,
  }) => {
    const maintenance = createMaintenancePage(page);

    await maintenance.goToCalendar();
    await expect(maintenance.getHeading()).toBeVisible();
    await expect(maintenance.getCalendar()).toBeVisible();

    await maintenance.openSummary();

    await expect(
      maintenance.getSpendHeading()
    ).toBeVisible();
  });
});
