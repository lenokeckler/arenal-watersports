import { expect, test } from "@playwright/test";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { E2E_RESERVATION_CATEGORY_CONFLICT } from "../constants/E2eReservationForm.constants";
import { createReservationCategoryConflictPage } from "../pages/ReservationCategoryConflict.page";
import { captureViewport } from "../support/captureViewport";
import { createReservationCategoryConflictFixture } from "../support/createReservationCategoryConflictFixture";
import { getReservationConflictDate } from "../support/getReservationConflictDate";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("captures the category conflict warning", async ({
  page,
}, testInfo) => {
  await signInAsSeededWorker(page);
  const reservationPage =
    createReservationCategoryConflictPage(page);
  const projectName = testInfo.project.name;
  const date = getReservationConflictDate(projectName);
  const fixture =
    createReservationCategoryConflictFixture();
  const customerNames =
    fixture.getCustomerNames(projectName);

  try {
    await fixture.prepare(projectName);
    await reservationPage.prepareOverlappingReservation(
      customerNames.first,
      date
    );
    await reservationPage.submit();
    await expect(
      reservationPage.getSuccessMessage()
    ).toBeVisible();

    await reservationPage.prepareOverlappingReservation(
      customerNames.second,
      date
    );
    await expect(
      reservationPage.getConflictWarning()
    ).toContainText(customerNames.first);
    await expect(
      reservationPage.getAvailabilityLoading()
    ).toBeHidden();
    await expect(
      reservationPage.getEquipmentEligibilityLoading()
    ).toBeHidden();
    await reservationPage
      .getConflictWarning()
      .scrollIntoViewIfNeeded();
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
        E2E_RESERVATION_CATEGORY_CONFLICT.SCREENSHOT_BASENAME,
        testInfo.project.name
      )
    );
  } finally {
    await fixture.cleanup(projectName);
  }
});
