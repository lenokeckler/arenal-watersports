import type { Locator, Page } from "@playwright/test";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormCustomerPage = (
  page: Page
) => {
  const main = getMainRegion(page);

  return {
    getCustomerNameInput: (): Locator =>
      main.getByLabel(
        E2E_RESERVATION_FORM_COPY.CUSTOMER_NAME,
        {
          exact: false,
        }
      ),
    getPeopleCountInput: (): Locator =>
      main.getByLabel(
        E2E_RESERVATION_FORM_COPY.PEOPLE_COUNT,
        {
          exact: false,
        }
      ),
  };
};
