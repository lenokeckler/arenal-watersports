import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";
import {
  E2E_RESERVATION_DETAIL_COPY,
  E2E_RESERVATION_DETAIL_SCREENSHOT,
} from "../constants/E2eReservationDetail.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { captureViewport } from "../support/captureViewport";
import { createReservationDetailFixture } from "../support/createReservationDetailFixture";
import { signInAsPredefinedComboFixtureWorker } from "../support/signInAsPredefinedComboFixtureWorker";

test("captures the complete reservation detail", async ({
  page,
}, testInfo) => {
  const reservationFixture =
    await createReservationDetailFixture();
  const reservationDetailPage =
    createReservationDetailPage(page);

  try {
    await signInAsPredefinedComboFixtureWorker(
      page,
      reservationFixture.workerUsername,
      reservationFixture.workerPassword
    );
    await reservationDetailPage.goTo(reservationFixture.id);
    await expect(
      reservationDetailPage
        .getGuideSection()
        .getByText(reservationFixture.guideName)
    ).toBeVisible();
    await expect(
      reservationDetailPage
        .getChargeSection()
        .getByText(E2E_RESERVATION_DETAIL_COPY.PAID)
    ).toBeVisible();
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
        E2E_RESERVATION_DETAIL_SCREENSHOT.BASENAME,
        testInfo.project.name
      ),
      E2E_RESERVATION_DETAIL_SCREENSHOT.FULL_PAGE
    );
    await reservationDetailPage.goTo(randomUUID());
    await expect(
      page.getByText(
        E2E_RESERVATION_DETAIL_COPY.MISSING_RESERVATION,
        { exact: true }
      )
    ).toBeVisible();
    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_RESERVATION_DETAIL_SCREENSHOT.NOT_FOUND_BASENAME,
        testInfo.project.name
      ),
      E2E_RESERVATION_DETAIL_SCREENSHOT.FULL_PAGE
    );
  } finally {
    await reservationFixture.cleanup();
  }
});
