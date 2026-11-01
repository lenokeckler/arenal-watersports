import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { E2E_WORK_MODE_COPY } from "../constants/E2eWorkMode.constants";

export const createWorkModePage = (page: Page) => ({
  getCard: (areaLabel: string): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(areaLabel),
    }),
  getCurrentBadge: (): Locator =>
    page.getByText(E2E_WORK_MODE_COPY.CURRENT, {
      exact: true,
    }),
  getSwitch: (areaLabel: string): Locator =>
    page.getByText(
      E2E_WORK_MODE_COPY.SWITCH_LABEL(areaLabel),
      {
        exact: true,
      }
    ),
  getSwitchLink: (): Locator =>
    page.getByRole(ARIA_ROLE.LINK, {
      name: E2E_WORK_MODE_COPY.SWITCH,
    }),
  goTo: async (): Promise<void> => {
    await page.goto(PATHS.MODE);
  },
});
