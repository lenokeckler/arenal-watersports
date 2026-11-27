import type { Page } from "@playwright/test";
import type { PriceLookupFixture } from "../models/PriceLookupFixture.interface";
import { test as base } from "./activeWorkerTest";
import { addOperationsArea } from "./addOperationsArea";
import { addReservationsArea } from "./addReservationsArea";
import { createPriceLookupFixture } from "./createPriceLookupFixture";
import { signInAsActiveWorker } from "./signInAsActiveWorker";

export const test = base.extend<{
  operationsPage: Page;
  priceLookup: PriceLookupFixture;
  reservationsPage: Page;
}>({
  operationsPage: async (
    { activeWorker, page },
    provide
  ) => {
    await addOperationsArea(activeWorker.id);
    await signInAsActiveWorker(page, activeWorker);
    await provide(page);
  },
  priceLookup: async (
    { activeWorker },
    provide,
    testInfo
  ) => {
    const fixture = await createPriceLookupFixture(
      testInfo.project.name,
      activeWorker.id
    );

    await provide(fixture);
    await fixture.remove();
  },
  reservationsPage: async (
    { activeWorker, page },
    provide
  ) => {
    await addReservationsArea(activeWorker.id);
    await signInAsActiveWorker(page, activeWorker);
    await provide(page);
  },
});

export { expect } from "./activeWorkerTest";
