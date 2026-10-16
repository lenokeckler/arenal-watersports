import type { Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormSubmissionPage = (
  page: Page
) => {
  const main = getMainRegion(page);

  return {
    submitReservation: async (): Promise<void> => {
      await main
        .getByLabel(
          E2E_RESERVATION_FORM_COPY.CUSTOMER_NAME,
          { exact: false }
        )
        .fill(
          E2E_RESERVATION_FORM_COPY.CUSTOMER_NAME_VALID
        );
      await main
        .getByLabel(
          E2E_RESERVATION_FORM_COPY.CATEGORY_FIELD_NAME,
          { exact: true }
        )
        .selectOption({
          label: E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION,
        });
      await main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: E2E_RESERVATION_FORM_COPY.SUBMIT,
          exact: true,
        })
        .click();
    },
  };
};
