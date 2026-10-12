import { expect, test } from "@playwright/test";
import { STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/components/category-catalog/constants/CategoryCatalogCopy.constants";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  E2E_CATEGORY_GROUP_LABEL,
  E2E_CATEGORY_WITHOUT_GROUP_NAME,
  E2E_CATEGORY_WITH_GROUP_NAME,
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
});
