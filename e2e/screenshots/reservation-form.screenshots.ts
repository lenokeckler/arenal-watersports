import { PATHS } from "@/app/constants";
import { expect, test } from "../support/activeWorkerTest";
import {
  E2E_RESERVATION_FORM_COPY,
  E2E_RESERVATION_FORM_CUSTOM_DURATION_SCREENSHOT_SUFFIX,
  E2E_RESERVATION_FORM_EQUIPMENT_SCREENSHOT_SUFFIX,
  E2E_RESERVATION_FORM_SCREENSHOT_BASENAME,
  E2E_RESERVATION_FORM_SUCCESS_SCREENSHOT_SUFFIX,
} from "../constants/E2eReservationForm.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { captureViewport } from "../support/captureViewport";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { addReservationsArea } from "../support/addReservationsArea";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";
import { removeReservationsForWorker } from "../support/removeReservationsForWorker";

test.describe("Reservation form screenshots", () => {
  test.afterEach(async ({ activeWorker }) => {
    await removeReservationsForWorker(activeWorker);
  });

  test("captures the reservation form", async ({
    activeWorker,
    page,
  }, testInfo) => {
    await addReservationsArea(activeWorker.id);
    await submitActiveWorkerSignIn(page, activeWorker);
    await expect(page).toHaveURL(PATHS.MODE);
    await createWorkModePage(page)
      .getCard(E2E_RESERVATIONS_AREA_LABEL)
      .click();
    await expect(page).toHaveURL(PATHS.HOME);
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage.getHeading().waitFor();
    await reservationFormPage
      .getCategoryCard(
        E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION
      )
      .waitFor();
    await reservationFormPage.selectCategory(
      E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION
    );
    await page
      .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
      .evaluateAll((indicators) =>
        indicators.forEach((indicator) =>
          indicator.remove()
        )
      );
    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_RESERVATION_FORM_SCREENSHOT_BASENAME,
        testInfo.project.name
      )
    );
    await reservationFormPage.selectDuration(
      E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION_OPTION
    );
    await reservationFormPage.typeCustomDuration(
      E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION_HOURS
    );
    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        `${E2E_RESERVATION_FORM_SCREENSHOT_BASENAME}-${E2E_RESERVATION_FORM_CUSTOM_DURATION_SCREENSHOT_SUFFIX}`,
        testInfo.project.name
      )
    );
    await reservationFormPage.scrollToSubmit();
    await expect(
      reservationFormPage.getCategoryCard(
        E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION
      )
    ).toBeVisible();
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
});
