import type { Page } from "@playwright/test";
import { test as base } from "./activeWorkerTest";
import { createPendingDepositsFixture } from "./createPendingDepositsFixture";
import type { PendingDepositsFixture } from "./models/PendingDepositsFixture.interface";
import { signInToReservationsMode } from "./signInToReservationsMode";

export const test = base.extend<{
  pendingDeposits: PendingDepositsFixture;
  reservationsPage: Page;
}>({
  pendingDeposits: async ({ activeWorker }, provide) => {
    const { fixture, remove } =
      await createPendingDepositsFixture(activeWorker.id);

    await provide(fixture);
    await remove();
  },
  reservationsPage: async (
    { activeWorker, page },
    provide
  ) => {
    await signInToReservationsMode(page, activeWorker);
    await provide(page);
  },
});

export { expect } from "./activeWorkerTest";
