import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormActionPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getSubmitButton = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_RESERVATION_FORM_COPY.SUBMIT,
      exact: true,
    });

  return {
    getSubmitActionBar: (): Locator =>
      main.getByLabel(E2E_RESERVATION_FORM_COPY.ACTIONS, {
        exact: true,
      }),
    getSubmitButton,
    getSuccessMessage: (): Locator =>
      main.getByText(E2E_RESERVATION_FORM_COPY.SUCCESS, {
        exact: true,
      }),
    getValidationError: (): Locator =>
      main.getByText(
        E2E_RESERVATION_FORM_COPY.VALIDATION_ERROR,
        {
          exact: true,
        }
      ),
    scrollToSubmit: async (): Promise<void> => {
      await getSubmitButton().scrollIntoViewIfNeeded();
    },
    submit: (): Promise<void> => getSubmitButton().click(),
    attemptSubmit: (): Promise<void> =>
      getSubmitButton().evaluate(
        (button: HTMLButtonElement) => button.click()
      ),
  };
};
