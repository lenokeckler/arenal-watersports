import { expect, test } from "@playwright/test";
import { PATHS, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/components/category-catalog/constants/CategoryCatalog.copy";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  removeDeletableCategory,
  seedDeletableCategory,
} from "../support/categoryFixtures";
import { E2E_BASE_URL } from "../constants/E2eRuntime.constants";
import {
  E2E_CATEGORY_GROUP_LABEL,
  E2E_CATEGORY_WITHOUT_GROUP_NAME,
  E2E_CATEGORY_WITH_GROUP_NAME,
  E2E_CATEGORY_WITH_RECORDS_NAME,
  resolveDeletableCategoryName,
} from "../constants/E2eCategoryFixtures.constants";

const buildGroupMetaText = (groupName: string): string =>
  [
    CATEGORY_CATALOG_COPY.GROUP_PREFIX_LABEL,
    STRING.MIDDLE_DOT,
    groupName,
  ].join(STRING.SPACE);

test.describe("Category list", () => {
  test.beforeEach(async ({ context }) => {
    await logInAsAdmin(context);
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
      testInfo.project.name
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

  test("navigates to the create-category route from the create CTA", async ({
    page,
  }) => {
    const categoryListPage = createCategoryListPage(page);

    await categoryListPage.goTo();
    await categoryListPage.getCreateCtaButton().click();

    await expect(page).toHaveURL(
      `${E2E_BASE_URL}${PATHS.ADMINISTRATION.CATEGORIES_NEW}`
    );
  });
});
