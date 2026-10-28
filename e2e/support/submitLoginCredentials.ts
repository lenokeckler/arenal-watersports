import type { Page } from "@playwright/test";
import { createLoginPage } from "../pages/Login.page";

export const submitLoginCredentials = async (
  page: Page,
  username: string,
  password: string
): Promise<void> => {
  const loginPage = createLoginPage(page);

  await loginPage.fillUsername(username);
  await loginPage.fillPassword(password);
  await loginPage.submit();
};
