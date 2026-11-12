import { expect, type Page } from "@playwright/test";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { E2E_PREDEFINED_COMBO_FIXTURE } from "../constants/E2ePredefinedCombo.constants";
import type { E2ePredefinedComboFixture } from "../models/E2ePredefinedComboFixture.interface";
import { createPredefinedComboReservationPage } from "../pages/PredefinedComboReservation.page";
import { createPredefinedComboFixture } from "./predefinedComboFixture";
import { captureViewport } from "./captureViewport";
import { signInAsPredefinedComboFixtureWorker } from "./signInAsPredefinedComboFixtureWorker";

const prepareComboScreenshot = async (
  page: Page,
  projectName: string
) => {
  const fixture = createPredefinedComboFixture(projectName);
  const combo = await fixture.setup();
  try {
    await signInAsPredefinedComboFixtureWorker(
      page,
      combo.workerUsername,
      combo.workerPassword
    );
    const reservationPage =
      createPredefinedComboReservationPage(page);
    await reservationPage.goTo();
    await reservationPage.selectComboMode();
    await reservationPage.selectPredefinedMode();
    return { combo, fixture, reservationPage };
  } catch (error) {
    await fixture.cleanup();
    throw error;
  }
};

const captureCatalogState = async (
  page: Page,
  reservationPage: ReturnType<
    typeof createPredefinedComboReservationPage
  >,
  projectName: string
): Promise<void> => {
  await reservationPage.scrollToSelection();
  await expect(
    reservationPage.getComboSelect()
  ).toBeVisible();
  await page
    .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
    .evaluateAll((indicators) =>
      indicators.forEach((indicator) => indicator.remove())
    );
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      E2E_PREDEFINED_COMBO_FIXTURE.SCREENSHOT_CATALOG_BASENAME,
      projectName
    )
  );
};

const captureSelectedState = async (
  page: Page,
  reservationPage: ReturnType<
    typeof createPredefinedComboReservationPage
  >,
  combo: E2ePredefinedComboFixture,
  projectName: string
): Promise<void> => {
  await reservationPage.selectPredefinedCombo(
    combo.comboId
  );
  await reservationPage.scrollToSummary();
  await expect(reservationPage.getSummary()).toContainText(
    combo.comboName
  );
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      E2E_PREDEFINED_COMBO_FIXTURE.SCREENSHOT_SELECTED_BASENAME,
      projectName
    )
  );
};

export const capturePredefinedComboScreenshots = async (
  page: Page,
  projectName: string
): Promise<void> => {
  const { combo, fixture, reservationPage } =
    await prepareComboScreenshot(page, projectName);
  try {
    await captureCatalogState(
      page,
      reservationPage,
      projectName
    );
    await captureSelectedState(
      page,
      reservationPage,
      combo,
      projectName
    );
  } finally {
    try {
      await page.context().clearCookies();
    } finally {
      await fixture.cleanup();
    }
  }
};
