import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/components/category-catalog/constants/CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE } from "@/app/components/category-catalog/constants/CategoryTrackingMode.constants";
import { resolveGroupConflictErrorMessage } from "@/app/components/category-catalog/utils/resolveGroupConflictErrorMessage";
import { createCategoryCreateFormPage } from "../pages/CategoryCreateForm.page";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { removeDeletableCategory } from "../support/categoryFixtures";
import {
  E2E_CATEGORY_GROUP_LABEL,
  resolveCreatedCategoryName,
} from "../constants/E2eCategoryFixtures.constants";

test.describe("Category create", () => {
  test.beforeEach(async ({ page }) => {
    await logInAsAdmin(page);
  });

  test("shows the page heading and all three fields", async ({
    page,
  }) => {
    const categoryCreateFormPage =
      createCategoryCreateFormPage(page);

    await categoryCreateFormPage.goTo();

    await expect(
      categoryCreateFormPage.getHeading()
    ).toHaveText(CATEGORY_CATALOG_COPY.CREATE_FORM_TITLE);
    await expect(
      categoryCreateFormPage.getNameInput()
    ).toBeVisible();
    await expect(
      categoryCreateFormPage.getTrackingModeSelect()
    ).toBeVisible();
    await expect(
      categoryCreateFormPage.getGroupNameInput()
    ).toBeVisible();
  });

  test("shows required-field errors and does not navigate away when submitting empty", async ({
    page,
  }) => {
    const categoryCreateFormPage =
      createCategoryCreateFormPage(page);

    await categoryCreateFormPage.goTo();
    await categoryCreateFormPage.submit();

    await expect(
      categoryCreateFormPage.getNameError()
    ).toBeVisible();
    await expect(
      categoryCreateFormPage.getTrackingModeError()
    ).toBeVisible();
    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.CATEGORIES_NEW
    );
  });

  test("creates a category with no group and shows it in the list", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCreatedCategoryName(
      testInfo.project.name,
      "no-group"
    );
    const categoryCreateFormPage =
      createCategoryCreateFormPage(page);
    const categoryListPage = createCategoryListPage(page);

    try {
      await categoryCreateFormPage.goTo();
      await categoryCreateFormPage.fillName(categoryName);
      await categoryCreateFormPage.selectTrackingMode(
        CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_UNIT_LABEL
      );
      await categoryCreateFormPage.submit();

      await expect(
        categoryCreateFormPage.getToastMessage(
          CATEGORY_CATALOG_COPY.CREATE_SUCCESS_TOAST
        )
      ).toBeVisible();
      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.CATEGORIES
      );
      await expect(
        categoryListPage.getCategoryCard(categoryName)
      ).toBeVisible();
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("creates a category with a non-conflicting group", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCreatedCategoryName(
      testInfo.project.name,
      "fresh-group"
    );
    const freshGroupName = `E2E Fixture — Grupo nuevo (${testInfo.project.name})`;
    const categoryCreateFormPage =
      createCategoryCreateFormPage(page);

    try {
      await categoryCreateFormPage.goTo();
      await categoryCreateFormPage.fillName(categoryName);
      await categoryCreateFormPage.selectTrackingMode(
        CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_QUANTITY_LABEL
      );
      await categoryCreateFormPage.fillGroupName(
        freshGroupName
      );
      await categoryCreateFormPage.submit();

      await expect(
        categoryCreateFormPage.getToastMessage(
          CATEGORY_CATALOG_COPY.CREATE_SUCCESS_TOAST
        )
      ).toBeVisible();
      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.CATEGORIES
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
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

      await categoryListPage.goTo();

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

      await categoryListPage.goTo();

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
