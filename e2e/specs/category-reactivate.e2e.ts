import { expect, test } from "@playwright/test";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { resolveReactivateCategoryName } from "../constants/E2eCategoryFixtures.constants";
import { createCategoryReactivatePage } from "../pages/CategoryReactivate.page";
import {
  removeCategoryWithRecords,
  seedCategoryWithRecords,
} from "../support/categoryRecordsFixtures";
import { logInAsAdmin } from "../support/logInAsAdmin";

test.describe("Category reactivation", () => {
  test("reactivates an inactive category and gives its actions back", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveReactivateCategoryName(
      testInfo.project.name
    );
    await seedCategoryWithRecords(categoryName);
    const categoryListPage =
      createCategoryReactivatePage(page);

    try {
      await logInAsAdmin(page);
      await categoryListPage.goTo();
      await categoryListPage.clickCategoryMarkInactiveButton(
        categoryName
      );
      await expect(
        categoryListPage.getExactInactivePill(categoryName)
      ).toBeVisible();
      await expect(
        categoryListPage.getReactivateButton(categoryName)
      ).toBeVisible();

      await categoryListPage.clickReactivateButton(
        categoryName
      );

      await expect(
        categoryListPage.getToastMessage(
          CATEGORY_CATALOG_COPY.REACTIVATE_SUCCESS_TOAST
        )
      ).toBeVisible();
      await expect(
        categoryListPage.getExactInactivePill(categoryName)
      ).toHaveCount(0);
      await expect(
        categoryListPage.getReactivateButton(categoryName)
      ).toHaveCount(0);
      await expect(
        categoryListPage.getCategoryMarkInactiveButton(
          categoryName
        )
      ).toBeVisible();
    } finally {
      await removeCategoryWithRecords(categoryName);
    }
  });
});
