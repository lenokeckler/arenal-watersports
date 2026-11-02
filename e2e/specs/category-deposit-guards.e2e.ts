import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { CATEGORY_DEPOSIT_ERROR_COPY } from "@/app/features/administration/category-catalog/constants/CategoryDepositErrorCopy.constants";
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
import { E2E_UNKNOWN_CATEGORY_ID } from "../constants/E2eCategoryBehavior.constants";
import {
  E2E_DEPOSIT_INVALID_INPUT_CASES,
  E2E_DEPOSIT_NONE,
  resolveCategoryDepositFixtureName,
} from "../constants/E2eCategoryDeposit.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";

test.describe("Category deposit guards", () => {
  for (const invalidCase of E2E_DEPOSIT_INVALID_INPUT_CASES) {
    test(`invalid input shows the error under its field and saves nothing (${invalidCase.scenario})`, async ({
      page,
    }, testInfo) => {
      const categoryName =
        resolveCategoryDepositFixtureName(
          testInfo.project.name,
          invalidCase.scenario
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
          invalidCase.currency,
          invalidCase.amountText
        );
        await depositFormPage.submit();

        await expect(
          depositFormPage.getAmountError(
            invalidCase.currency
          )
        ).toHaveText(
          CATEGORY_DEPOSIT_ERROR_COPY[invalidCase.currency][
            invalidCase.issue
          ]
        );
        expect(
          await readCategoryDeposit(categoryName)
        ).toEqual(E2E_DEPOSIT_NONE);
      } finally {
        await removeDeletableCategory(categoryName);
      }
    });
  }

  test("Cancelar returns to the category list", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryDepositFixtureName(
      testInfo.project.name,
      "cancel"
    );
    await seedCategoryWithDeposit(categoryName);
    const depositFormPage =
      createCategoryDepositFormPage(page);

    try {
      await logInAsAdmin(page);
      await depositFormPage.goTo(
        await findCategoryId(categoryName)
      );
      await depositFormPage.cancel();

      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.CATEGORIES
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("an unknown category id shows the not-found page", async ({
    page,
  }) => {
    const depositFormPage =
      createCategoryDepositFormPage(page);

    await logInAsAdmin(page);
    await depositFormPage.goTo(E2E_UNKNOWN_CATEGORY_ID);

    await expect(
      depositFormPage.getNotFoundMessage()
    ).toBeVisible();
    await expect(depositFormPage.getHeading()).toHaveCount(
      E2E_COUNT.NONE
    );
  });

  test("sends a signed-out visitor to the login", async ({
    page,
  }) => {
    const depositFormPage =
      createCategoryDepositFormPage(page);

    await depositFormPage.goTo(E2E_UNKNOWN_CATEGORY_ID);

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
  });
});
