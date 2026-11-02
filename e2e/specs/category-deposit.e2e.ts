import { expect, test } from "@playwright/test";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { createCategoryDepositFormPage } from "../pages/CategoryDepositForm.page";
import { createCategoryListPage } from "../pages/CategoryList.page";
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
  E2E_DEPOSIT_INPUT,
  E2E_DEPOSIT_STORED,
  resolveCategoryDepositFixtureName,
} from "../constants/E2eCategoryDeposit.constants";

const BOTH_FIELDS_EMPTY = 2;

test.describe("Category deposit", () => {
  test("opens from the card link with both fields empty and the placeholder", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryDepositFixtureName(
      testInfo.project.name,
      "open"
    );
    await seedCategoryWithDeposit(categoryName);
    const categoryListPage = createCategoryListPage(page);
    const depositFormPage =
      createCategoryDepositFormPage(page);

    try {
      await logInAsAdmin(page);
      await categoryListPage.goToCategory(categoryName);
      await depositFormPage.clickDepositLink(
        categoryListPage.getCategoryCard(categoryName)
      );

      await expect(
        depositFormPage.getHeading()
      ).toBeVisible();
      await expect(
        depositFormPage.getPlaceholderInputs()
      ).toHaveCount(BOTH_FIELDS_EMPTY);
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

  test("saves both amounts, shows the toast and keeps them when reopened", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryDepositFixtureName(
      testInfo.project.name,
      "save"
    );
    await seedCategoryWithDeposit(categoryName);
    const depositFormPage =
      createCategoryDepositFormPage(page);

    try {
      await logInAsAdmin(page);
      const categoryId = await findCategoryId(categoryName);
      await depositFormPage.goTo(categoryId);
      await depositFormPage.fillAmount(
        CURRENCY_CODE.USD,
        E2E_DEPOSIT_INPUT.USD
      );
      await depositFormPage.fillAmount(
        CURRENCY_CODE.CRC,
        E2E_DEPOSIT_INPUT.CRC
      );
      await depositFormPage.submit();

      await expect(
        depositFormPage.getToastMessage(
          CATEGORY_CATALOG_COPY.DEPOSIT_UPDATE_SUCCESS_TOAST
        )
      ).toBeVisible();

      await depositFormPage.goTo(categoryId);

      await expect(
        depositFormPage.getAmountInput(CURRENCY_CODE.USD)
      ).toHaveValue(E2E_DEPOSIT_INPUT.USD);
      await expect(
        depositFormPage.getAmountInput(CURRENCY_CODE.CRC)
      ).toHaveValue(E2E_DEPOSIT_INPUT.CRC);
      expect(
        await readCategoryDeposit(categoryName)
      ).toEqual(E2E_DEPOSIT_BOTH);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("changes an existing amount and it persists", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryDepositFixtureName(
      testInfo.project.name,
      "change"
    );
    await seedCategoryWithDeposit(
      categoryName,
      E2E_DEPOSIT_BOTH
    );
    const depositFormPage =
      createCategoryDepositFormPage(page);

    try {
      await logInAsAdmin(page);
      const categoryId = await findCategoryId(categoryName);
      await depositFormPage.goTo(categoryId);
      await depositFormPage.fillAmount(
        CURRENCY_CODE.USD,
        E2E_DEPOSIT_INPUT.CHANGED_USD
      );
      await depositFormPage.submit();

      await expect(
        depositFormPage.getToastMessage(
          CATEGORY_CATALOG_COPY.DEPOSIT_UPDATE_SUCCESS_TOAST
        )
      ).toBeVisible();
      expect(
        await readCategoryDeposit(categoryName)
      ).toEqual({
        ...E2E_DEPOSIT_BOTH,
        depositUsd: E2E_DEPOSIT_STORED.CHANGED_USD,
      });
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});
