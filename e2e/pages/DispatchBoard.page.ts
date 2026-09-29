import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { DISPATCH_BOARD_COPY } from "@/app/components/dispatch-board/constants/DispatchBoard.constants";

export const createDispatchBoardPage = (page: Page) => {
  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.OPERATIONS.PENDING_DISPATCHES);
  };

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      name: DISPATCH_BOARD_COPY.HEADING,
      level: 1,
    });

  const getErrorMessage = (): Locator =>
    page
      .getByRole(ARIA_ROLE.ALERT)
      .filter({ hasText: DISPATCH_BOARD_COPY.ERROR });

  return {
    getErrorMessage,
    getHeading,
    goTo,
  };
};
