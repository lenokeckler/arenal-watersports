import type { Page } from "@playwright/test";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";
import { expectRecoveryNewPasswordScreen } from "./expectRecoveryNewPasswordScreen";

export const submitRecoveryPin = async (
  page: Page,
  pin: string
): Promise<void> => {
  const resetPage = createPasswordRecoveryResetPage(page);

  await resetPage.fillPin(pin);
  await resetPage.submit();
  await expectRecoveryNewPasswordScreen(page);
};
