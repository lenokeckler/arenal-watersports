import { expect, test } from "@playwright/test";
import {
  E2E_RESERVATION_FORM_EQUIPMENT_SCREENSHOT_SUFFIX,
  E2E_RESERVATION_FORM_SCREENSHOT_BASENAME,
  E2E_RESERVATION_FORM_SUCCESS_SCREENSHOT_SUFFIX,
} from "../constants/E2eReservationForm.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { captureViewport } from "../support/captureViewport";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("captures the reservation form", async ({
  page,
}, testInfo) => {
  await signInAsSeededWorker(page);
  const reservationFormPage =
    createReservationFormPage(page);

  await reservationFormPage.goTo();
  await reservationFormPage.getHeading().waitFor();
  await reservationFormPage.getCategorySelect().waitFor();
  await page
    .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
    .evaluateAll((indicators) =>
      indicators.forEach((indicator) => indicator.remove())
    );
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      E2E_RESERVATION_FORM_SCREENSHOT_BASENAME,
      testInfo.project.name
    )
  );
  await reservationFormPage.scrollToSubmit();
  await expect(
    reservationFormPage.getCategorySelect()
  ).toBeInViewport();
  await expect(
    reservationFormPage.getQuantityInput()
  ).toBeInViewport();
  await expect(
    reservationFormPage.getSubmitButton()
  ).toBeInViewport();
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      `${E2E_RESERVATION_FORM_SCREENSHOT_BASENAME}-${E2E_RESERVATION_FORM_EQUIPMENT_SCREENSHOT_SUFFIX}`,
      testInfo.project.name
    )
  );
  await reservationFormPage.submitReservation();
  await expect(
    reservationFormPage.getSuccessMessage()
  ).toBeVisible();
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      `${E2E_RESERVATION_FORM_SCREENSHOT_BASENAME}-${E2E_RESERVATION_FORM_SUCCESS_SCREENSHOT_SUFFIX}`,
      testInfo.project.name
    )
  );
});
