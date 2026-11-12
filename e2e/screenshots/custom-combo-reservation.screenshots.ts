import { expect, test } from "@playwright/test";
import {
  E2E_CUSTOM_COMBO,
  E2E_CUSTOM_COMBO_FIXTURE,
  E2E_CUSTOM_COMBO_SCREENSHOT,
} from "../constants/E2eCustomCombo.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { createCustomComboReservationPage } from "../pages/CustomComboReservation.page";
import { captureViewport } from "../support/captureViewport";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("captures custom combo selection and pricing", async ({
  page,
}, testInfo) => {
  await signInAsSeededWorker(page);
  const reservationPage =
    createCustomComboReservationPage(page);

  await reservationPage.goTo();
  await reservationPage.getHeading().waitFor();
  await reservationPage.selectCombo();
  await reservationPage.scrollToNoGuideStatus();
  await expect(
    reservationPage.getNoGuideStatus()
  ).toBeVisible();
  await page
    .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
    .evaluateAll((indicators) =>
      indicators.forEach((indicator) => indicator.remove())
    );
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      `${E2E_CUSTOM_COMBO.SCREENSHOT_BASENAME}-${E2E_CUSTOM_COMBO_SCREENSHOT.NO_GUIDE}`,
      testInfo.project.name
    )
  );
  await reservationPage.addCategory(
    E2E_CUSTOM_COMBO_FIXTURE.REGULAR_CATEGORY_NAME
  );
  await reservationPage.increaseCategory(
    E2E_CUSTOM_COMBO_FIXTURE.REGULAR_CATEGORY_NAME
  );
  await reservationPage.addCategory(
    E2E_CUSTOM_COMBO_FIXTURE.GUIDE_ONLY_CATEGORY_NAME
  );
  await reservationPage.selectGuide(
    E2E_CUSTOM_COMBO_FIXTURE.GUIDE_NAME
  );
  await reservationPage.scrollToEquipmentSelection();
  await expect(
    reservationPage.getCategoryQuantityGroup(
      E2E_CUSTOM_COMBO_FIXTURE.REGULAR_CATEGORY_NAME
    )
  ).toContainText(E2E_CUSTOM_COMBO.QUANTITY.INCREMENTED);
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      `${E2E_CUSTOM_COMBO.SCREENSHOT_BASENAME}-${E2E_CUSTOM_COMBO_SCREENSHOT.EQUIPMENT_SELECTION}`,
      testInfo.project.name
    )
  );

  await reservationPage.fillAgreedAmount(
    E2E_CUSTOM_COMBO.COPY.CRC_AMOUNT,
    E2E_CUSTOM_COMBO.AGREED_AMOUNT.CRC
  );
  await reservationPage.fillAgreedAmount(
    E2E_CUSTOM_COMBO.COPY.USD_AMOUNT,
    E2E_CUSTOM_COMBO.AGREED_AMOUNT.USD
  );
  await reservationPage.scrollToPricing();
  await expect(
    reservationPage.getPricingRegion()
  ).toContainText(E2E_CUSTOM_COMBO.QUOTE.COMBINED_CRC);
  await expect(
    reservationPage.getPricingRegion()
  ).toContainText(E2E_CUSTOM_COMBO.QUOTE.COMBINED_USD);
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      `${E2E_CUSTOM_COMBO.SCREENSHOT_BASENAME}-${E2E_CUSTOM_COMBO_SCREENSHOT.PRICING_AND_GUIDE}`,
      testInfo.project.name
    )
  );
});
