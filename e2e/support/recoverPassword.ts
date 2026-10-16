import type { Page } from "@playwright/test";
import { E2E_RECOVERY_PASSWORDS } from "../constants/E2ePasswordRecoveryPin.constants";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { expectRecoveredLogin } from "./expectRecoveredLogin";
import type { RecoveryAccount } from "./models/RecoveryAccount.interface";
import { requestAndReadRecoveryPin } from "./requestAndReadRecoveryPin";

export const recoverPassword = async (
  page: Page,
  account: RecoveryAccount,
  newPassword: string = E2E_RECOVERY_PASSWORDS.NEW
): Promise<string> => {
  const resetPage = createPasswordRecoveryResetPage(page);
  const pin = await requestAndReadRecoveryPin(
    page,
    account
  );

  await resetPage.fillForm({
    confirmPassword: newPassword,
    newPassword,
    pin,
  });
  await resetPage.submit();
  await expectRecoveredLogin(page);

  return pin;
};
