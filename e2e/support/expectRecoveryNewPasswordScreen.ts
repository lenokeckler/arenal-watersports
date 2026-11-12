import { expect, type Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createPasswordRecoveryNewPasswordPage } from "../pages/PasswordRecoveryNewPassword.page";

export const expectRecoveryNewPasswordScreen = async (
  page: Page
): Promise<void> => {
  await expect(page).toHaveURL(
    (url) =>
      url.pathname === PATHS.ACCESS.RECOVERY_PASSWORD,
    { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
  );
  const newPasswordPage =
    createPasswordRecoveryNewPasswordPage(page);

  for (const element of newPasswordPage.getVisibleElements()) {
    await expect(element).toBeVisible();
  }
};
