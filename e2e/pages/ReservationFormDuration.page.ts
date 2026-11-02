import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormDurationPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getCustomDurationInput = (): Locator =>
    main.getByLabel(
      E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION,
      {
        exact: false,
      }
    );

  return {
    getDurationButton: (label: string): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: label,
        exact: true,
      }),
    getDurationInput: getCustomDurationInput,
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
    typeCustomDuration: async (
      value: string
    ): Promise<void> => {
      await getCustomDurationInput().pressSequentially(
        value
      );
    },
  };
};
