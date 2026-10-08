import { test as base } from "@playwright/test";
import { createPendingWorker } from "./createPendingWorker";
import type { PendingWorker } from "./models/PendingWorker.interface";

export const test = base.extend<{
  pendingWorker: PendingWorker;
}>({
  pendingWorker: async ({ context }, provide) => {
    const pendingWorker = await createPendingWorker();

    await provide(pendingWorker);
    await context.clearCookies();
    await pendingWorker.remove();
  },
});

export { expect } from "@playwright/test";
