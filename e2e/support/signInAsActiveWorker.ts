import type { Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { createLoginPage } from "../pages/Login.page";
import type { ActiveWorker } from "./models/ActiveWorker.interface";

export const signInAsActiveWorker = async (
  page: Page,
  activeWorker: ActiveWorker
): Promise<void> => {
  const loginPage = createLoginPage(page);

  await loginPage.goTo();
  await loginPage.fillUsername(activeWorker.username);
  await loginPage.fillPassword(activeWorker.password);
  await loginPage.submit();
  await page.waitForURL(PATHS.HOME);
};
