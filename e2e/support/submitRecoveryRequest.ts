import type { Page } from "@playwright/test";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";
import { expectRecoveryResetScreen } from "./expectRecoveryResetScreen";

export const submitRecoveryRequest = async (
  page: Page,
  username: string
): Promise<void> => {
  const requestPage =
    createPasswordRecoveryRequestPage(page);

  await requestPage.fillUsername(username);
  await requestPage.submit();
  await expectRecoveryResetScreen(page, username);
};
