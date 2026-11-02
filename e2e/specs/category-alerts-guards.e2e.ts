import { E2E_ALERT_INVALID_INPUT_CASES } from "../constants/E2eCategoryAlertCases.constants";
import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { CATEGORY_ALERT_ERROR_COPY } from "@/app/features/administration/category-catalog/constants/CategoryAlertErrorCopy.constants";
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
import { E2E_UNKNOWN_CATEGORY_ID } from "../constants/E2eCategoryBehavior.constants";
import {
  E2E_ALERT_NONE,
  resolveCategoryAlertsFixtureName,
} from "../constants/E2eCategoryAlerts.constants";
import {
  E2E_COUNT,
  E2E_SIGNED_OUT_STORAGE_STATE,
} from "../constants/E2eRuntime.constants";

test.describe("Category alerts guards", () => {
  for (const invalidCase of E2E_ALERT_INVALID_INPUT_CASES) {
    test(`invalid input shows the error under its field and saves nothing (${invalidCase.scenario})`, async ({
      page,
    }, testInfo) => {
      const categoryName = resolveCategoryAlertsFixtureName(
        testInfo.project.name,
        invalidCase.scenario
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
          invalidCase.alertType
        );
        await alertsFormPage.fillThresholds(
          invalidCase.input
        );
        await alertsFormPage.submit();

        await expect(
          alertsFormPage.getFieldError(invalidCase.fieldId)
        ).toHaveText(
          CATEGORY_ALERT_ERROR_COPY[invalidCase.errorKey][
            invalidCase.issue
          ]
        );
        expect(
          await readCategoryAlerts(categoryName)
        ).toEqual(E2E_ALERT_NONE);
      } finally {
        await removeDeletableCategory(categoryName);
      }
    });
  }

  test("Cancelar returns to the category list", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryAlertsFixtureName(
      testInfo.project.name,
      "cancel"
    );
    await seedCategoryWithAlerts(categoryName);
    const alertsFormPage =
      createCategoryAlertsFormPage(page);

    try {
      await logInAsAdmin(page);
      await alertsFormPage.goTo(
        await findCategoryId(categoryName)
      );
      await alertsFormPage.cancel();

      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.CATEGORIES
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("an unknown category id shows the not-found page", async ({
    page,
  }) => {
    const alertsFormPage =
      createCategoryAlertsFormPage(page);

    await logInAsAdmin(page);
    await alertsFormPage.goTo(E2E_UNKNOWN_CATEGORY_ID);

    await expect(
      alertsFormPage.getNotFoundMessage()
    ).toBeVisible();
    await expect(alertsFormPage.getHeading()).toHaveCount(
      E2E_COUNT.NONE
    );
  });

  test.describe("Signed-out visitor", () => {
    test.use({
      storageState: E2E_SIGNED_OUT_STORAGE_STATE,
    });

    test("sends a signed-out visitor to the login", async ({
      page,
    }) => {
      const alertsFormPage =
        createCategoryAlertsFormPage(page);

      await alertsFormPage.goTo(E2E_UNKNOWN_CATEGORY_ID);

      await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    });
  });
});
