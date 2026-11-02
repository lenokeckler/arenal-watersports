import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import { createReservationFormPage } from "./ReservationForm.page";

export const createOneHandedUsePage = (page: Page) => {
  const reservationFormPage =
    createReservationFormPage(page);
  const main = page.getByRole(ARIA_ROLE.MAIN);

  return {
    ...reservationFormPage,
    getActionBar: (): Locator =>
      main.getByLabel(RESERVATION_FORM_UI_COPY.ACTIONS, {
        exact: true,
      }),
    getCategoryPlaceholder: (): Locator =>
      main
        .getByLabel(RESERVATION_FORM_UI_COPY.CATEGORY, {
          exact: false,
        })
        .locator("option")
        .filter({
          hasText:
            RESERVATION_FORM_UI_COPY.CATEGORY_PLACEHOLDER,
        }),
    getDocumentRoot: (): Locator => page.locator("html"),
    getDescription: (): Locator =>
      main.getByText(RESERVATION_FORM_UI_COPY.DESCRIPTION, {
        exact: true,
      }),
    getDurationButtonGroup: (): Locator =>
      main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: RESERVATION_FORM_UI_COPY.CUSTOM_DURATION_OPTION,
          exact: true,
        })
        .locator(".."),
    getDurationHeading: (): Locator =>
      main.getByText(RESERVATION_FORM_UI_COPY.DURATION, {
        exact: true,
      }),
    getMainButtons: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON),
  };
};
