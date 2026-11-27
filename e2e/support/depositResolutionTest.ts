import type { Page } from "@playwright/test";
import { test as base } from "./activeWorkerTest";
import { removeDepositResolutionFixtures } from "./removeDepositResolutionFixtures";
import { signInToReservationsMode } from "./signInToReservationsMode";

export const test = base.extend<{
  reservationsPage: Page;
}>({
  reservationsPage: async (
    { activeWorker, page },
    provide
  ) => {
    await signInToReservationsMode(page, activeWorker);

    await provide(page);
    await removeDepositResolutionFixtures(activeWorker);
  },
});

export { expect } from "./activeWorkerTest";
