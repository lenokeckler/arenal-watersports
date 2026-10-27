import { expect, test } from "@playwright/test";
import {
  E2E_DAMAGE_REPORT_COPY,
  E2E_DAMAGE_REPORT_SCREENSHOT_BASENAME,
} from "../constants/E2eDamageReport.constants";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { createDamageReportPage } from "../pages/DamageReport.page";
import { captureViewport } from "../support/captureViewport";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Damage report screenshots", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
  });

  test("captures the empty damage report form", async ({
    page,
  }, testInfo) => {
    const damageReportPage = createDamageReportPage(page);

    await damageReportPage.goTo();
    await damageReportPage.getHeading().waitFor();

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_DAMAGE_REPORT_SCREENSHOT_BASENAME.EMPTY_FORM,
        testInfo.project.name
      )
    );
  });

  test("captures the missing cause validation", async ({
    page,
  }, testInfo) => {
    const damageReportPage = createDamageReportPage(page);

    await damageReportPage.goTo();
    await damageReportPage.submit();
    await expect(
      damageReportPage.getCauseRequiredError()
    ).toHaveText(E2E_DAMAGE_REPORT_COPY.CAUSE_REQUIRED);

    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_DAMAGE_REPORT_SCREENSHOT_BASENAME.CAUSE_REQUIRED,
        testInfo.project.name
      )
    );
  });
});
