import type { Locator, Page } from "@playwright/test";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormUnitPage = (
  page: Page
) => {
  const getUnitSelect = (): Locator =>
    getMainRegion(page).getByLabel(
      E2E_RESERVATION_FORM_COPY.UNIT,
      { exact: false }
    );

  return {
    getUnitSelect,
    getAvailabilityLoadingMessage: (): Locator =>
      getMainRegion(page).getByText(
        RESERVATION_FORM_UI_COPY.AVAILABILITY_LOADING,
        { exact: true }
      ),
    getUnitOption: (label: string): Locator =>
      getUnitSelect().locator("option", { hasText: label }),
    getSelectedUnitOption: (): Locator =>
      getUnitSelect().locator("option:checked"),
    selectUnit: async (label: string): Promise<void> => {
      await getUnitSelect().selectOption({ label });
    },
    scrollToUnitSelect: async (): Promise<void> => {
      await getUnitSelect().scrollIntoViewIfNeeded();
    },
    waitForUnitOption: async (
      label: string
    ): Promise<void> => {
      await getUnitSelect()
        .locator("option", { hasText: label })
        .waitFor({ state: "attached" });
    },
  };
};
