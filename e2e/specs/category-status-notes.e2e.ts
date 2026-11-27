import { expect, test } from "@playwright/test";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import {
  E2E_RESERVABLE_CATEGORY_DURATION_MINUTES,
  resolveStatusNoteCategoryName,
} from "../constants/E2eCategoryFixtures.constants";
import { createCategoryListPage } from "../pages/CategoryList.page";
import {
  removeDeletableCategory,
  seedCategoryWithBehavior,
} from "../support/categoryFixtures";
import { logInAsAdmin } from "../support/logInAsAdmin";

test.describe("Category card status notes", () => {
  test.beforeEach(async ({ page }) => {
    await logInAsAdmin(page);
  });

  test("tells that a category that cannot be reserved stays off the board", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveStatusNoteCategoryName(
      testInfo.project.name,
      "not-reservable"
    );
    await seedCategoryWithBehavior(categoryName);
    const categoryListPage = createCategoryListPage(page);

    try {
      await categoryListPage.goToCategory(categoryName);

      await expect(
        categoryListPage.getCategoryStatusNote(
          categoryName,
          CATEGORY_CATALOG_COPY.STATUS_NOTE_NOT_RESERVABLE
        )
      ).toBeVisible();
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("tells that a reservable category without an image uses the default one", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveStatusNoteCategoryName(
      testInfo.project.name,
      "no-image"
    );
    await seedCategoryWithBehavior(categoryName, {
      defaultDurationMinutes:
        E2E_RESERVABLE_CATEGORY_DURATION_MINUTES,
      isReservable: true,
    });
    const categoryListPage = createCategoryListPage(page);

    try {
      await categoryListPage.goToCategory(categoryName);

      await expect(
        categoryListPage.getCategoryStatusNote(
          categoryName,
          CATEGORY_CATALOG_COPY.STATUS_NOTE_NO_IMAGE
        )
      ).toBeVisible();
      await expect(
        categoryListPage.getCategoryStatusNote(
          categoryName,
          CATEGORY_CATALOG_COPY.STATUS_NOTE_NOT_RESERVABLE
        )
      ).toHaveCount(0);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});
