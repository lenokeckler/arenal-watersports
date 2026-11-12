import type { Page } from "@playwright/test";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";

export const requestRecoveryPin = async (
  page: Page,
  username: string
): Promise<void> => {
  const requestPage =
    createPasswordRecoveryRequestPage(page);
  await requestPage.goTo();
  await requestPage.fillUsername(username);
  await requestPage.submit();
};
