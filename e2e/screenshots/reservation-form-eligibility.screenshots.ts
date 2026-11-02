import { expect, test } from "@playwright/test";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import {
  E2E_RESERVATION_EQUIPMENT_STATUS,
  E2E_RESERVATION_FORM_COPY,
  E2E_RESERVATION_FORM_ELIGIBILITY_SCREENSHOT_SUFFIX,
  E2E_RESERVATION_FORM_SCREENSHOT_BASENAME,
} from "../constants/E2eReservationForm.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { captureViewport } from "../support/captureViewport";
import { createReservationEquipmentStatusFixture } from "../support/createReservationEquipmentStatusFixture";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("captures equipment options after a unit is marked damaged", async ({
  page,
}, testInfo) => {
  const equipmentFixture =
    createReservationEquipmentStatusFixture();

  try {
    await signInAsSeededWorker(page);
    const initialStatus = await equipmentFixture.prepare();
    expect(initialStatus).toBe(
      E2E_RESERVATION_EQUIPMENT_STATUS.AVAILABLE
    );
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage
      .getDateInput()
      .fill(E2E_RESERVATION_FORM_COPY.REALTIME_DATE);
    await reservationFormPage.selectCategory(
      E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
    );
    await reservationFormPage.selectUnit(
      E2E_RESERVATION_FORM_COPY.REALTIME_UNIT_OPTION
    );
    await equipmentFixture.markUnitAsDamaged();
    await expect(
      reservationFormPage.getUnitOption(
        E2E_RESERVATION_FORM_COPY.REALTIME_UNIT_OPTION
      )
    ).toHaveCount(0);
    await expect(
      page.getByText(
        RESERVATION_FORM_UI_COPY.EQUIPMENT_SELECTION_CHANGED
      )
    ).toBeVisible();
    await page
      .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
      .evaluateAll((indicators) =>
        indicators.forEach((indicator) =>
          indicator.remove()
        )
      );
    await reservationFormPage.getHeading().click();
    await reservationFormPage.scrollToUnitSelect();
    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        `${E2E_RESERVATION_FORM_SCREENSHOT_BASENAME}-${E2E_RESERVATION_FORM_ELIGIBILITY_SCREENSHOT_SUFFIX}`,
        testInfo.project.name
      )
    );
  } finally {
    await equipmentFixture.restore();
  }
});
