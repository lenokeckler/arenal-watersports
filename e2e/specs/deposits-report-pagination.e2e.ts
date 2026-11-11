import { expect } from "@playwright/test";
import { LIST_PAGINATION_COPY } from "@/app/components/list-pagination/constants/ListPaginationCopy.constants";
import { ARIA_ROLE } from "@/app/constants";
import { E2E_DEPOSITS_REPORT_PAGING } from "../constants/E2eDepositsReport.constants";
import { createDepositsReportPage } from "../pages/DepositsReport.page";
import { test } from "../support/depositsReportTest";

test.describe("Deposits report pagination", () => {
  test("an administrator pages through more retained deposits than fit in one page", async ({
    administratorPage: page,
    retainedPagingDeposits,
  }) => {
    const reportPage = createDepositsReportPage(page);
    const [oldest] = retainedPagingDeposits;
    const newest =
      retainedPagingDeposits[
        E2E_DEPOSITS_REPORT_PAGING.COUNT - 1
      ];

    await reportPage.goTo();

    await expect(
      reportPage.getRetainedRow(newest.customerName)
    ).toBeVisible();
    await expect(
      reportPage.getRetainedRow(oldest.customerName)
    ).toHaveCount(0);

    await reportPage
      .getRetainedPagination()
      .getByRole(ARIA_ROLE.LINK, {
        name: LIST_PAGINATION_COPY.NEXT,
      })
      .click();

    await expect(page).toHaveURL(
      E2E_DEPOSITS_REPORT_PAGING.SECOND_PAGE_URL
    );
    await expect(
      reportPage
        .getRetainedPagination()
        .getByText(
          E2E_DEPOSITS_REPORT_PAGING.SECOND_PAGE_STATUS
        )
    ).toBeVisible();
    await expect(
      reportPage.getRetainedRow(newest.customerName)
    ).toHaveCount(0);
    await expect(
      reportPage
        .getRetainedSection()
        .getByText(
          E2E_DEPOSITS_REPORT_PAGING.SEED.retentionReason
        )
        .first()
    ).toBeVisible();
  });
});
