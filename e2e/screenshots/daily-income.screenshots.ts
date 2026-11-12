import { E2E_DAILY_INCOME_SCREENSHOT_BASENAME } from "../constants/E2eDailyIncome.constants";
import { createDailyIncomePage } from "../pages/DailyIncome.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/dailyIncomeTest";

test.describe("Daily income screenshots", () => {
  test("captures both currency cards with today's charges", async ({
    dailyIncome,
    reservationsPage: page,
  }, testInfo) => {
    const incomePage = createDailyIncomePage(page);

    await incomePage.goTo();
    for (const charge of [
      dailyIncome.usd,
      dailyIncome.crc,
    ]) {
      await expect(
        incomePage.getMethodRow(
          charge.currency,
          charge.paymentMethod
        )
      ).toBeVisible();
    }

    await captureFullPage(
      page,
      E2E_DAILY_INCOME_SCREENSHOT_BASENAME.CARDS,
      testInfo.project.name
    );
  });
});
