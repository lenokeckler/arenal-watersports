import { test as base } from "@playwright/test";
import { createFirstSignInPage } from "../pages/FirstSignIn.page";
import { createPendingWorker } from "./createPendingWorker";
import type { PendingWorker } from "./models/PendingWorker.interface";
import { signInAsPendingWorker } from "./signInAsPendingWorker";

export const test = base.extend<{
  firstSignInPage: ReturnType<typeof createFirstSignInPage>;
  pendingWorker: PendingWorker;
}>({
  firstSignInPage: async (
    { page, pendingWorker },
    provide
  ) => {
    await signInAsPendingWorker(page, pendingWorker);
    await provide(createFirstSignInPage(page));
  },
  pendingWorker: async ({ context }, provide) => {
    const pendingWorker = await createPendingWorker();

    await provide(pendingWorker);
    await context.clearCookies();
    await pendingWorker.remove();
  },
});

export { expect } from "@playwright/test";
