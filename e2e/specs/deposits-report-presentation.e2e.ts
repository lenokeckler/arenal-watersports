import { expect } from "@playwright/test";
import { DEPOSITS_REPORT_COPY } from "@/app/features/administration/deposits-report/constants/DepositsReportCopy.constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { E2E_DEPOSITS_REPORT_TOTAL_PATTERN } from "../constants/E2eDepositsReport.constants";
import { createDepositsReportPage } from "../pages/DepositsReport.page";
import { test } from "../support/depositsReportTest";

test.describe("Deposits report presentation", () => {
  test("a retained deposit without a written reason says there is no recorded reason", async ({
    administratorPage: page,
    depositsReport,
  }) => {
    const reportPage = createDepositsReportPage(page);

    await reportPage.goTo();

    await expect(
      reportPage.getRetainedRow(
        depositsReport.blankReason.customerName
      )
    ).toContainText(DEPOSITS_REPORT_COPY.NO_REASON);
    await expect(
      reportPage.getRetainedRow(
        depositsReport.retainedUsd.customerName
      )
    ).not.toContainText(DEPOSITS_REPORT_COPY.NO_REASON);
  });

  test("dollars and colones stay in separate rows and no total appears", async ({
    administratorPage: page,
    depositsReport,
  }) => {
    const reportPage = createDepositsReportPage(page);

    await reportPage.goTo();

    const usdRow = reportPage.getPendingRow(
      depositsReport.heldUsd.customerName
    );
    const crcRow = reportPage.getPendingRow(
      depositsReport.heldCrc.customerName
    );
    await expect(usdRow).toContainText(
      formatMoney(depositsReport.heldUsd)
    );
    await expect(usdRow).not.toContainText(
      formatMoney(depositsReport.heldCrc)
    );
    await expect(crcRow).toContainText(
      formatMoney(depositsReport.heldCrc)
    );
    await expect(crcRow).not.toContainText(
      formatMoney(depositsReport.heldUsd)
    );
    await expect(reportPage.getMain()).not.toContainText(
      E2E_DEPOSITS_REPORT_TOTAL_PATTERN
    );
  });
});
