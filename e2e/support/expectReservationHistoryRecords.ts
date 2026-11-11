import { expect } from "@playwright/test";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import type { createReservationHistoryPage } from "../pages/ReservationHistory.page";

export const expectReservationHistoryRecords = async (
  historyPage: ReturnType<
    typeof createReservationHistoryPage
  >,
  visible: readonly string[],
  hidden: readonly string[]
): Promise<void> => {
  for (const name of visible) {
    await expect(historyPage.getRecord(name)).toBeVisible();
  }

  for (const name of hidden) {
    await expect(historyPage.getRecord(name)).toHaveCount(
      E2E_COUNT.NONE
    );
  }
};
