import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { DISPATCH_BOARD_COPY } from "@/app/components/dispatch-board/constants/DispatchBoard.constants";
import { getDispatchPageHref } from "@/app/components/dispatch-board/utils/getDispatchPageHref";
import { getMainRegion } from "../support/mainRegion";

export const createDispatchBoardPage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getEmptyMessage: (): Locator =>
      main.getByText(DISPATCH_BOARD_COPY.EMPTY),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: DISPATCH_BOARD_COPY.HEADING,
      }),
    getNextLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: DISPATCH_BOARD_COPY.NEXT_PAGE,
      }),
    getPreviousLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: DISPATCH_BOARD_COPY.PREVIOUS_PAGE,
      }),
    getReservation: (customerName: string): Locator =>
      main
        .getByRole(ARIA_ROLE.LISTITEM)
        .filter({ hasText: customerName }),
    getReservations: (): Locator =>
      main.getByRole(ARIA_ROLE.LISTITEM),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.PENDING_DISPATCHES);
    },
    goToPage: async (pageNumber: number): Promise<void> => {
      await page.goto(getDispatchPageHref(pageNumber));
    },
  };
};
