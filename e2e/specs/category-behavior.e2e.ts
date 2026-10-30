import { expect, test } from "@playwright/test";
import { CATEGORY_CATALOG_COPY } from "@/app/components/category-catalog/constants/CategoryCatalogCopy.constants";
import { createCategoryBehaviorFormPage } from "../pages/CategoryBehaviorForm.page";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  findCategoryId,
  removeDeletableCategory,
  seedCategoryWithBehavior,
} from "../support/categoryFixtures";
import { resolveCategoryBehaviorFixtureName } from "../constants/E2eCategoryBehavior.constants";

test.describe("Category behavior rules", () => {
  test("opens from the list link and shows the tracking mode as read-only text", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryBehaviorFixtureName(
      testInfo.project.name,
      "open"
    );
    await seedCategoryWithBehavior(categoryName);
    const categoryListPage = createCategoryListPage(page);
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage(page);

    try {
      await logInAsAdmin(page);
      await categoryListPage.goTo();
      await categoryListPage.clickCategoryBehaviorLink(
        categoryName
      );

      await expect(
        categoryBehaviorFormPage.getHeading()
      ).toBeVisible();
      await expect(
        categoryBehaviorFormPage.getTrackingModeLine(
          CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_UNIT_LABEL
        )
      ).toBeVisible();
      await expect(
        categoryBehaviorFormPage.getTrackingModeControl()
      ).toHaveCount(0);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("a reservable category without a duration shows the error and does not save", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryBehaviorFixtureName(
      testInfo.project.name,
      "duration"
    );
    await seedCategoryWithBehavior(categoryName);
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage(page);

    try {
      await logInAsAdmin(page);
      await categoryBehaviorFormPage.goTo(
        await findCategoryId(categoryName)
      );
      await categoryBehaviorFormPage.checkIsReservable();
      await categoryBehaviorFormPage.submit();

      await expect(
        categoryBehaviorFormPage.getDurationError()
      ).toBeVisible();
      await expect(
        categoryBehaviorFormPage.getToastMessage(
          CATEGORY_CATALOG_COPY.BEHAVIOR_UPDATE_SUCCESS_TOAST
        )
      ).toHaveCount(0);

      await categoryBehaviorFormPage.reload();

      await expect(
        categoryBehaviorFormPage.getIsReservableCheckbox()
      ).not.toBeChecked();
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});
