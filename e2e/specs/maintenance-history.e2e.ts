import { E2E_MAINTENANCE_HISTORY_SEED } from "../constants/E2eMaintenanceHistory.constants";
import { createMaintenanceHistoryPage } from "../pages/MaintenanceHistory.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Maintenance history", () => {
  test("gathers every registered job with its unit, its date and its cost", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const history = createMaintenanceHistoryPage(page);
    const [first, second] = dispatchSheet.unitCodes;

    await dispatchSheet.addMaintenanceJobs();
    await history.goTo();

    await expect(history.getHeading()).toBeVisible();
    const partChange = history.getEntry(first);

    await expect(partChange).toContainText(
      E2E_MAINTENANCE_HISTORY_SEED.PART_CHANGE_LABEL
    );
    await expect(partChange).toContainText(
      E2E_MAINTENANCE_HISTORY_SEED.DESCRIPTION
    );
    await expect(partChange).toContainText(
      E2E_MAINTENANCE_HISTORY_SEED.COST_TEXT
    );
    await expect(partChange).toContainText(
      E2E_MAINTENANCE_HISTORY_SEED.EXTERNAL_TEXT
    );

    const tireChange = history.getEntry(second);

    await expect(tireChange).toContainText(
      E2E_MAINTENANCE_HISTORY_SEED.TIRE_CHANGE_LABEL
    );
    await expect(tireChange).toContainText(
      E2E_MAINTENANCE_HISTORY_SEED.NO_COST_TEXT
    );
  });
});
