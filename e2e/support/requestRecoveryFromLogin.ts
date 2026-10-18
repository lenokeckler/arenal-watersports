import { expect, type Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { createLoginPage } from "../pages/Login.page";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";
import { expectRecoveryResetScreen } from "./expectRecoveryResetScreen";

export const requestRecoveryFromLogin = async (
  page: Page,
  username: string
): Promise<void> => {
  const loginPage = createLoginPage(page);
  const requestPage =
    createPasswordRecoveryRequestPage(page);

  await loginPage.goTo();
  await loginPage.getForgotPasswordLink().click();
  await expect(page).toHaveURL(PATHS.ACCESS.RECOVERY);
  await requestPage.fillUsername(username);
  await requestPage.submit();
  await expectRecoveryResetScreen(page, username);
};
