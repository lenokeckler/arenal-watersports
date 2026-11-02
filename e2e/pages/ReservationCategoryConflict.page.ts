import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import {
  E2E_RESERVATION_CATEGORY_CONFLICT,
  E2E_RESERVATION_FORM_COPY,
} from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "./ReservationForm.page";
import { getMainRegion } from "../support/mainRegion";

export const createReservationCategoryConflictPage = (
  page: Page
) => {
  const formPage = createReservationFormPage(page);
  const getConflictWarning = (): Locator =>
    getMainRegion(page).getByRole(ARIA_ROLE.ALERT).filter({
      hasText:
        E2E_RESERVATION_CATEGORY_CONFLICT.WARNING_TITLE,
    });
  const getAvailabilityLoading = (): Locator =>
    getMainRegion(page).getByText(
      RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY_LOADING,
      { exact: true }
    );
  const getEquipmentEligibilityLoading = (): Locator =>
    getMainRegion(page).getByText(
      RESERVATION_FORM_UI_COPY.EQUIPMENT_ELIGIBILITY_LOADING,
      { exact: true }
    );

  return {
    ...formPage,
    prepareOverlappingReservation: async (
      customerName: string,
      date: string
    ): Promise<void> => {
      await formPage.goTo();
      await formPage.getDateInput().fill(date);
      await formPage
        .getTimeInput()
        .fill(
          E2E_RESERVATION_FORM_COPY.CATEGORY_AVAILABILITY_TIME
        );
      await formPage
        .getCustomerNameInput()
        .fill(customerName);
      await formPage.selectCategory(
        E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION
      );
    },
    getAvailabilityLoading,
    getConflictWarning,
    getEquipmentEligibilityLoading,
  };
};
