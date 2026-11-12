import type { Locator, Page } from "@playwright/test";
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
  };
};
