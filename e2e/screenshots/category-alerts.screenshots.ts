import { test } from "@playwright/test";
import { CATEGORY_ALERT_FORM_FIELD_ID } from "@/app/features/administration/category-catalog/constants/CategoryAlertFormFieldId.constants";
import { CATEGORY_ALERT_TYPE } from "@/app/features/administration/category-catalog/constants/CategoryAlertType.constants";
import { captureViewport } from "../support/captureViewport";
import { createCategoryAlertsFormPage } from "../pages/CategoryAlertsForm.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { seedCategoryWithAlerts } from "../support/categoryAlertFixtures";
import {
  findCategoryId,
  removeDeletableCategory,
} from "../support/categoryFixtures";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import {
  E2E_ALERT_INPUT,
  E2E_ALERT_NO_INPUT,
  E2E_CATEGORY_ALERTS_SCREENSHOT_STATE,
  resolveCategoryAlertsFixtureName,
  resolveCategoryAlertsScreenshotBasename,
} from "../constants/E2eCategoryAlerts.constants";

const INVALID_EXPIRY_TEXT = "abc";

test.describe("Category alerts screenshots", () => {
  test("captures the none, quantity and both-with-error states of the alerts screen", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryAlertsFixtureName(
      testInfo.project.name,
      "screenshot"
    );
    await seedCategoryWithAlerts(categoryName);
    const alertsFormPage =
      createCategoryAlertsFormPage(page);
    const capture = (state: string): Promise<void> =>
      captureViewport(
        page,
        resolveDeviceScreenshotFileName(
          resolveCategoryAlertsScreenshotBasename(state),
          testInfo.project.name
        )
      );

    try {
      await logInAsAdmin(page);
      await alertsFormPage.goTo(
        await findCategoryId(categoryName)
      );
      await alertsFormPage.getHeading().waitFor();
      await capture(
        E2E_CATEGORY_ALERTS_SCREENSHOT_STATE.NONE
      );

      await alertsFormPage.selectType(
        CATEGORY_ALERT_TYPE.QUANTITY
      );
      await alertsFormPage.fillThresholds({
        ...E2E_ALERT_NO_INPUT,
        minQuantityText: E2E_ALERT_INPUT.MIN_QUANTITY,
      });
      await capture(
        E2E_CATEGORY_ALERTS_SCREENSHOT_STATE.QUANTITY_FILLED
      );

      await alertsFormPage.selectType(
        CATEGORY_ALERT_TYPE.BOTH
      );
      await alertsFormPage.fillThresholds({
        ...E2E_ALERT_NO_INPUT,
        expiryDaysText: INVALID_EXPIRY_TEXT,
      });
      await alertsFormPage.submit();
      await alertsFormPage
        .getFieldError(
          CATEGORY_ALERT_FORM_FIELD_ID.EXPIRY_DAYS
        )
        .waitFor();
      await capture(
        E2E_CATEGORY_ALERTS_SCREENSHOT_STATE.BOTH_ERROR
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});
