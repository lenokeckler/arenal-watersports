import type { Locator, Page } from "@playwright/test";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormTypePage = (
  page: Page
) => {
  const main = getMainRegion(page);

  const getReservationTypeRadio = (
    label: string
  ): Locator => main.getByLabel(label, { exact: false });

  return {
    getReservationTypeDescription: (
      description: string
    ): Locator =>
      main.getByText(description, { exact: true }),
    getReservationTypeRadio,
    selectReservationType: async (
      label: string
    ): Promise<void> => {
      await main.getByText(label, { exact: true }).click();
    },
  };
};
