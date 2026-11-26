import type { Page } from "@playwright/test";
import { test as base } from "./activeWorkerTest";
import { removeReservationRefundFixtures } from "./removeReservationRefundFixtures";
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
    await removeReservationRefundFixtures(activeWorker);
  },
});

export { expect } from "./activeWorkerTest";
