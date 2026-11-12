import { test as base } from "@playwright/test";
import { E2E_ADMIN_RESTORE_ATTACHMENT } from "../constants/E2eAdminRecovery.constants";
import type { AdminRecoveryTestFixtures } from "./models/AdminRecoveryTestFixtures.interface";
import { readSeededAdmin } from "./readSeededAdmin";
import { restoreSeededAdmin } from "./restoreSeededAdmin";

export const test = base.extend<AdminRecoveryTestFixtures>({
  seededAdmin: [
    async ({ context }, provide, testInfo) => {
      const admin = await readSeededAdmin();

      await restoreSeededAdmin(admin);
      await provide(admin);
      await context.clearCookies();
      try {
        await restoreSeededAdmin(admin);
      } catch (error) {
        if (testInfo.status !== testInfo.expectedStatus) {
          await testInfo.attach(
            E2E_ADMIN_RESTORE_ATTACHMENT.NAME,
            {
              body: String(error),
              contentType:
                E2E_ADMIN_RESTORE_ATTACHMENT.CONTENT_TYPE,
            }
          );
          return;
        }
        throw error;
      }
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
