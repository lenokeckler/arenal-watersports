import type { Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { createLoginPage } from "../pages/Login.page";

export const signInWithCredentials = async (
  page: Page,
  username: string,
  password: string
): Promise<void> => {
  const loginPage = createLoginPage(page);

  await loginPage.goTo();
  await loginPage.fillUsername(username);
  await loginPage.fillPassword(password);
  await loginPage.submit();
  await page.waitForURL(PATHS.BOARD);
};
