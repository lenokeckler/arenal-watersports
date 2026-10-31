import type { Page } from "@playwright/test";
import { createPasswordRecoveryNewPasswordPage } from "../pages/PasswordRecoveryNewPassword.page";
import { expectRecoveredLogin } from "./expectRecoveredLogin";

export const saveRecoveryPassword = async (
  page: Page,
  password: string
): Promise<void> => {
  const newPasswordPage =
    createPasswordRecoveryNewPasswordPage(page);

  await newPasswordPage.fillForm({
    confirmPassword: password,
    newPassword: password,
  });
  await newPasswordPage.submit();
  await expectRecoveredLogin(page);
};
