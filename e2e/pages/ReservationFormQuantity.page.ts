import type { Locator, Page } from "@playwright/test";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormQuantityPage = (
  page: Page
) => ({
  getQuantityInput: (): Locator =>
    getMainRegion(page).getByLabel(
      E2E_RESERVATION_FORM_COPY.QUANTITY,
      { exact: false }
    ),
});
