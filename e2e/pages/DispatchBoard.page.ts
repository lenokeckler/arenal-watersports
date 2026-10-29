import type { Page } from "@playwright/test";
import { PATHS } from "@/app/constants";

export const createDispatchBoardPage = (page: Page) => {
  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.OPERATIONS.PENDING_DISPATCHES);
  };

  return {
    goTo,
  };
};
