import { test } from "@playwright/test";
import { CURRENCY_CODE } from "@/app/constants";
import { captureViewport } from "../support/captureViewport";
import { createCategoryDepositFormPage } from "../pages/CategoryDepositForm.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { seedCategoryWithDeposit } from "../support/categoryDepositFixtures";
import {
  findCategoryId,
  removeDeletableCategory,
} from "../support/categoryFixtures";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import {
  E2E_CATEGORY_DEPOSIT_SCREENSHOT_STATE,
  E2E_DEPOSIT_INPUT,
  E2E_DEPOSIT_INVALID_INPUT_CASES,
  resolveCategoryDepositFixtureName,
  resolveCategoryDepositScreenshotBasename,
} from "../constants/E2eCategoryDeposit.constants";

const [INVALID_INPUT_CASE] =
  E2E_DEPOSIT_INVALID_INPUT_CASES;

test.describe("Category deposit screenshots", () => {
  test("captures the empty, filled and error states of the deposit form", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryDepositFixtureName(
      testInfo.project.name,
      "screenshot"
    );
    await seedCategoryWithDeposit(categoryName);
    const depositFormPage =
      createCategoryDepositFormPage(page);
    const capture = (state: string): Promise<void> =>
      captureViewport(
        page,
        resolveDeviceScreenshotFileName(
          resolveCategoryDepositScreenshotBasename(state),
          testInfo.project.name
        )
      );

    try {
      await logInAsAdmin(page);
      await depositFormPage.goTo(
        await findCategoryId(categoryName)
      );
      await depositFormPage.getHeading().waitFor();
      await capture(
        E2E_CATEGORY_DEPOSIT_SCREENSHOT_STATE.EMPTY
      );

      await depositFormPage.fillAmount(
        CURRENCY_CODE.USD,
        E2E_DEPOSIT_INPUT.USD
      );
      await depositFormPage.fillAmount(
        CURRENCY_CODE.CRC,
        E2E_DEPOSIT_INPUT.CRC
      );
      await capture(
        E2E_CATEGORY_DEPOSIT_SCREENSHOT_STATE.FILLED
      );

      await depositFormPage.fillAmount(
        INVALID_INPUT_CASE.currency,
        INVALID_INPUT_CASE.amountText
      );
      await depositFormPage.submit();
      await depositFormPage
        .getAmountError(INVALID_INPUT_CASE.currency)
        .waitFor();
      await capture(
        E2E_CATEGORY_DEPOSIT_SCREENSHOT_STATE.ERROR
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});
