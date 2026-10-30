import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { E2E_RESERVATION_TYPE_COPY } from "../constants/E2eReservationForm.constants";
import { E2E_RESERVATION_TYPE_SCREENSHOT } from "../constants/E2eReservationTypeScreenshot.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { captureViewport } from "../support/captureViewport";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

const captureReservationTypeState = async (
  page: Page,
  screenshotState: string,
  projectName: string
): Promise<void> => {
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      `${E2E_RESERVATION_TYPE_SCREENSHOT.BASENAME}-${screenshotState}`,
      projectName
    )
  );
};

test("captures rental default and tour reservation types", async ({
  page,
}, testInfo) => {
  await signInAsSeededWorker(page);
  const reservationFormPage =
    createReservationFormPage(page);

  await reservationFormPage.goTo();
  await expect(
    reservationFormPage.getReservationTypeRadio(
      E2E_RESERVATION_TYPE_COPY.OPTIONS.RENTAL.label
    )
  ).toBeChecked();
  await expect(
    reservationFormPage.getCategorySelect()
  ).toBeEnabled();
  await page
    .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
    .evaluateAll((indicators) =>
      indicators.forEach((indicator) => indicator.remove())
    );
  await captureReservationTypeState(
    page,
    E2E_RESERVATION_TYPE_SCREENSHOT.RENTAL_DEFAULT,
    testInfo.project.name
  );

  await reservationFormPage.selectReservationType(
    E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );
  await expect(
    reservationFormPage.getReservationTypeRadio(
      E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    )
  ).toBeChecked();
  await expect(
    reservationFormPage.getCategoryOption(
      E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_CATEGORY.BOAT
    )
  ).toHaveCount(1);
  await reservationFormPage.getHeading().click();
  await captureReservationTypeState(
    page,
    E2E_RESERVATION_TYPE_SCREENSHOT.TOUR_SELECTED,
    testInfo.project.name
  );
});
