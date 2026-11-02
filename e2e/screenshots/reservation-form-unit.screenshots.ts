import { expect, test } from "@playwright/test";
import {
  E2E_RESERVATION_FORM_COPY,
  E2E_RESERVATION_FORM_SCREENSHOT_BASENAME,
  E2E_RESERVATION_FORM_UNIT_SCREENSHOT_SUFFIX,
} from "../constants/E2eReservationForm.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { captureViewport } from "../support/captureViewport";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("captures concrete Lancha unit selection", async ({
  page,
}, testInfo) => {
  await signInAsSeededWorker(page);
  const reservationForm = createReservationFormPage(page);
  await reservationForm.goTo();
  await reservationForm
    .getDateInput()
    .fill(E2E_RESERVATION_FORM_COPY.SCREENSHOT_DATE);
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
    reservationForm.getSelectedUnitOption()
  ).toHaveText(E2E_RESERVATION_FORM_COPY.UNIT_OPTION);
  await page
    .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
    .evaluateAll((indicators) =>
      indicators.forEach((indicator) => indicator.remove())
    );
  await reservationForm.getHeading().click();
  await reservationForm.scrollToUnitSelect();

  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      `${E2E_RESERVATION_FORM_SCREENSHOT_BASENAME}-${E2E_RESERVATION_FORM_UNIT_SCREENSHOT_SUFFIX}`,
      testInfo.project.name
    )
  );
});
