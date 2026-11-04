import { E2E_DEPOSITS_REPORT_SCREENSHOT_BASENAME } from "../constants/E2eDepositsReport.constants";
import { createDepositsReportPage } from "../pages/DepositsReport.page";
import { captureFullPage } from "../support/captureFullPage";
import {
  expect,
  test,
} from "../support/depositsReportTest";

test.describe("Deposits report screenshots", () => {
  test("captures the list with pending and retained deposits", async ({
    administratorPage: page,
    depositsReport,
  }, testInfo) => {
    const reportPage = createDepositsReportPage(page);

    await reportPage.goTo();
    await expect(
      reportPage.getPendingRow(
        depositsReport.heldUsd.customerName
      )
    ).toBeVisible();
    await expect(
      reportPage.getRetainedRow(
        depositsReport.partialCrc.customerName
      )
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_DEPOSITS_REPORT_SCREENSHOT_BASENAME.LIST,
      testInfo.project.name
    );
  });

  test("captures a retained deposit with a blank reason", async ({
    administratorPage: page,
    depositsReport,
  }, testInfo) => {
    const reportPage = createDepositsReportPage(page);

    await reportPage.goTo();
    await expect(
      reportPage.getRetainedRow(
        depositsReport.blankReason.customerName
      )
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_DEPOSITS_REPORT_SCREENSHOT_BASENAME.BLANK_REASON,
      testInfo.project.name
    );
  });
});
