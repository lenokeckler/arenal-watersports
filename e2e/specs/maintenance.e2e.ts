import { MAINTENANCE_COPY } from "@/app/features/operations/maintenance/constants/MaintenanceCopy.constants";
import { E2E_MAINTENANCE_SEED } from "../constants/E2eMaintenance.constants";
import { createMaintenancePage } from "../pages/Maintenance.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Maintenance", () => {
  test("gathers the machines that reached their oil change with how far they went and the ones out of service", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const maintenance = createMaintenancePage(page);
    const [overUnit, damagedUnit] = dispatchSheet.unitCodes;

    await dispatchSheet.makeMaintenanceNeeds();
    await maintenance.goTo();

    await expect(maintenance.getHeading()).toBeVisible();
    const oilCard = maintenance
      .getOilSection()
      .getByRole("listitem")
      .filter({ hasText: overUnit });

    await expect(oilCard).toContainText(
      E2E_MAINTENANCE_SEED.OVERAGE_TEXT
    );
    await expect(
      maintenance
        .getOilSection()
        .getByRole("listitem")
        .filter({ hasText: damagedUnit })
    ).toHaveCount(0);

    const serviceCard = maintenance
      .getServiceSection()
      .getByRole("listitem")
      .filter({ hasText: damagedUnit });

    await expect(serviceCard).toContainText(
      MAINTENANCE_COPY.STATUS.damaged
    );
  });
});
