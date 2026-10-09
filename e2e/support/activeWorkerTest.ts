import { test as base, type Page } from "@playwright/test";
import { createActiveWorker } from "./createActiveWorker";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { signInAsActiveWorker } from "./signInAsActiveWorker";

export const test = base.extend<{
  activeWorker: ActiveWorker;
  signedInPage: Page;
}>({
  activeWorker: async ({ context }, provide) => {
    const activeWorker = await createActiveWorker();

    await provide(activeWorker);
    await context.clearCookies();
    await activeWorker.remove();
  },
  signedInPage: async ({ activeWorker, page }, provide) => {
    await signInAsActiveWorker(page, activeWorker);
    await provide(page);
  },
});

export { expect } from "@playwright/test";
