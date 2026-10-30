import { expect, test } from "@playwright/test";
import { STRING } from "@/app/constants";
import { CATEGORY_TRACKING_MODE } from "@/app/features/administration/category-catalog/constants/CategoryTrackingMode.constants";
import { USAGE_METRIC } from "@/app/features/administration/category-catalog/constants/UsageMetric.constants";
import { createCategoryBehaviorFormPage } from "../pages/CategoryBehaviorForm.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  findCategoryId,
  removeDeletableCategory,
  seedCategoryWithBehavior,
} from "../support/categoryFixtures";
import { resolveCategoryBehaviorFixtureName } from "../constants/E2eCategoryBehavior.constants";

test.describe("Category behavior controls", () => {
  test("unticking the motor disables and clears the usage metric", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryBehaviorFixtureName(
      testInfo.project.name,
      "motor"
    );
    await seedCategoryWithBehavior(categoryName, {
      hasMotor: true,
      usageMetric: USAGE_METRIC.ENGINE_HOURS,
    });
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage(page);

    try {
      await logInAsAdmin(page);
      await categoryBehaviorFormPage.goTo(
        await findCategoryId(categoryName)
      );

      await expect(
        categoryBehaviorFormPage.getUsageMetricSelect()
      ).toBeEnabled();
      await expect(
        categoryBehaviorFormPage.getUsageMetricSelect()
      ).toHaveValue(USAGE_METRIC.ENGINE_HOURS);

      await categoryBehaviorFormPage.uncheckHasMotor();

      await expect(
        categoryBehaviorFormPage.getUsageMetricSelect()
      ).toBeDisabled();
      await expect(
        categoryBehaviorFormPage.getUsageMetricSelect()
      ).toHaveValue(STRING.Empty);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("a category counted by quantity cannot enable condition photos", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryBehaviorFixtureName(
      testInfo.project.name,
      "photos"
    );
    await seedCategoryWithBehavior(categoryName, {
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
    });
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage(page);

    try {
      await logInAsAdmin(page);
      await categoryBehaviorFormPage.goTo(
        await findCategoryId(categoryName)
      );

      await expect(
        categoryBehaviorFormPage.getHasConditionPhotosCheckbox()
      ).toBeDisabled();
      await expect(
        categoryBehaviorFormPage.getHasConditionPhotosCheckbox()
      ).not.toBeChecked();
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("interchangeable units is locked on for quantity categories and editable for unit categories", async ({
    page,
  }, testInfo) => {
    const quantityCategoryName =
      resolveCategoryBehaviorFixtureName(
        testInfo.project.name,
        "interchangeable-quantity"
      );
    const unitCategoryName =
      resolveCategoryBehaviorFixtureName(
        testInfo.project.name,
        "interchangeable-unit"
      );
    await seedCategoryWithBehavior(quantityCategoryName, {
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
    });
    await seedCategoryWithBehavior(unitCategoryName);
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage(page);

    try {
      await logInAsAdmin(page);
      await categoryBehaviorFormPage.goTo(
        await findCategoryId(quantityCategoryName)
      );

      await expect(
        categoryBehaviorFormPage.getUnitsAreInterchangeableCheckbox()
      ).toBeChecked();
      await expect(
        categoryBehaviorFormPage.getUnitsAreInterchangeableCheckbox()
      ).toBeDisabled();

      await categoryBehaviorFormPage.goTo(
        await findCategoryId(unitCategoryName)
      );

      await expect(
        categoryBehaviorFormPage.getUnitsAreInterchangeableCheckbox()
      ).toBeEnabled();
    } finally {
      await removeDeletableCategory(quantityCategoryName);
      await removeDeletableCategory(unitCategoryName);
    }
  });
});
