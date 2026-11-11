import { expect, type Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createLoginPage } from "../pages/Login.page";

export const expectRecoveredLogin = async (
  page: Page
): Promise<void> => {
  await expect(page).toHaveURL(
    (url) => url.pathname === PATHS.ACCESS.LOGIN,
    { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
  );
  await expect(
    createLoginPage(page).getPasswordRecoveredNotice()
  ).toBeVisible();
};
