import { expect } from "@playwright/test";
import { test } from "../support/categoryUnitsTest";

test.describe("Category units list", () => {
  test("opens the empty list of a by-unit category with its add link", async ({
    listPage,
    seedUnitCategory,
  }) => {
    const unitCategory =
      await seedUnitCategory("link-unit");

    await listPage.goTo(unitCategory.categoryId);

    await expect(
      listPage.getHeading(unitCategory.categoryName)
    ).toBeVisible();
    await expect(
      listPage.getEmptyStateTitle()
    ).toBeVisible();
    await expect(listPage.getAddLink()).toBeVisible();
  });
});
