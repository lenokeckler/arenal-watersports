import { expect, test } from "@playwright/test";
import { STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/components/category-catalog/constants/CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE } from "@/app/components/category-catalog/constants/CategoryTrackingMode.constants";
import { USAGE_METRIC } from "@/app/components/category-catalog/constants/UsageMetric.constants";
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
