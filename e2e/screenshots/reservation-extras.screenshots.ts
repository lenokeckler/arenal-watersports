import { expect, test } from "@playwright/test";
import {
  E2E_RESERVATION_FORM_COPY,
  E2E_RESERVATION_FORM_EXTRAS_SCREENSHOT_BASENAME,
} from "../constants/E2eReservationForm.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { RESERVATION_TYPE_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationTypeCopy.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { captureViewport } from "../support/captureViewport";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("captures compatible reservation extras and server quote states", async ({
  page,
}, testInfo) => {
  await signInAsSeededWorker(page);
  const reservationForm = createReservationFormPage(page);
  await reservationForm.goTo();
  await reservationForm
    .getDateInput()
    .fill(E2E_RESERVATION_FORM_COPY.SCREENSHOT_DATE);
  await reservationForm.selectReservationType(
    RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );
  await reservationForm.selectCategory(
    E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
  );
  await reservationForm.waitForUnitOption(
    E2E_RESERVATION_FORM_COPY.UNIT_OPTION
  );
  await reservationForm.selectUnit(
    E2E_RESERVATION_FORM_COPY.UNIT_OPTION
  );
  await expect(
    reservationForm.getExtraOption(
      E2E_RESERVATION_FORM_COPY.EXTRA_PONTOON_OPTION
    )
  ).toBeVisible();
  await expect(
    reservationForm.getQuoteMissingTariff()
  ).toBeVisible();
  await page
    .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
    .evaluateAll((indicators) =>
      indicators.forEach((indicator) => indicator.remove())
    );
  await reservationForm
    .getExtraOption(
      E2E_RESERVATION_FORM_COPY.EXTRA_PONTOON_OPTION
    )
    .click();
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      E2E_RESERVATION_FORM_EXTRAS_SCREENSHOT_BASENAME,
      testInfo.project.name
    )
  );
});
