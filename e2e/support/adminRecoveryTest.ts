import { test as base } from "@playwright/test";
import type { AdminRecoveryTestFixtures } from "./models/AdminRecoveryTestFixtures.interface";
import { readSeededAdmin } from "./readSeededAdmin";
import { restoreSeededAdmin } from "./restoreSeededAdmin";

export const test = base.extend<AdminRecoveryTestFixtures>({
  seededAdmin: [
    async ({ context }, provide) => {
      const admin = await readSeededAdmin();

      await restoreSeededAdmin(admin);
      try {
        await provide(admin);
      } finally {
        await context.clearCookies();
        await restoreSeededAdmin(admin);
      }
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
