import type { Page } from "@playwright/test";
import { test as base } from "./activeWorkerTest";
import { createDepositsReportFixture } from "./createDepositsReportFixture";
import { createRetainedPagingFixture } from "./createRetainedPagingFixture";
import type { DepositsReportFixture } from "./models/DepositsReportFixture.interface";
import type { E2eSeededDeposit } from "./models/E2eSeededDeposit.interface";
import { signInAsSeededWorker } from "./signInAsSeededWorker";
import { signInToReservationsMode } from "./signInToReservationsMode";

export const test = base.extend<{
  administratorPage: Page;
  depositsReport: DepositsReportFixture;
  reservationsPage: Page;
  retainedPagingDeposits: E2eSeededDeposit[];
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
  retainedPagingDeposits: async (
    { activeWorker },
    provide
  ) => {
    const { fixture, remove } =
      await createRetainedPagingFixture(activeWorker.id);

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
