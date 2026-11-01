import { PATHS } from "@/app/constants";
import { expect, test } from "@playwright/test";
import { CATEGORY_ALERT_TYPE } from "@/app/features/administration/category-catalog/constants/CategoryAlertType.constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { createCategoryAlertsFormPage } from "../pages/CategoryAlertsForm.page";
import { createCategoryCreateFormPage } from "../pages/CategoryCreateForm.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { readCategoryAlerts } from "../support/categoryAlertFixtures";
import { removeDeletableCategory } from "../support/categoryFixtures";
import {
  E2E_ALERT_INPUT,
  E2E_ALERT_NO_INPUT,
  E2E_ALERT_QUANTITY,
} from "../constants/E2eCategoryAlerts.constants";
import { E2E_CATEGORY_ALERTS_URL_PATTERN } from "../constants/E2eCategoryCreate.constants";
import { resolveCreatedCategoryName } from "../constants/E2eCategoryFixtures.constants";

test.describe("Category alerts after creating a category", () => {
  test("a new category lands on its alerts screen and a threshold can be saved there", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCreatedCategoryName(
      testInfo.project.name,
      "alerts"
    );
    const categoryCreateFormPage =
      createCategoryCreateFormPage(page);
    const alertsFormPage =
      createCategoryAlertsFormPage(page);

    try {
      await logInAsAdmin(page);
      await categoryCreateFormPage.goTo();
      await categoryCreateFormPage.fillName(categoryName);
      await categoryCreateFormPage.selectTrackingMode(
        CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_QUANTITY_LABEL
      );
      await categoryCreateFormPage.submit();

      await expect(page).toHaveURL(
        E2E_CATEGORY_ALERTS_URL_PATTERN
      );
      await expect(
        alertsFormPage.getTypeSelect()
      ).toBeVisible();

      await alertsFormPage.selectType(
        CATEGORY_ALERT_TYPE.QUANTITY
      );
      await alertsFormPage.fillThresholds({
        ...E2E_ALERT_NO_INPUT,
        minQuantityText: E2E_ALERT_INPUT.MIN_QUANTITY,
      });
      await alertsFormPage.submit();

      await expect(
        alertsFormPage.getToastMessage(
          CATEGORY_CATALOG_COPY.ALERT_UPDATE_SUCCESS_TOAST
        )
      ).toBeVisible();
      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.CATEGORIES
      );
      expect(
        await readCategoryAlerts(categoryName)
      ).toEqual(E2E_ALERT_QUANTITY);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});
