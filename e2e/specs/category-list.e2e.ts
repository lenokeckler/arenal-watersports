import { expect, test } from "@playwright/test";
import { STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { resolveCategoryConfigurePath } from "@/app/features/administration/category-catalog/utils/resolveCategoryConfigurePath";
import { createCategoryConfigurePage } from "../pages/CategoryConfigure.page";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  findCategoryId,
  removeDeletableCategory,
  seedDeletableCategory,
} from "../support/categoryFixtures";
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

  test("shows Editar as text on a card, with no button inside it", async ({
    page,
  }) => {
    const categoryListPage = createCategoryListPage(page);

    await categoryListPage.goToCategory(
      E2E_CATEGORY_WITH_RECORDS_NAME
    );

    await expect(
      categoryListPage.getCategoryEditLabel(
        E2E_CATEGORY_WITH_RECORDS_NAME
      )
    ).toBeVisible();
    await expect(
      categoryListPage.getCategoryButtons(
        E2E_CATEGORY_WITH_RECORDS_NAME
      )
    ).toHaveCount(E2E_COUNT.NONE);
  });

  test("shows the group meta for a category that belongs to a group", async ({
    page,
  }) => {
    const categoryListPage = createCategoryListPage(page);

    await categoryListPage.goToCategory(
      E2E_CATEGORY_WITH_GROUP_NAME
    );

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

    await categoryListPage.goToCategory(
      E2E_CATEGORY_WITHOUT_GROUP_NAME
    );

    await expect(
      categoryListPage.getCategoryGroupMeta(
        E2E_CATEGORY_WITHOUT_GROUP_NAME
      )
    ).toHaveCount(0);
  });

  test("opens the Configurar screen of a category when its card is tapped", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveDeletableCategoryName(
      testInfo.project.name,
      "open"
    );
    await seedDeletableCategory(categoryName);
    const categoryListPage = createCategoryListPage(page);
    const configurePage = createCategoryConfigurePage(page);

    try {
      await logInAsAdmin(page);
      await categoryListPage.goToCategory(categoryName);
      await categoryListPage.clickCategoryCard(
        categoryName
      );

      await expect(
        configurePage.getHeading(categoryName)
      ).toBeVisible();
      await expect(page).toHaveURL(
        resolveCategoryConfigurePath(
          await findCategoryId(categoryName)
        )
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});
