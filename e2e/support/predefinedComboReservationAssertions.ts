import { expect, type Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { E2E_PREDEFINED_COMBO_FIXTURE } from "../constants/E2ePredefinedCombo.constants";
import type { E2ePredefinedComboFixture } from "../models/E2ePredefinedComboFixture.interface";
import { createPredefinedComboReservationPage } from "../pages/PredefinedComboReservation.page";

export const assertSelectedComboDetails = async (
  page: Page,
  combo: E2ePredefinedComboFixture
): Promise<void> => {
  const reservationPage =
    createPredefinedComboReservationPage(page);
  await expect(
    reservationPage.hasHorizontalOverflow()
  ).resolves.toBe(false);
  await reservationPage.selectComboMode();
  await reservationPage.selectPredefinedMode();
  await expect(
    reservationPage.getComboSelect()
  ).toBeVisible();
  await reservationPage.selectPredefinedCombo(
    combo.comboId
  );
  const summary = reservationPage.getSummary();
  await expect(summary).toContainText(combo.comboName);
  await expect(summary).toContainText(combo.categoryName);
  await expect(summary).toContainText(
    E2E_PREDEFINED_COMBO_FIXTURE.PACKAGE_PRICE_TEXT
  );
  await expect(summary).toContainText(
    `${E2E_PREDEFINED_COMBO_FIXTURE.QUANTITY} ${E2E_PREDEFINED_COMBO_FIXTURE.ITEM_COUNT}`
  );
  await expect(
    reservationPage.getNoGuideStatus()
  ).toBeVisible();
};

export const submitPredefinedComboReservation = async (
  page: Page,
  customerName: string
): Promise<void> => {
  const reservationPage =
    createPredefinedComboReservationPage(page);
  await reservationPage.fillReservationCustomer(
    customerName
  );
  await reservationPage.submitReservation();
  await expect(
    page.getByText(
      E2E_PREDEFINED_COMBO_FIXTURE.SUCCESS_COPY,
      { exact: true }
    )
  ).toBeVisible();
  await expect(
    page.getByRole(ARIA_ROLE.MAIN)
  ).toContainText(
    E2E_PREDEFINED_COMBO_FIXTURE.SUCCESS_COPY
  );
};
