import type { Locator, Page } from "@playwright/test";
import { E2E_EQUIPMENT_HOURS } from "../constants/E2eEquipmentHours.constants";

export const createEquipmentHoursPage = (page: Page) => ({
  getHeading: (): Locator =>
    page.getByRole("heading", {
      name: E2E_EQUIPMENT_HOURS.HEADING,
    }),
  getUnitRow: (): Locator =>
    page
      .getByRole("listitem")
      .filter({ hasText: E2E_EQUIPMENT_HOURS.UNIT_CODE })
      .filter({ hasText: E2E_EQUIPMENT_HOURS.ROW_VALUE }),
  goTo: async (): Promise<void> => {
    await page.goto(E2E_EQUIPMENT_HOURS.PATH);
  },
});
