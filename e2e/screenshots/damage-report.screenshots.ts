import { DAMAGE_REPORT_COPY } from "@/app/features/operations/damage-report/constants/DamageReportCopy.constants";
import { E2E_DAMAGE_REPORT_SCREENSHOT_BASENAME } from "../constants/E2eDamageReport.constants";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { createDamageReportPage } from "../pages/DamageReport.page";
import { captureFullPage } from "../support/captureFullPage";
import { captureViewport } from "../support/captureViewport";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Damage report screenshots", () => {
  test("captures the form for a machine", async ({
    motorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const damageReportPage = createDamageReportPage(page);

    await damageReportPage.goToUnit(
      await dispatchSheet.readUnitId(
        dispatchSheet.unitCodes[0]
      )
    );
    await damageReportPage.getHeading().waitFor();

    await captureFullPage(
      page,
      E2E_DAMAGE_REPORT_SCREENSHOT_BASENAME.EMPTY_FORM,
      testInfo.project.name
    );
  });

  test("captures the missing cause validation", async ({
    signedInPage: page,
  }, testInfo) => {
    const damageReportPage = createDamageReportPage(page);

    await damageReportPage.goTo();
    await damageReportPage.submit();
    await expect(
      damageReportPage.getCauseRequiredError()
    ).toHaveText(DAMAGE_REPORT_COPY.CAUSE_REQUIRED_ERROR);

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_DAMAGE_REPORT_SCREENSHOT_BASENAME.CAUSE_REQUIRED,
        testInfo.project.name
      )
    );
  });
});
