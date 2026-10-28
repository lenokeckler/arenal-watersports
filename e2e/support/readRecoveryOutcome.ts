import type { Page } from "@playwright/test";
import { E2E_RECOVERY_OUTCOME } from "../constants/E2ePasswordRecoveryReset.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createLoginPage } from "../pages/Login.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import type { RecoveryOutcome } from "./models/RecoveryOutcome.type";

export const readRecoveryOutcome = async (
  page: Page
): Promise<RecoveryOutcome> => {
  const recoveredNotice =
    createLoginPage(page).getPasswordRecoveredNotice();
  const pinError =
    createPasswordRecoveryResetPage(page).getPinError();

  await recoveredNotice
    .or(pinError)
    .waitFor({ timeout: E2E_TIMEOUT_MS.POST_SUBMIT });

  return (await recoveredNotice.isVisible())
    ? E2E_RECOVERY_OUTCOME.RECOVERED
    : E2E_RECOVERY_OUTCOME.REFUSED;
};
