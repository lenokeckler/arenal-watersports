import { expect, test } from "@playwright/test";
import {
  E2E_RESERVATION_GUIDES,
  E2E_RESERVATION_TYPE_COPY,
} from "../constants/E2eReservationForm.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { captureViewport } from "../support/captureViewport";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("captures a tour with multiple assigned guides", async ({
  page,
}, testInfo) => {
  await signInAsSeededWorker(page);
  const reservationFormPage =
    createReservationFormPage(page);
  await reservationFormPage.goTo();
  await reservationFormPage.selectReservationType(
    E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );
  await reservationFormPage.selectGuide(
    E2E_RESERVATION_GUIDES.FIRST_NAME
  );
  await reservationFormPage.selectGuide(
    E2E_RESERVATION_GUIDES.SECOND_NAME
  );
  await expect(
    reservationFormPage.getGuideCheckbox(
      E2E_RESERVATION_GUIDES.SECOND_NAME
    )
  ).toBeChecked();
  await page
    .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
    .evaluateAll((indicators) =>
      indicators.forEach((indicator) => indicator.remove())
    );
  await reservationFormPage
    .getGuideCheckbox(E2E_RESERVATION_GUIDES.FIRST_NAME)
    .scrollIntoViewIfNeeded();
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      `${E2E_RESERVATION_GUIDES.SCREENSHOT_BASENAME}-${E2E_RESERVATION_GUIDES.MULTIPLE_GUIDES_SUFFIX}`,
      testInfo.project.name
    )
  );
});
