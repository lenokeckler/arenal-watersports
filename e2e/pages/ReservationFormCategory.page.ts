import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormCategoryPage = (
  page: Page
) => {
  const getCategoryGroup = (): Locator =>
    getMainRegion(page).getByRole(ARIA_ROLE.GROUP, {
      name: E2E_RESERVATION_FORM_COPY.CATEGORY,
    });

  const getCategoryCard = (categoryName: string): Locator =>
    getCategoryGroup().getByRole(ARIA_ROLE.BUTTON, {
      name: categoryName,
      exact: true,
    });

  return {
    getCategoryGroup,
    getCategorySelect: getCategoryGroup,
    getCategoryCard,
    getSelectedCategoryOption: (): Locator =>
      getCategoryGroup().getByRole(ARIA_ROLE.BUTTON, {
        pressed: true,
      }),
    selectCategory: async (
      label: string
    ): Promise<void> => {
      await getCategoryCard(label).click();
    },
  };
};
