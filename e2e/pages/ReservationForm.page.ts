import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormPage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getCategorySelect: (): Locator =>
      main.getByLabel(
        E2E_RESERVATION_FORM_COPY.CATEGORY_FIELD_NAME,
        {
          exact: true,
        }
      ),
    getSuccessMessage: (): Locator =>
      main.getByText(E2E_RESERVATION_FORM_COPY.SUCCESS, {
        exact: true,
      }),
    getCustomerNameInput: (): Locator =>
      main.getByLabel(
        E2E_RESERVATION_FORM_COPY.CUSTOMER_NAME,
        {
          exact: false,
        }
      ),
    getDateInput: (): Locator =>
      main.getByLabel(E2E_RESERVATION_FORM_COPY.DATE, {
        exact: false,
      }),
    getDurationButton: (label: string): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: label,
        exact: true,
      }),
    getDurationInput: (): Locator =>
      main.getByLabel(
        E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION,
        {
          exact: false,
        }
      ),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
      }),
    getPeopleCountInput: (): Locator =>
      main.getByLabel(
        E2E_RESERVATION_FORM_COPY.PEOPLE_COUNT,
        {
          exact: false,
        }
      ),
    getQuantityInput: (): Locator =>
      main.getByLabel(E2E_RESERVATION_FORM_COPY.QUANTITY, {
        exact: false,
      }),
    getSubmitButton: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_RESERVATION_FORM_COPY.SUBMIT,
        exact: true,
      }),
    getTimeInput: (): Locator =>
      main.getByLabel(E2E_RESERVATION_FORM_COPY.TIME, {
        exact: false,
      }),
    getTimeZoneHint: (): Locator =>
      main.getByText(E2E_RESERVATION_FORM_COPY.TIME_ZONE, {
        exact: true,
      }),
    getValidationError: (): Locator =>
      main.getByText(
        E2E_RESERVATION_FORM_COPY.VALIDATION_ERROR,
        {
          exact: true,
        }
      ),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.RESERVATIONS.NEW);
    },
    selectDuration: async (
      label: string
    ): Promise<void> => {
      await main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: label,
          exact: true,
        })
        .click();
    },
    scrollToSubmit: async (): Promise<void> => {
      await main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: E2E_RESERVATION_FORM_COPY.SUBMIT,
          exact: true,
        })
        .scrollIntoViewIfNeeded();
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
    submit: (): Promise<void> =>
      main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: E2E_RESERVATION_FORM_COPY.SUBMIT,
          exact: true,
        })
        .click(),
  };
};
