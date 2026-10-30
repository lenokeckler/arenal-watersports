import type { Page } from "@playwright/test";
import {
  E2E_RESERVATION_FORM_COPY,
  E2E_RESERVATION_TYPE_COPY,
} from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";

export const selectGuideOnlyReservationUnit = async (
  page: Page
): Promise<void> => {
  const reservationFormPage =
    createReservationFormPage(page);

  await reservationFormPage.goTo();
  await reservationFormPage
    .getDateInput()
    .fill(E2E_RESERVATION_FORM_COPY.REALTIME_DATE);
  await reservationFormPage.selectReservationType(
    E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );
  await reservationFormPage
    .getCategorySelect()
    .selectOption({
      label:
        E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_CATEGORY.BOAT,
    });
  await reservationFormPage.waitForUnitOption(
    E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_UNIT_OPTION
  );
  await reservationFormPage.selectUnit(
    E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_UNIT_OPTION
  );
};
