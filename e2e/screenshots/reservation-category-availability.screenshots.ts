import { expect, test } from "@playwright/test";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { E2E_RESERVATION_CATEGORY_AVAILABILITY_SCREENSHOT_BASENAME } from "../constants/E2eReservationForm.constants";
import { createReservationCategoryAvailabilityPage } from "../pages/ReservationCategoryAvailability.page";
import { captureViewport } from "../support/captureViewport";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("captures selected interval availability", async ({
  page,
}, testInfo) => {
  await signInAsSeededWorker(page);
  const reservationPage =
    createReservationCategoryAvailabilityPage(page);

  await reservationPage.prepareInterval();
  await expect(
    reservationPage.getAvailabilityCount()
  ).toBeVisible();
  await page
    .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
    .evaluateAll((indicators) =>
      indicators.forEach((indicator) => indicator.remove())
    );
  await reservationPage
    .getAvailabilityPanel()
    .scrollIntoViewIfNeeded();
  await reservationPage.getTimeInput().blur();
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      E2E_RESERVATION_CATEGORY_AVAILABILITY_SCREENSHOT_BASENAME,
      testInfo.project.name
    )
  );
});
