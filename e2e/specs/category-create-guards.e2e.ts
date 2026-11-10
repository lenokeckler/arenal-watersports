import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE } from "@/app/features/administration/category-catalog/constants/CategoryTrackingMode.constants";
import { resolveGroupConflictErrorMessage } from "@/app/features/administration/category-catalog/utils/resolveGroupConflictErrorMessage";
import { createCategoryCreateFormPage } from "../pages/CategoryCreateForm.page";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { removeDeletableCategory } from "../support/categoryFixtures";
import {
  E2E_CATEGORY_GROUP_LABEL,
  resolveCreatedCategoryName,
} from "../constants/E2eCategoryFixtures.constants";

test.describe("Category create guards", () => {
  test.beforeEach(async ({ page }) => {
    await logInAsAdmin(page);
  });

  test("shows a group conflict error and does not create the category", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCreatedCategoryName(
      testInfo.project.name,
      "group-conflict"
    );
    const categoryCreateFormPage =
      createCategoryCreateFormPage(page);
    const categoryListPage = createCategoryListPage(page);

    try {
      await categoryCreateFormPage.goTo();
      await categoryCreateFormPage.fillName(categoryName);
      await categoryCreateFormPage.selectTrackingMode(
        CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_QUANTITY_LABEL
      );
      await categoryCreateFormPage.fillGroupName(
        E2E_CATEGORY_GROUP_LABEL
      );
      await categoryCreateFormPage.submit();

      await expect(
        categoryCreateFormPage.getGroupNameError()
      ).toHaveText(
        resolveGroupConflictErrorMessage(
          CATEGORY_TRACKING_MODE.BY_UNIT,
          CATEGORY_TRACKING_MODE.BY_QUANTITY
        )
      );
      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.CATEGORIES_NEW
      );

      await categoryListPage.goToCategory(categoryName);

      await expect(
        categoryListPage.getCategoryCard(categoryName)
      ).toHaveCount(0);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("treats a group name that only differs by case as the same group", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCreatedCategoryName(
      testInfo.project.name,
      "group-conflict-case-insensitive"
    );
    const categoryCreateFormPage =
      createCategoryCreateFormPage(page);
    const categoryListPage = createCategoryListPage(page);

    try {
      await categoryCreateFormPage.goTo();
      await categoryCreateFormPage.fillName(categoryName);
      await categoryCreateFormPage.selectTrackingMode(
        CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_QUANTITY_LABEL
      );
      await categoryCreateFormPage.fillGroupName(
        E2E_CATEGORY_GROUP_LABEL.toLowerCase()
      );
      await categoryCreateFormPage.submit();

      await expect(
        categoryCreateFormPage.getGroupNameError()
      ).toHaveText(
        resolveGroupConflictErrorMessage(
          CATEGORY_TRACKING_MODE.BY_UNIT,
          CATEGORY_TRACKING_MODE.BY_QUANTITY
        )
      );
      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.CATEGORIES_NEW
      );

      await categoryListPage.goToCategory(categoryName);

      await expect(
        categoryListPage.getCategoryCard(categoryName)
      ).toHaveCount(0);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("Cancelar navigates back to the list without creating anything", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCreatedCategoryName(
      testInfo.project.name,
      "cancel"
    );
    const categoryCreateFormPage =
      createCategoryCreateFormPage(page);

    await categoryCreateFormPage.goTo();
    await categoryCreateFormPage.fillName(categoryName);
    await categoryCreateFormPage.cancel();

    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });

  test("the CTA on the list screen navigates to the create form", async ({
    page,
  }) => {
    const categoryListPage = createCategoryListPage(page);
    const categoryCreateFormPage =
      createCategoryCreateFormPage(page);

    await categoryListPage.goTo();
    await categoryListPage.clickCreateLink();

    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.CATEGORIES_NEW
    );
    await expect(
      categoryCreateFormPage.getHeading()
    ).toBeVisible();
  });
});
