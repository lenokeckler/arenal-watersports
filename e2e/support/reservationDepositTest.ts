import type { Page } from "@playwright/test";
import { test as base } from "./activeWorkerTest";
import { removeReservationDepositFixtures } from "./removeReservationDepositFixtures";
import { signInToReservationsMode } from "./signInToReservationsMode";

export const test = base.extend<{
  reservationsPage: Page;
}>({
  reservationsPage: async (
    { activeWorker, page },
    provide,
    testInfo
  ) => {
    await signInToReservationsMode(page, activeWorker);

    await provide(page);
    await removeReservationDepositFixtures(
      activeWorker,
      testInfo.project.name
    );
  },
});

export { expect } from "./activeWorkerTest";
