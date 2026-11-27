import { E2E_DAMAGE_REPORTS_SEED } from "../constants/E2eDamageReports.constants";
import { createDamageReportsPage } from "../pages/DamageReports.page";
import { createUnitHistoryPage } from "../pages/UnitHistory.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Damage reports", () => {
  test("filters the reports by tapping a cause of the chart", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const reports = createDamageReportsPage(page);

    await dispatchSheet.addDamageReports();
    await reports.goToCharts();
    await expect(reports.getHeading()).toBeVisible();
    await reports.filterByCause("rollover");

    await expect(page).toHaveURL(/cause=rollover/);
    await reports.openToday();
    await expect(
      reports.getReport(dispatchSheet.unitCodes[0])
    ).toContainText(
      E2E_DAMAGE_REPORTS_SEED.ROLLOVER_DESCRIPTION
    );
    await expect(
      page.getByText(
        E2E_DAMAGE_REPORTS_SEED.COLLISION_DESCRIPTION
      )
    ).toHaveCount(0);
  });

  test("sends the old address of a machine to its history", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const reports = createDamageReportsPage(page);
    const history = createUnitHistoryPage(page);

    const unitId = await dispatchSheet.addDamageReports();
    await reports.goToLegacyUnit(unitId);

    await expect(
      history.getHeading(dispatchSheet.unitCodes[0])
    ).toBeVisible();
    await expect(history.getDamage()).toHaveCount(2);
  });

  test("says the machine was not found for an unknown one", async ({
    signedInPage: page,
  }) => {
    const history = createUnitHistoryPage(page);

    await history.goTo(
      "00000000-0000-4000-8000-000000000000"
    );

    await expect(history.getNotFound()).toBeVisible();
  });
});
