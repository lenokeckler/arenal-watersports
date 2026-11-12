import { E2E_MAINTENANCE_COST_SEED } from "../constants/E2eMaintenanceCost.constants";
import { createMaintenanceCostPage } from "../pages/MaintenanceCost.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Maintenance cost by machine", () => {
  test("shows how much a machine has cost to keep from its registered jobs", async ({
    motorDispatchSheet: dispatchSheet,
    administratorPage: page,
  }) => {
    const report = createMaintenanceCostPage(page);
    const [costly, free] = dispatchSheet.unitCodes;

    await dispatchSheet.addMaintenanceJobs();
    await report.goTo();

    await expect(report.getHeading()).toBeVisible();
    const entry = report.getEntry(costly);

    await expect(entry).toContainText(
      E2E_MAINTENANCE_COST_SEED.TOTAL_TEXT
    );
    await expect(entry).toContainText(
      E2E_MAINTENANCE_COST_SEED.JOBS_TEXT
    );
    await expect(entry).toContainText(
      E2E_MAINTENANCE_COST_SEED.LAST_JOB_TEXT
    );
    await expect(report.getEntry(free)).toHaveCount(0);
  });
});
