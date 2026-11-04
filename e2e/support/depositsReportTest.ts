import type { Page } from "@playwright/test";
import { test as base } from "./activeWorkerTest";
import { createDepositsReportFixture } from "./createDepositsReportFixture";
import type { DepositsReportFixture } from "./models/DepositsReportFixture.interface";
import { signInAsSeededWorker } from "./signInAsSeededWorker";
import { signInToReservationsMode } from "./signInToReservationsMode";

export const test = base.extend<{
  administratorPage: Page;
  depositsReport: DepositsReportFixture;
  reservationsPage: Page;
}>({
  administratorPage: async ({ page }, provide) => {
    await signInAsSeededWorker(page);
    await provide(page);
  },
  depositsReport: async ({ activeWorker }, provide) => {
    const { fixture, remove } =
      await createDepositsReportFixture(activeWorker.id);

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
