import type { Page } from "@playwright/test";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { expectRecoveredLogin } from "./expectRecoveredLogin";

export const resetPasswordWithPin = async (
  page: Page,
  pin: string,
  newPassword: string
): Promise<void> => {
  const resetPage = createPasswordRecoveryResetPage(page);

  await resetPage.fillForm({
    confirmPassword: newPassword,
    newPassword,
    pin,
  });
  await resetPage.submit();
  await expectRecoveredLogin(page);
};
