import { readRecoveryAddress } from "./readRecoveryAddress";
import type { Page } from "@playwright/test";
import { expectRecoveryResetScreen } from "./expectRecoveryResetScreen";
import type { RecoveryAccount } from "./models/RecoveryAccount.interface";
import { readDeliveredRecoveryPin } from "./readDeliveredRecoveryPin";
import { requestRecoveryPin } from "./requestRecoveryPin";

export const requestAndReadRecoveryPin = async (
  page: Page,
  account: RecoveryAccount
): Promise<string> => {
  await requestRecoveryPin(page, account.username);
  await expectRecoveryResetScreen(page, account.username);

  return readDeliveredRecoveryPin(
    readRecoveryAddress(account)
  );
};
