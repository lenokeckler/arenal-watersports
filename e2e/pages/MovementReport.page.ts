import type { Locator, Page } from "@playwright/test";
import { E2E_MOVEMENT_REPORT } from "../constants/E2eMovementReport.constants";

export const createMovementReportPage = (page: Page) => ({
  getHeading: (): Locator =>
    page.getByRole("heading", {
      name: E2E_MOVEMENT_REPORT.HEADING,
    }),
  getMonthChart: (): Locator =>
    page
      .locator("section")
      .filter({ hasText: E2E_MOVEMENT_REPORT.MONTH_TITLE })
      .first(),
  getWeekdayRows: (): Locator =>
    page
      .locator("section")
      .filter({
        hasText: E2E_MOVEMENT_REPORT.WEEKDAY_TITLE,
      })
      .getByRole("listitem"),
  goTo: async (): Promise<void> => {
    await page.goto(E2E_MOVEMENT_REPORT.PATH);
  },
});
