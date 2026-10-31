import type { Page } from "@playwright/test";
import { E2E_RECOVERY_PASSWORDS } from "../constants/E2ePasswordRecoveryPin.constants";
import type { RecoveryAccount } from "./models/RecoveryAccount.interface";
import { requestAndReadRecoveryPin } from "./requestAndReadRecoveryPin";
import { saveRecoveryPassword } from "./saveRecoveryPassword";
import { submitRecoveryPin } from "./submitRecoveryPin";

export const recoverPassword = async (
  page: Page,
  account: RecoveryAccount,
  newPassword: string = E2E_RECOVERY_PASSWORDS.NEW
): Promise<string> => {
  const pin = await requestAndReadRecoveryPin(
    page,
    account
  );

  await submitRecoveryPin(page, pin);
  await saveRecoveryPassword(page, newPassword);

  return pin;
};
