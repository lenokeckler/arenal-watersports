import { test as base, type Page } from "@playwright/test";
import type { NullableRef } from "@/app/types";
import { createActiveWorker } from "./createActiveWorker";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import type { SecondDeviceSession } from "./models/SecondDeviceSession.interface";
import { signInAsActiveWorker } from "./signInAsActiveWorker";
import { withSecondContext } from "./withSecondContext";

export const test = base.extend<{
  activeWorker: ActiveWorker;
  personalEmail: NullableRef<string>;
  secondDevice: SecondDeviceSession;
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
  secondDevice: async (
    { activeWorker, baseURL, browser },
    provide,
    testInfo
  ) => {
    await withSecondContext(
      browser,
      { ...testInfo.project.use, baseURL },
      async (context) => {
        const page = await context.newPage();
        await signInAsActiveWorker(page, activeWorker);
        await provide({ context, page });
      }
    );
  },
  signedInPage: async ({ activeWorker, page }, provide) => {
    await signInAsActiveWorker(page, activeWorker);
    await provide(page);
  },
});

export { expect } from "@playwright/test";
