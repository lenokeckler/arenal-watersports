import type { Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { createLoginPage } from "../pages/Login.page";
import type { PendingWorker } from "./models/PendingWorker.interface";

export const signInAsPendingWorker = async (
  page: Page,
  pendingWorker: PendingWorker
): Promise<void> => {
  const loginPage = createLoginPage(page);

  await loginPage.goTo();
  await loginPage.fillUsername(pendingWorker.username);
  await loginPage.fillPassword(
    pendingWorker.temporaryPassword
  );
  await loginPage.submit();
  await page.waitForURL(PATHS.ACCESS.FIRST_SIGN_IN);
};
