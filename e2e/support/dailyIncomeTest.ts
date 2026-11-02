import type { Page } from "@playwright/test";
import { test as base } from "./activeWorkerTest";
import { createDailyIncomeFixture } from "./createDailyIncomeFixture";
import type { DailyIncomeFixture } from "./models/DailyIncomeFixture.interface";
import { signInToReservationsMode } from "./signInToReservationsMode";

export const test = base.extend<{
  dailyIncome: DailyIncomeFixture;
  reservationsPage: Page;
}>({
  dailyIncome: async ({ activeWorker }, provide) => {
    const { fixture, remove } =
      await createDailyIncomeFixture(activeWorker.id);

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
