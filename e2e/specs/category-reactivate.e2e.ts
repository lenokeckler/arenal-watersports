import { expect, test } from "@playwright/test";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "@/app/features/administration/category-catalog/constants/CategoryConfigureSaveCopy.constants";
import { resolveReactivateCategoryName } from "../constants/E2eCategoryFixtures.constants";
import { createCategoryConfigurePage } from "../pages/CategoryConfigure.page";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { findCategoryId } from "../support/categoryFixtures";
import {
  removeCategoryWithRecords,
  seedCategoryWithRecords,
} from "../support/categoryRecordsFixtures";
import { logInAsAdmin } from "../support/logInAsAdmin";

const { SAVE, SAVED } = CATEGORY_CONFIGURE_SAVE_COPY;

test.describe("Category reactivation", () => {
  test("marks a category inactive and reactivates it from the Categor�a activa switch", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveReactivateCategoryName(
      testInfo.project.name
    );
    await seedCategoryWithRecords(categoryName);
    const categoryListPage = createCategoryListPage(page);
    const configurePage = createCategoryConfigurePage(page);

    try {
      await logInAsAdmin(page);
      await configurePage.goTo(
        await findCategoryId(categoryName)
      );
      await configurePage.getActiveSwitch().click();
      await configurePage.getButton(SAVE).click();
      await expect(
        configurePage.getStatusMessage(SAVED)
      ).toBeVisible();

      await categoryListPage.goToCategory(categoryName);
      await expect(
        categoryListPage.getCategoryInactiveChip(
          categoryName
        )
      ).toBeVisible();

      await categoryListPage.clickCategoryCard(
        categoryName
      );
      await expect(
        configurePage.getHeading(categoryName)
      ).toBeVisible();
      await configurePage.getActiveSwitch().click();
      await configurePage.getButton(SAVE).click();
      await expect(
        configurePage.getStatusMessage(SAVED)
      ).toBeVisible();

      await categoryListPage.goToCategory(categoryName);
      await expect(
        categoryListPage.getCategoryCard(categoryName)
      ).toBeVisible();
      await expect(
        categoryListPage.getCategoryInactiveChip(
          categoryName
        )
      ).toHaveCount(0);
    } finally {
      await removeCategoryWithRecords(categoryName);
    }
  });
});
