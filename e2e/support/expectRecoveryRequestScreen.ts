import { expect, type Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createPasswordRecoveryRequestPage } from "../pages/PasswordRecoveryRequest.page";

export const expectRecoveryRequestScreen = async (
  page: Page
): Promise<void> => {
  await expect(page).toHaveURL(
    (url) => url.pathname === PATHS.ACCESS.RECOVERY,
    { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
  );
  await expect(
    createPasswordRecoveryRequestPage(page).getHeading()
  ).toBeVisible();
};
