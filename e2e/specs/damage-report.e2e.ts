import { DAMAGE_CAUSE_ORDER } from "@/app/constants";
import { DAMAGE_REPORT_COPY } from "@/app/features/operations/damage-report/constants/DamageReportCopy.constants";
import { DAMAGE_REPORTS_COPY } from "@/app/features/operations/damage-reports/constants/DamageReportsCopy.constants";
import { E2E_DAMAGE_REPORT_FORM_INPUT } from "../constants/E2eDamageReport.constants";
import { createDamageReportPage } from "../pages/DamageReport.page";
import { createDamageReportsPage } from "../pages/DamageReports.page";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Damage report", () => {
  test("shows every field and the four causes", async ({
    signedInPage: page,
  }) => {
    const report = createDamageReportPage(page);

    await report.goTo();

    await expect(report.getHeading()).toHaveText(
      DAMAGE_REPORT_COPY.TITLE
    );
    await expect(report.getUnitSelect()).toBeVisible();
    for (const cause of DAMAGE_CAUSE_ORDER) {
      await expect(report.getCause(cause)).toBeAttached();
    }
    await expect(
      report.getDescriptionInput()
    ).toBeVisible();
    await expect(report.getHits()).toBeVisible();
  });

  test("requires a cause before saving", async ({
    signedInPage: page,
  }) => {
    const report = createDamageReportPage(page);

    await report.goTo();
    await report.submit();

    await expect(
      report.getCauseRequiredError()
    ).toBeVisible();
  });

  test("saves a report, adds its hits and takes the machine out of service", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const report = createDamageReportPage(page);
    const reports = createDamageReportsPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await report.goToUnit(
      await dispatchSheet.readUnitId(unit)
    );
    await report.chooseCause("rollover");
    await report.fillDescription(
      E2E_DAMAGE_REPORT_FORM_INPUT.DESCRIPTION
    );
    await report.moreHits();
    await report.submit();

    await expect(
      reports.getSaved(DAMAGE_REPORTS_COPY.SAVED.complete)
    ).toBeVisible();
    await reports.openToday();
    await expect(reports.getReport(unit)).toContainText(
      E2E_DAMAGE_REPORT_FORM_INPUT.DESCRIPTION
    );
    await expect
      .poll(() => dispatchSheet.readUnitCorrection(unit))
      .toMatchObject({ impactCount: 2, status: "damaged" });
  });

  test("leaves the detail for later and completes it afterwards without counting the hits twice", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const report = createDamageReportPage(page);
    const reports = createDamageReportsPage(page);
    const [unit] = dispatchSheet.unitCodes;

    await report.goToUnit(
      await dispatchSheet.readUnitId(unit)
    );
    await report.submitLater();

    await expect(
      reports.getSaved(DAMAGE_REPORTS_COPY.SAVED.later)
    ).toBeVisible();
    await reports.openToday();
    await reports.openCompletion(unit);
    await expect(report.getHeading()).toHaveText(
      DAMAGE_REPORT_COPY.TITLE_COMPLETE
    );
    await report.chooseCause("machine_failure");
    await report.fillDescription(
      E2E_DAMAGE_REPORT_FORM_INPUT.PENDING_DESCRIPTION
    );
    await report.submit();
    await reports.openToday();

    await expect(reports.getReport(unit)).toContainText(
      E2E_DAMAGE_REPORT_FORM_INPUT.PENDING_DESCRIPTION
    );
    await expect
      .poll(() => dispatchSheet.readUnitCorrection(unit))
      .toMatchObject({ impactCount: 1, status: "damaged" });
  });
});
