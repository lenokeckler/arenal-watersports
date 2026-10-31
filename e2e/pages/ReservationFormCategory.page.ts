import type { Locator, Page } from "@playwright/test";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormCategoryPage = (
  page: Page
) => {
  const getCategorySelect = (): Locator =>
    getMainRegion(page).getByLabel(
      E2E_RESERVATION_FORM_COPY.CATEGORY,
      { exact: true }
    );

  return {
    getCategorySelect,
    getCategoryCard: (categoryName: string): Locator =>
      getMainRegion(page).getByText(categoryName, {
        exact: true,
      }),
    getSelectedCategoryOption: (): Locator =>
      getCategorySelect().locator("option:checked"),
    selectCategory: async (
      label: string
    ): Promise<void> => {
      await getCategorySelect().selectOption({ label });
    },
  };
};
