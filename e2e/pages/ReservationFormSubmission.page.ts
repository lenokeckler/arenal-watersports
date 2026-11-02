import type { Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";
import { createReservationFormCategoryPage } from "./ReservationFormCategory.page";

export const createReservationFormSubmissionPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const categoryPage =
    createReservationFormCategoryPage(page);

  return {
    submitCustomDurationReservation: async (
      durationHours: string
    ): Promise<void> => {
      await main
        .getByLabel(
          E2E_RESERVATION_FORM_COPY.CUSTOMER_NAME,
          { exact: false }
        )
        .fill(
          E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION_CUSTOMER_NAME
        );
      await categoryPage.selectCategory(
        E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION
      );
      await main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION_OPTION,
          exact: true,
        })
        .click();
      await main
        .getByLabel(
          E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION,
          { exact: false }
        )
        .fill(durationHours);
      await main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: E2E_RESERVATION_FORM_COPY.SUBMIT,
          exact: true,
        })
        .click();
    },
    submitReservation: async (): Promise<void> => {
      await main
        .getByLabel(
          E2E_RESERVATION_FORM_COPY.CUSTOMER_NAME,
          { exact: false }
        )
        .fill(
          E2E_RESERVATION_FORM_COPY.CUSTOMER_NAME_VALID
        );
      await categoryPage.selectCategory(
        E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION
      );
      await main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: E2E_RESERVATION_FORM_COPY.SUBMIT,
          exact: true,
        })
        .click();
    },
  };
};
