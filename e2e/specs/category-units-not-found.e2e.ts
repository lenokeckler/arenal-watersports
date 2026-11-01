import { expect } from "@playwright/test";
import { test } from "../support/categoryUnitsTest";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { E2E_UNKNOWN_CATEGORY_ID } from "../constants/E2eCategoryBehavior.constants";
import { E2E_BY_QUANTITY_CATEGORY } from "../constants/E2eCategoryUnits.constants";

test.describe("Category units not found", () => {
  test("an unknown category id shows the not-found page", async ({
    page,
    listPage,
  }) => {
    await logInAsAdmin(page);

    await listPage.goTo(E2E_UNKNOWN_CATEGORY_ID);

    await expect(
      listPage.getNotFoundMessage()
    ).toBeVisible();
  });

  test("an unknown unit id shows the not-found page", async ({
    formPage,
    seedUnitCategory,
  }) => {
    const { categoryId } =
      await seedUnitCategory("unknown-unit");

    await formPage.goTo(
      categoryId,
      E2E_UNKNOWN_CATEGORY_ID
    );

    await expect(
      formPage.getNotFoundMessage()
    ).toBeVisible();
  });

  test("a by-quantity category has no unit list", async ({
    listPage,
    seedUnitCategory,
  }) => {
    const { categoryId } = await seedUnitCategory(
      "by-quantity",
      E2E_BY_QUANTITY_CATEGORY
    );

    await listPage.goTo(categoryId);

    await expect(
      listPage.getNotFoundMessage()
    ).toBeVisible();
  });
});
