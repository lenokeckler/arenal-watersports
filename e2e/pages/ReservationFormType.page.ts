import type { Locator, Page } from "@playwright/test";
import { CUSTOM_COMBO_FORM_COPY } from "@/app/features/reservations/reservation-form/constants/CustomComboFormCopy.constants";
import { RESERVATION_TYPE_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationTypeCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormTypePage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const reservationTypeGroup = main.getByRole("group", {
    name: RESERVATION_TYPE_COPY.LABEL,
  });

  const getReservationTypeRadio = (
    label: string
  ): Locator => main.getByLabel(label, { exact: false });
  return {
    getGuideCheckbox: (name: string): Locator =>
      main.getByLabel(name, { exact: true }),
    getCustomComboSelectionRegion: (): Locator =>
      main.getByRole("region", {
        name: CUSTOM_COMBO_FORM_COPY.TITLE,
      }),
    getReservationTypeDescription: (
      description: string
    ): Locator =>
      main.getByText(description, { exact: true }),
    getReservationTypeRadio,
    selectReservationType: async (
      label: string
    ): Promise<void> => {
      await reservationTypeGroup
        .getByText(label, { exact: true })
        .click();
    },
    selectGuide: async (name: string): Promise<void> => {
      await main.getByLabel(name, { exact: true }).check();
    },
  };
};
