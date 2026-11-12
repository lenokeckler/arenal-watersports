import { DAMAGE_REPORTS_COPY } from "@/app/features/operations/damage-reports/constants/DamageReportsCopy.constants";
import { MAINTENANCE_COPY } from "@/app/features/operations/maintenance/constants/MaintenanceCopy.constants";
import { E2E_DAMAGE_REPORTS_SEED } from "../constants/E2eDamageReports.constants";
import { createDamageReportsPage } from "../pages/DamageReports.page";
import { createMaintenancePage } from "../pages/Maintenance.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Damage reports", () => {
  test("lists the reports of a unit, the latest first", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const reports = createDamageReportsPage(page);

    const unitId = await dispatchSheet.addDamageReports();
    await reports.goTo(unitId);

    await expect(reports.getHeading()).toBeVisible();
    await expect(reports.getReports()).toHaveCount(2);
    await expect(
      reports.getReports().first()
    ).toContainText(
      E2E_DAMAGE_REPORTS_SEED.ROLLOVER_DESCRIPTION
    );
    await expect(
      reports.getReports().first()
    ).toContainText(E2E_DAMAGE_REPORTS_SEED.ROLLOVER_LABEL);
    await expect(reports.getReports().last()).toContainText(
      E2E_DAMAGE_REPORTS_SEED.COLLISION_DESCRIPTION
    );
    await expect(reports.getReports().last()).toContainText(
      E2E_DAMAGE_REPORTS_SEED.COLLISION_LABEL
    );
  });

  test("says a unit has no reports and does not show the ones of another unit", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const reports = createDamageReportsPage(page);

    await dispatchSheet.addDamageReports();
    await reports.goTo(
      await dispatchSheet.readUnitId(
        dispatchSheet.unitCodes[1]
      )
    );

    await expect(reports.getEmptyMessage()).toBeVisible();
    await expect(reports.getReports()).toHaveCount(0);
  });

  test("says the unit was not found for an unknown one", async ({
    signedInPage: page,
  }) => {
    const reports = createDamageReportsPage(page);

    await reports.goTo(
      "00000000-0000-4000-8000-000000000000"
    );

    await expect(reports.getUnitNotFound()).toBeVisible();
  });

  test("opens from the card of a unit in maintenance", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const maintenance = createMaintenancePage(page);
    const reports = createDamageReportsPage(page);
    const [, damagedUnit] = dispatchSheet.unitCodes;

    await dispatchSheet.makeMaintenanceNeeds();
    await maintenance.goTo();
    await maintenance
      .getServiceSection()
      .getByRole("listitem")
      .filter({ hasText: damagedUnit })
      .getByRole("link", {
        name: MAINTENANCE_COPY.VIEW_DAMAGE_REPORTS,
      })
      .click();

    await expect(reports.getHeading()).toBeVisible();
    await expect(
      page.getByText(DAMAGE_REPORTS_COPY.EMPTY)
    ).toBeVisible();
  });
});
