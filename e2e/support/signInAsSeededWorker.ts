import type { Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import { createLoginPage } from "../pages/Login.page";

export const signInAsSeededWorker = async (
  page: Page
): Promise<void> => {
  const loginPage = createLoginPage(page);

  await loginPage.goTo();
  await loginPage.fillUsername(E2E_LOGIN_ACCOUNT.USERNAME);
  await loginPage.fillPassword(E2E_LOGIN_ACCOUNT.PASSWORD);
  await loginPage.submit();
  await page.waitForURL(PATHS.BOARD);
};
