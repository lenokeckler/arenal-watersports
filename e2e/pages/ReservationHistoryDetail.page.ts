import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_HISTORY_HREF } from "@/app/features/board/reservation-history/constants/ReservationHistoryHref.constants";
import { E2E_RESERVATION_HISTORY_COPY } from "../constants/E2eReservationHistory.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationHistoryDetailPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const copy = E2E_RESERVATION_HISTORY_COPY;

  return {
    getBackLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: copy.BACK_TO_HISTORY,
      }),
    getCancellationBlock: (): Locator =>
      main
        .getByRole(ARIA_ROLE.HEADING, {
          name: copy.CANCELLATION_REASON_TITLE,
        })
        .locator(".."),
    getField: (label: string): Locator =>
      main.getByText(label, { exact: true }).locator(".."),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
      }),
    getNotFoundTitle: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: copy.NOT_FOUND_TITLE,
      }),
    getSignatureCard: (): Locator =>
      main
        .getByRole(ARIA_ROLE.HEADING, {
          name: copy.SIGNATURE_TITLE,
        })
        .locator(".."),
    goToRecord: async (id: string): Promise<void> => {
      await page.goto(
        `${PATHS.HISTORY.ROOT}${RESERVATION_HISTORY_HREF.PATH_SEPARATOR}${id}`
      );
    },
  };
};
