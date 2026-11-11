import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { E2E_RESERVATIONS_BY_WORKER_COPY } from "../constants/E2eReservationsByWorker.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationsByWorkerPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const locators = {
    getCreatorInCustomerRecord: (
      customerName: string,
      workerName: string
    ): Locator =>
      main
        .getByText(
          E2E_RESERVATIONS_BY_WORKER_COPY.CUSTOMER(
            customerName
          ),
          { exact: true }
        )
        .locator("..")
        .getByText(
          E2E_RESERVATIONS_BY_WORKER_COPY.RECORDED_BY(
            workerName
          ),
          { exact: true }
        ),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
      }),
    getNextPage: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: E2E_RESERVATIONS_BY_WORKER_COPY.NEXT_PAGE,
      }),
    getPageIndicator: (): Locator =>
      main.getByText(/^Página 2 de/),
  };

  return {
    ...locators,
    goTo: async (): Promise<void> => {
      await page.goto(
        PATHS.ADMINISTRATION.RESERVATIONS_BY_WORKER
      );
    },
  };
};
