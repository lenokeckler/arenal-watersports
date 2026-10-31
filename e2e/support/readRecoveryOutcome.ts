import type { Page } from "@playwright/test";
import { E2E_RECOVERY_OUTCOME } from "../constants/E2ePasswordRecoveryReset.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createPasswordRecoveryNewPasswordPage } from "../pages/PasswordRecoveryNewPassword.page";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import type { RecoveryOutcome } from "./models/RecoveryOutcome.type";

export const readRecoveryOutcome = async (
  page: Page
): Promise<RecoveryOutcome> => {
  const newPasswordHeading =
    createPasswordRecoveryNewPasswordPage(
      page
    ).getHeading();
  const pinError =
    createPasswordRecoveryResetPage(page).getPinError();

  await newPasswordHeading
    .or(pinError)
    .waitFor({ timeout: E2E_TIMEOUT_MS.POST_SUBMIT });

  return (await newPasswordHeading.isVisible())
    ? E2E_RECOVERY_OUTCOME.ACCEPTED
    : E2E_RECOVERY_OUTCOME.REFUSED;
};
