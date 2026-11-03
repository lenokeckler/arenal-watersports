import { test as setup } from "@playwright/test";
import { E2E_AUTH_STORAGE_PATH } from "../constants/E2eRuntime.constants";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

setup(
  "authenticates the seeded administrator",
  async ({ page }) => {
    await signInAsSeededWorker(page);
    await page.context().storageState({
      path: E2E_AUTH_STORAGE_PATH,
    });
  }
);
