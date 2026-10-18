import type { Locator, Page } from "@playwright/test";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormUnitPage = (
  page: Page
) => {
  const getUnitSelect = (): Locator =>
    getMainRegion(page).getByLabel(
      E2E_RESERVATION_FORM_COPY.UNIT,
      { exact: false }
    );

  return {
    getUnitSelect,
    getUnitOption: (label: string): Locator =>
      getUnitSelect().locator("option", { hasText: label }),
    getSelectedUnitOption: (): Locator =>
      getUnitSelect().locator("option:checked"),
    selectUnit: async (label: string): Promise<void> => {
      await getUnitSelect().selectOption({ label });
    },
    scrollToUnitSelect: async (): Promise<void> => {
      await getUnitSelect().scrollIntoViewIfNeeded();
    },
    waitForUnitOption: async (
      label: string
    ): Promise<void> => {
      await getUnitSelect()
        .locator("option", { hasText: label })
        .waitFor({ state: "attached" });
    },
  };
};
