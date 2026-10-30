import { CURRENCY_CODE } from "@/app/constants";
import { E2E_INCOME_SCREENSHOT_BASENAME } from "../constants/E2eIncome.constants";
import { createIncomePage } from "../pages/Income.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/incomeTest";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Daily income report screenshots", () => {
  test("captures both currency cards with today's movements", async ({
    incomeMovements,
    page,
  }, testInfo) => {
    const incomePage = createIncomePage(page);
    await signInAsSeededWorker(page);
    await incomePage.goTo();

    expect(incomeMovements.chargeIds).toHaveLength(2);
    await expect(
      incomePage.getNegativeNote(CURRENCY_CODE.CRC)
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_INCOME_SCREENSHOT_BASENAME.REPORT,
      testInfo.project.name
    );
  });
});
