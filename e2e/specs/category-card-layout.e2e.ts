import { expect, test } from "@playwright/test";
import { E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX } from "../constants/E2eOneHandedUse.constants";
import {
  E2E_CATEGORY_WITH_GROUP_NAME,
  E2E_CATEGORY_WITH_RECORDS_NAME,
} from "../constants/E2eCategoryFixtures.constants";
import { createCategoryCardLayoutPage } from "../pages/CategoryCardLayout.page";
import { logInAsAdmin } from "../support/logInAsAdmin";

test.describe("Category card layout", () => {
  test("keeps every card as a tap target with its content inside at the width of the project", async ({
    page,
  }) => {
    const categoryListPage =
      createCategoryCardLayoutPage(page);

    await logInAsAdmin(page);

    for (const categoryName of [
      E2E_CATEGORY_WITH_RECORDS_NAME,
      E2E_CATEGORY_WITH_GROUP_NAME,
    ]) {
      await categoryListPage.goToCategory(categoryName);

      expect(
        await categoryListPage.getCardHeight(categoryName)
      ).toBeGreaterThanOrEqual(
        E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX
      );
      expect(
        await categoryListPage.hasContentOutsideCard(
          categoryName
        )
      ).toBe(false);
    }
  });
});
