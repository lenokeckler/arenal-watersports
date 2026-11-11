import { expect, test } from "@playwright/test";
import {
  E2E_CATEGORY_WITH_GROUP_NAME,
  E2E_CATEGORY_WITH_RECORDS_NAME,
} from "../constants/E2eCategoryFixtures.constants";
import { createCategoryCardLayoutPage } from "../pages/CategoryCardLayout.page";
import { logInAsAdmin } from "../support/logInAsAdmin";

test.describe("Category card layout", () => {
  test("keeps every action inside its card at the width of the project", async ({
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
      await categoryListPage.openCategoryOptions(
        categoryName
      );
      expect(
        await categoryListPage.hasActionOutsideCard(
          categoryName
        )
      ).toBe(false);
    }
  });
});
