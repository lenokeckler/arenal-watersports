import type { Page } from "@playwright/test";
import { createLoginPage } from "../pages/Login.page";
import type { ActiveWorker } from "./models/ActiveWorker.interface";

export const submitActiveWorkerSignIn = async (
  page: Page,
  activeWorker: ActiveWorker
): Promise<void> => {
  const loginPage = createLoginPage(page);

  await loginPage.goTo();
  await loginPage.fillUsername(activeWorker.username);
  await loginPage.fillPassword(activeWorker.password);
  await loginPage.submit();
};
