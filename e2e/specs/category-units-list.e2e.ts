import { expect } from "@playwright/test";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { test } from "../support/categoryUnitsTest";
import { E2E_BY_QUANTITY_CATEGORY } from "../constants/E2eCategoryUnits.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";

test.describe("Category units list", () => {
  test("only a by-unit card links to its units, and the link opens the empty list", async ({
    page,
    listPage,
    seedUnitCategory,
  }) => {
    const unitCategory =
      await seedUnitCategory("link-unit");
    const quantityCategory = await seedUnitCategory(
      "link-quantity",
      E2E_BY_QUANTITY_CATEGORY
    );
    const categoryListPage = createCategoryListPage(page);

    await categoryListPage.goTo();

    await expect(
      listPage.getUnitsLink(
        categoryListPage.getCategoryCard(
          quantityCategory.categoryName
        )
      )
    ).toHaveCount(E2E_COUNT.NONE);

    await listPage.clickUnitsLink(
      categoryListPage.getCategoryCard(
        unitCategory.categoryName
      )
    );

    await expect(
      listPage.getHeading(unitCategory.categoryName)
    ).toBeVisible();
    await expect(
      listPage.getEmptyStateTitle()
    ).toBeVisible();
    await expect(listPage.getAddLink()).toBeVisible();
  });
});
