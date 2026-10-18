import { test as base, type Page } from "@playwright/test";
import type { NullableRef } from "@/app/types";
import { createActiveWorker } from "./createActiveWorker";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { signInAsActiveWorker } from "./signInAsActiveWorker";

export const test = base.extend<{
  activeWorker: ActiveWorker;
  personalEmail: NullableRef<string>;
  signedInPage: Page;
}>({
  activeWorker: async (
    { context, personalEmail },
    provide
  ) => {
    const activeWorker = await createActiveWorker({
      personalEmail,
    });

    await provide(activeWorker);
    await context.clearCookies();
    await activeWorker.remove();
  },
  personalEmail: [null, { option: true }],
  signedInPage: async ({ activeWorker, page }, provide) => {
    await signInAsActiveWorker(page, activeWorker);
    await provide(page);
  },
});

export { expect } from "@playwright/test";
