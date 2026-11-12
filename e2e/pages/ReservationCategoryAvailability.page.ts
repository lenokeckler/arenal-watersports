import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import {
  E2E_RESERVATION_CATEGORY_AVAILABILITY_COUNT_PATTERN,
  E2E_RESERVATION_FORM_COPY,
} from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "./ReservationForm.page";
import { getMainRegion } from "../support/mainRegion";

export const createReservationCategoryAvailabilityPage = (
  page: Page
) => {
  const formPage = createReservationFormPage(page);
  const getAvailabilityPanel = (): Locator =>
    getMainRegion(page).getByRole(ARIA_ROLE.REGION, {
      name: RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY,
    });
  const getAvailabilityStatus = (): Locator =>
    getAvailabilityPanel().getByRole(ARIA_ROLE.STATUS);

  return {
    ...formPage,
    getAvailabilityPanel,
    getAvailabilityStatus,
    getAvailabilityCount: (): Locator =>
      getAvailabilityStatus().getByText(
        E2E_RESERVATION_CATEGORY_AVAILABILITY_COUNT_PATTERN
      ),
    prepareInterval: async (): Promise<void> => {
      await formPage.goTo();
      await formPage
        .getDateInput()
        .fill(E2E_RESERVATION_FORM_COPY.REALTIME_DATE);
      await formPage
        .getTimeInput()
        .fill(
          E2E_RESERVATION_FORM_COPY.CATEGORY_AVAILABILITY_TIME
        );
      await formPage.selectCategory(
        E2E_RESERVATION_FORM_COPY.CATEGORY_AVAILABILITY_OPTION
      );
    },
  };
};
