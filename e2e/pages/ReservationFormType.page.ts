import type { Locator, Page } from "@playwright/test";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormTypePage = (
  page: Page
) => {
  const mainRegion = getMainRegion(page);
  const getReservationTypeRadio = (label: string) =>
    mainRegion.getByRole("radio", { name: label });

  return {
    getGuideCheckbox: (name: string): Locator =>
      mainRegion.getByLabel(name, { exact: true }),
    getGuideLabel: (name: string): Locator =>
      mainRegion.getByText(name, { exact: true }),
    getGuideNoSelectionWarning: (): Locator =>
      mainRegion.getByText(
        RESERVATION_FORM_UI_COPY.GUIDES_NO_SELECTION_WARNING,
        { exact: true }
      ),
    getGuideAlignmentOffset: async (
      name: string
    ): Promise<number> => {
      const [checkboxBounds, labelBounds] =
        await Promise.all([
          mainRegion
            .getByLabel(name, { exact: true })
            .boundingBox(),
          mainRegion
            .getByText(name, { exact: true })
            .boundingBox(),
        ]);

      if (!checkboxBounds || !labelBounds) {
        return Number.POSITIVE_INFINITY;
      }

      const checkboxCenter =
        checkboxBounds.y + checkboxBounds.height / 2;
      const labelCenter =
        labelBounds.y + labelBounds.height / 2;

      return Math.abs(checkboxCenter - labelCenter);
    },
    getReservationTypeRadio,
    getReservationTypeDescription: (description: string) =>
      mainRegion.getByText(description, { exact: true }),
    selectReservationType: async (
      label: string
    ): Promise<void> => {
      await getReservationTypeRadio(label)
        .locator("..")
        .click();
    },
    selectGuide: async (name: string): Promise<void> => {
      await mainRegion
        .getByLabel(name, { exact: true })
        .check();
    },
    scrollToGuideNoSelectionWarning:
      async (): Promise<void> => {
        await mainRegion
          .getByText(
            RESERVATION_FORM_UI_COPY.GUIDES_NO_SELECTION_WARNING,
            { exact: true }
          )
          .scrollIntoViewIfNeeded();
      },
  };
};
