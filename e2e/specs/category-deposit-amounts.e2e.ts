import { expect, test } from "@playwright/test";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { createCategoryDepositFormPage } from "../pages/CategoryDepositForm.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  readCategoryDeposit,
  seedCategoryWithDeposit,
} from "../support/categoryDepositFixtures";
import {
  findCategoryId,
  removeDeletableCategory,
} from "../support/categoryFixtures";
import {
  E2E_DEPOSIT_BOTH,
  E2E_DEPOSIT_NONE,
  E2E_DEPOSIT_SINGLE_CURRENCY_CASES,
  resolveCategoryDepositFixtureName,
} from "../constants/E2eCategoryDeposit.constants";

test.describe("Category deposit amounts", () => {
  test("clearing both fields stores no deposit", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryDepositFixtureName(
      testInfo.project.name,
      "clear"
    );
    await seedCategoryWithDeposit(
      categoryName,
      E2E_DEPOSIT_BOTH
    );
    const depositFormPage =
      createCategoryDepositFormPage(page);

    try {
      await logInAsAdmin(page);
      await depositFormPage.goTo(
        await findCategoryId(categoryName)
      );
      await depositFormPage.fillAmount(
        CURRENCY_CODE.USD,
        STRING.Empty
      );
      await depositFormPage.fillAmount(
        CURRENCY_CODE.CRC,
        STRING.Empty
      );
      await depositFormPage.submit();

      await expect(
        depositFormPage.getToastMessage(
          CATEGORY_CATALOG_COPY.DEPOSIT_UPDATE_SUCCESS_TOAST
        )
      ).toBeVisible();
      expect(
        await readCategoryDeposit(categoryName)
      ).toEqual(E2E_DEPOSIT_NONE);

      await depositFormPage.reload();

      await expect(
        depositFormPage.getAmountInput(CURRENCY_CODE.USD)
      ).toHaveValue(STRING.Empty);
      await expect(
        depositFormPage.getAmountInput(CURRENCY_CODE.CRC)
      ).toHaveValue(STRING.Empty);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  for (const saveCase of E2E_DEPOSIT_SINGLE_CURRENCY_CASES) {
    test(`saves a single currency (${saveCase.scenario})`, async ({
      page,
    }, testInfo) => {
      const categoryName =
        resolveCategoryDepositFixtureName(
          testInfo.project.name,
          saveCase.scenario
        );
      await seedCategoryWithDeposit(categoryName);
      const depositFormPage =
        createCategoryDepositFormPage(page);

      try {
        await logInAsAdmin(page);
        await depositFormPage.goTo(
          await findCategoryId(categoryName)
        );
        await depositFormPage.fillAmount(
          saveCase.currency,
          saveCase.amountText
        );
        await depositFormPage.submit();

        await expect(
          depositFormPage.getToastMessage(
            CATEGORY_CATALOG_COPY.DEPOSIT_UPDATE_SUCCESS_TOAST
          )
        ).toBeVisible();
        expect(
          await readCategoryDeposit(categoryName)
        ).toEqual(saveCase.expected);

        await depositFormPage.reload();

        await expect(
          depositFormPage.getAmountInput(saveCase.currency)
        ).not.toHaveValue(STRING.Empty);
      } finally {
        await removeDeletableCategory(categoryName);
      }
    });
  }
});
