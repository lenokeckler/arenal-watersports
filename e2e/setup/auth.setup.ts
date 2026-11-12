import { test as setup } from "@playwright/test";
import { E2E_AUTH_STORAGE_PATH } from "../constants/E2eRuntime.constants";
import { authenticateInventoryUser } from "../support/authenticateInventoryUser";

setup(
  "authenticates the seeded administrator",
  async ({ page }) => {
    await authenticateInventoryUser(page);
    await page.context().storageState({
      path: E2E_AUTH_STORAGE_PATH,
    });
  }
);
