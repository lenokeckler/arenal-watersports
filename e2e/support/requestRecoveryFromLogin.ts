import { expect, type Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { createLoginPage } from "../pages/Login.page";
import { submitRecoveryRequest } from "./submitRecoveryRequest";

export const requestRecoveryFromLogin = async (
  page: Page,
  username: string
): Promise<void> => {
  const loginPage = createLoginPage(page);

  await loginPage.goTo();
  await loginPage.getForgotPasswordLink().click();
  await expect(page).toHaveURL(PATHS.ACCESS.RECOVERY);
  await submitRecoveryRequest(page, username);
};
