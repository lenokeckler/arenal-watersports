import { expect, test } from "../support/activeWorkerTest";
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
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test("captures a tour with multiple assigned guides", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const reservationFormPage =
    createReservationFormPage(page);
  await reservationFormPage.goTo();
  await reservationFormPage.selectReservationType(
    E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );
  await expect(
    reservationFormPage.getGuideNoSelectionWarning()
  ).toBeVisible();
  await page
    .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
    .evaluateAll((indicators) =>
      indicators.forEach((indicator) => indicator.remove())
    );
  await reservationFormPage.scrollToGuideNoSelectionWarning();
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      `${E2E_RESERVATION_GUIDES.SCREENSHOT_BASENAME}-${E2E_RESERVATION_GUIDES.NO_SELECTION_WARNING_SUFFIX}`,
      testInfo.project.name
    )
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
