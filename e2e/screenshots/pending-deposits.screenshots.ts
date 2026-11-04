import { E2E_PENDING_DEPOSITS_SCREENSHOT_BASENAME } from "../constants/E2ePendingDeposits.constants";
import { createPendingDepositsPage } from "../pages/PendingDeposits.page";
import { captureFullPage } from "../support/captureFullPage";
import {
  expect,
  test,
} from "../support/pendingDepositsTest";

test.describe("Pending deposits screenshots", () => {
  test("captures the list with held deposits", async ({
    pendingDeposits,
    reservationsPage: page,
  }, testInfo) => {
    const depositsPage = createPendingDepositsPage(page);

    await depositsPage.goTo();
    await expect(
      depositsPage.getRow(pendingDeposits.usd.customerName)
    ).toBeVisible();
    await expect(
      depositsPage.getRow(pendingDeposits.crc.customerName)
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_PENDING_DEPOSITS_SCREENSHOT_BASENAME.LIST,
      testInfo.project.name
    );
  });
});
