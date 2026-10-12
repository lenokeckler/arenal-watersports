import { expect, test } from "@playwright/test";
import { STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/components/category-catalog/constants/CategoryCatalogCopy.constants";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  removeCategoryWithRecords,
  removeDeletableCategory,
  seedCategoryWithRecords,
  seedDeletableCategory,
} from "../support/categoryFixtures";
import {
  E2E_CATEGORY_GROUP_LABEL,
  E2E_CATEGORY_WITHOUT_GROUP_NAME,
  E2E_CATEGORY_WITH_GROUP_NAME,
  E2E_CATEGORY_WITH_RECORDS_NAME,
  resolveDeletableCategoryName,
  resolveMarkInactiveCategoryName,
} from "../constants/E2eCategoryFixtures.constants";

const buildGroupMetaText = (groupName: string): string =>
  [
    CATEGORY_CATALOG_COPY.GROUP_PREFIX_LABEL,
    STRING.MIDDLE_DOT,
    groupName,
  ].join(STRING.SPACE);

test.describe("Category list", () => {
  test.beforeEach(async ({ page }) => {
    await logInAsAdmin(page);
  });

  test("shows the page heading", async ({ page }) => {
    const categoryListPage = createCategoryListPage(page);

    await categoryListPage.goTo();

    await expect(categoryListPage.getHeading()).toHaveText(
      CATEGORY_CATALOG_COPY.LIST_TITLE
    );
  });

  test("shows Marcar inactiva, and not Eliminar categoría, for a category with existing records", async ({
    page,
  }) => {
    const categoryListPage = createCategoryListPage(page);

    await categoryListPage.goTo();

    await expect(
      categoryListPage.getCategoryMarkInactiveButton(
        E2E_CATEGORY_WITH_RECORDS_NAME
      )
    ).toBeVisible();
    await expect(
      categoryListPage.getCategoryDeleteButton(
        E2E_CATEGORY_WITH_RECORDS_NAME
      )
    ).toHaveCount(0);
  });

  test("shows Eliminar categoría for a category with no existing records", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveDeletableCategoryName(
      testInfo.project.name,
      "visibility"
    );
    await seedDeletableCategory(categoryName);
    const categoryListPage = createCategoryListPage(page);

    try {
      await categoryListPage.goTo();

      await expect(
        categoryListPage.getCategoryDeleteButton(
          categoryName
        )
      ).toBeVisible();
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("shows the group meta for a category that belongs to a group", async ({
    page,
  }) => {
    const categoryListPage = createCategoryListPage(page);

    await categoryListPage.goTo();

    await expect(
      categoryListPage.getCategoryCard(
        E2E_CATEGORY_WITH_GROUP_NAME
      )
    ).toContainText(
      buildGroupMetaText(E2E_CATEGORY_GROUP_LABEL)
    );
  });

  test("shows no group meta for a category without a group", async ({
    page,
  }) => {
    const categoryListPage = createCategoryListPage(page);

    await categoryListPage.goTo();

    await expect(
      categoryListPage.getCategoryGroupMeta(
        E2E_CATEGORY_WITHOUT_GROUP_NAME
      )
    ).toHaveCount(0);
  });

  test("marks a category with records inactive and removes its actions from the card", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveMarkInactiveCategoryName(
      testInfo.project.name
    );
    await seedCategoryWithRecords(categoryName);
    const categoryListPage = createCategoryListPage(page);

    try {
      await categoryListPage.goTo();
      await categoryListPage.clickCategoryMarkInactiveButton(
        categoryName
      );

      await expect(
        categoryListPage.getToastMessage(
          CATEGORY_CATALOG_COPY.MARK_INACTIVE_SUCCESS_TOAST
        )
      ).toBeVisible();
      await expect(
        categoryListPage.getCategoryInactivePill(
          categoryName
        )
      ).toBeVisible();
      await expect(
        categoryListPage.getCategoryMarkInactiveButton(
          categoryName
        )
      ).toHaveCount(0);
    } finally {
      await removeCategoryWithRecords(categoryName);
    }
  });

  test("cancels a delete confirmation without removing the category", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveDeletableCategoryName(
      testInfo.project.name,
      "cancel"
    );
    await seedDeletableCategory(categoryName);
    const categoryListPage = createCategoryListPage(page);

    try {
      await categoryListPage.goTo();
      await categoryListPage.clickCategoryDeleteButton(
        categoryName
      );

      await expect(
        categoryListPage.getCategoryConfirmDeleteMessage(
          categoryName
        )
      ).toBeVisible();

      await categoryListPage.clickCategoryCancelButton(
        categoryName
      );

      await expect(
        categoryListPage.getCategoryDeleteButton(
          categoryName
        )
      ).toBeVisible();
      await expect(
        categoryListPage.getCategoryConfirmDeleteMessage(
          categoryName
        )
      ).toHaveCount(0);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("deletes a category with no records after confirming", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveDeletableCategoryName(
      testInfo.project.name,
      "confirm"
    );
    await seedDeletableCategory(categoryName);
    const categoryListPage = createCategoryListPage(page);

    try {
      await categoryListPage.goTo();
      await categoryListPage.clickCategoryDeleteButton(
        categoryName
      );
      await categoryListPage.clickCategoryConfirmDeleteButton(
        categoryName
      );

      await expect(
        categoryListPage.getToastMessage(
          CATEGORY_CATALOG_COPY.DELETE_SUCCESS_TOAST
        )
      ).toBeVisible();
      await expect(
        categoryListPage.getCategoryCard(categoryName)
      ).toHaveCount(0);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});
