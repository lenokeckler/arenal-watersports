import type { Locator, Page } from "@playwright/test";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormCategoryPage = (
  page: Page
) => {
  const getCategorySelect = (): Locator =>
    getMainRegion(page).getByLabel(
      E2E_RESERVATION_FORM_COPY.CATEGORY_FIELD_NAME,
      { exact: true }
    );

  return {
    getCategorySelect,
    selectCategory: async (
      label: string
    ): Promise<void> => {
      await getCategorySelect().selectOption({ label });
    },
  };
};
