import type { Locator, Page } from "@playwright/test";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormCustomComboPage = (
  page: Page
) => {
  const getUnitSelect = (categoryName: string): Locator =>
    getMainRegion(page).getByLabel(
      `${RESERVATION_FORM_UI_COPY.UNIT}: ${categoryName}`,
      { exact: true }
    );

  return {
    getCustomComboUnitOption: (
      categoryName: string,
      unitCode: string
    ): Locator =>
      getUnitSelect(categoryName).locator("option", {
        hasText: unitCode,
      }),
    getSelectedCustomComboUnitOption: (
      categoryName: string
    ): Locator =>
      getUnitSelect(categoryName).locator("option:checked"),
    selectCustomComboUnit: async (
      categoryName: string,
      unitCode: string
    ): Promise<void> => {
      await getUnitSelect(categoryName).selectOption({
        label: unitCode,
      });
    },
    waitForCustomComboUnitOption: async (
      categoryName: string,
      unitCode: string
    ): Promise<void> => {
      await getUnitSelect(categoryName)
        .locator("option", { hasText: unitCode })
        .waitFor({ state: "attached" });
    },
  };
};
