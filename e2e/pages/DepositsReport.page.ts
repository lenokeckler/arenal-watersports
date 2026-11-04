import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { DEPOSITS_REPORT_COPY } from "@/app/features/administration/deposits-report/constants/DepositsReportCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createDepositsReportPage = (page: Page) => {
  const main = getMainRegion(page);
  const getSection = (heading: string): Locator =>
    main.getByRole(ARIA_ROLE.REGION, {
      exact: true,
      name: heading,
    });
  const getPendingSection = (): Locator =>
    getSection(DEPOSITS_REPORT_COPY.PENDING_HEADING);
  const getRetainedSection = (): Locator =>
    getSection(DEPOSITS_REPORT_COPY.RETAINED_HEADING);
  const getRowIn = (
    section: Locator,
    customerName: string
  ): Locator =>
    section
      .getByRole(ARIA_ROLE.LISTITEM)
      .filter({ hasText: customerName });

  return {
    getMain: (): Locator => main,
    getPendingRow: (customerName: string): Locator =>
      getRowIn(getPendingSection(), customerName),
    getPendingSection,
    getRetainedRow: (customerName: string): Locator =>
      getRowIn(getRetainedSection(), customerName),
    getRetainedSection,
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.ADMINISTRATION.DEPOSITS);
    },
    readRetainedOrder: async (
      customerNames: readonly string[]
    ): Promise<string[]> => {
      const rows = await getRetainedSection()
        .getByRole(ARIA_ROLE.LISTITEM)
        .allTextContents();

      return rows.flatMap((row) =>
        customerNames.filter((name) => row.includes(name))
      );
    },
  };
};
