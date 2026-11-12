import type { Page } from "@playwright/test";
import { createPasswordRecoveryNewPasswordPage } from "../pages/PasswordRecoveryNewPassword.page";
import { expectRecoveredLogin } from "./expectRecoveredLogin";
import { submitRecoveryPin } from "./submitRecoveryPin";

export const resetPasswordWithPin = async (
  page: Page,
  pin: string,
  newPassword: string
): Promise<void> => {
  const newPasswordPage =
    createPasswordRecoveryNewPasswordPage(page);

  await submitRecoveryPin(page, pin);
  await newPasswordPage.fillForm({
    confirmPassword: newPassword,
    newPassword,
  });
  await newPasswordPage.submit();
  await expectRecoveredLogin(page);
};
