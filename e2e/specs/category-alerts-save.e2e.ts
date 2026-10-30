import { E2E_ALERT_SAVE_CASES } from "../constants/E2eCategoryAlertCases.constants";
import { expect, test } from "@playwright/test";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { createCategoryAlertsFormPage } from "../pages/CategoryAlertsForm.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  readCategoryAlerts,
  seedCategoryWithAlerts,
} from "../support/categoryAlertFixtures";
import {
  findCategoryId,
  removeDeletableCategory,
} from "../support/categoryFixtures";
import { resolveCategoryAlertsFixtureName } from "../constants/E2eCategoryAlerts.constants";

test.describe("Category alerts save", () => {
  for (const saveCase of E2E_ALERT_SAVE_CASES) {
    test(`saves the thresholds and keeps them after reload (${saveCase.scenario})`, async ({
      page,
    }, testInfo) => {
      const categoryName = resolveCategoryAlertsFixtureName(
        testInfo.project.name,
        saveCase.scenario
      );
      await seedCategoryWithAlerts(
        categoryName,
        saveCase.seeded
      );
      const alertsFormPage =
        createCategoryAlertsFormPage(page);

      try {
        await logInAsAdmin(page);
        await alertsFormPage.goTo(
          await findCategoryId(categoryName)
        );
        await alertsFormPage.selectType(saveCase.alertType);
        await alertsFormPage.fillThresholds(saveCase.input);
        await alertsFormPage.submit();

        await expect(
          alertsFormPage.getToastMessage(
            CATEGORY_CATALOG_COPY.ALERT_UPDATE_SUCCESS_TOAST
          )
        ).toBeVisible();
        expect(
          await readCategoryAlerts(categoryName)
        ).toEqual(saveCase.expected);

        await alertsFormPage.reload();

        await expect(
          alertsFormPage.getTypeSelect()
        ).toHaveValue(saveCase.alertType);
      } finally {
        await removeDeletableCategory(categoryName);
      }
    });
  }
});
