import { expect, test as baseTest } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { DEPOSITS_REPORT_COPY } from "@/app/features/administration/deposits-report/constants/DepositsReportCopy.constants";
import { createDepositsReportPage } from "../pages/DepositsReport.page";
import { test } from "../support/depositsReportTest";

test.describe("Deposits report access", () => {
  test("a worker who is not an administrator is redirected home and sees no deposit data", async ({
    depositsReport,
    reservationsPage: page,
  }) => {
    const reportPage = createDepositsReportPage(page);

    await reportPage.goTo();

    await expect(page).toHaveURL(PATHS.HOME);
    await expect(reportPage.getMain()).not.toContainText(
      depositsReport.heldUsd.customerName
    );
    await expect(reportPage.getMain()).not.toContainText(
      DEPOSITS_REPORT_COPY.PENDING_HEADING
    );
  });
});

baseTest.describe("Deposits report signed out", () => {
  baseTest(
    "sends a signed-out visitor to the login",
    async ({ page }) => {
      await createDepositsReportPage(page).goTo();

      await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    }
  );
});
