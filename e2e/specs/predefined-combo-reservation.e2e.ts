import { test } from "@playwright/test";
import type { E2ePredefinedComboFixture } from "../models/E2ePredefinedComboFixture.interface";
import { createPredefinedComboReservationPage } from "../pages/PredefinedComboReservation.page";
import { createPredefinedComboFixture } from "../support/predefinedComboFixture";
import { signInAsPredefinedComboFixtureWorker } from "../support/signInAsPredefinedComboFixtureWorker";
import {
  assertSelectedComboDetails,
  submitPredefinedComboReservation,
} from "../support/predefinedComboReservationAssertions";

const predefinedComboTest = test.extend<{
  savedCombo: E2ePredefinedComboFixture;
}>({
  savedCombo: async (
    { browserName, page },
    provideFixture
  ) => {
    const comboFixture =
      createPredefinedComboFixture(browserName);
    const savedCombo = await comboFixture.setup();
    try {
      await provideFixture(savedCombo);
    } finally {
      try {
        await page.context().clearCookies();
      } finally {
        await comboFixture.cleanup();
      }
    }
  },
});

predefinedComboTest.beforeEach(
  async ({ page, savedCombo }) => {
    await signInAsPredefinedComboFixtureWorker(
      page,
      savedCombo.workerUsername,
      savedCombo.workerPassword
    );
    await createPredefinedComboReservationPage(page).goTo();
  }
);

predefinedComboTest(
  "reserves a persisted package at its saved price",
  async ({ page, savedCombo }) => {
    await assertSelectedComboDetails(page, savedCombo);
    await submitPredefinedComboReservation(
      page,
      savedCombo.customerName
    );
  }
);
