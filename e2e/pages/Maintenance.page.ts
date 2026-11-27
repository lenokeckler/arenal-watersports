import type { Page } from "@playwright/test";
import { EQUIPMENT_PERIOD, PATHS } from "@/app/constants";
import { MAINTENANCE_COPY } from "@/app/features/operations/maintenance/constants/MaintenanceCopy.constants";
import { createMaintenanceLocators } from "./Maintenance.locators";

const { MONTH_KEY_LENGTH } = EQUIPMENT_PERIOD;

export const createMaintenancePage = (page: Page) => {
  const locators = createMaintenanceLocators(page);
  const goToQuery = async (
    query: string
  ): Promise<void> => {
    await page.goto(
      `${PATHS.OPERATIONS.MAINTENANCE}${query}`
    );
  };

  return {
    ...locators,
    goTo: () => goToQuery("?attend=open"),
    goToDay: (day: string) =>
      goToQuery(
        `?month=${day.slice(0, MONTH_KEY_LENGTH)}&day=${day}&panel=day`
      ),
    goToCalendar: () => goToQuery(""),
    openSummary: (): Promise<void> =>
      locators
        .getAction(MAINTENANCE_COPY.TABS.summary)
        .click(),
  };
};
