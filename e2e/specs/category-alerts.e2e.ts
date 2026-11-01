import { expect, test } from "@playwright/test";
import { CATEGORY_ALERT_TYPE } from "@/app/features/administration/category-catalog/constants/CategoryAlertType.constants";
import { createCategoryAlertsFormPage } from "../pages/CategoryAlertsForm.page";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { seedCategoryWithAlerts } from "../support/categoryAlertFixtures";
import {
  findCategoryId,
  removeDeletableCategory,
} from "../support/categoryFixtures";
import { resolveCategoryAlertsFixtureName } from "../constants/E2eCategoryAlerts.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";

test.describe("Category alerts", () => {
  test("opens from the card link with no alert type and no number fields", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryAlertsFixtureName(
      testInfo.project.name,
      "open"
    );
    await seedCategoryWithAlerts(categoryName);
    const categoryListPage = createCategoryListPage(page);
    const alertsFormPage =
      createCategoryAlertsFormPage(page);

    try {
      await logInAsAdmin(page);
      await categoryListPage.goTo();
      await alertsFormPage.clickAlertsLink(
        categoryListPage.getCategoryCard(categoryName)
      );

      await expect(
        alertsFormPage.getHeading()
      ).toBeVisible();
      await expect(
        alertsFormPage.getTypeSelect()
      ).toHaveValue(CATEGORY_ALERT_TYPE.NONE);
      await expect(
        alertsFormPage.getMinQuantityInput()
      ).toHaveCount(E2E_COUNT.NONE);
      await expect(
        alertsFormPage.getExpiryDaysInput()
      ).toHaveCount(E2E_COUNT.NONE);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("choosing by quantity shows only the minimum quantity field", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryAlertsFixtureName(
      testInfo.project.name,
      "fields"
    );
    await seedCategoryWithAlerts(categoryName);
    const alertsFormPage =
      createCategoryAlertsFormPage(page);

    try {
      await logInAsAdmin(page);
      await alertsFormPage.goTo(
        await findCategoryId(categoryName)
      );
      await alertsFormPage.selectType(
        CATEGORY_ALERT_TYPE.QUANTITY
      );

      await expect(
        alertsFormPage.getMinQuantityInput()
      ).toBeVisible();
      await expect(
        alertsFormPage.getExpiryDaysInput()
      ).toHaveCount(E2E_COUNT.NONE);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});
