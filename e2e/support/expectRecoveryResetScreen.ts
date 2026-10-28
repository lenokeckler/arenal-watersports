import { expect, type Page } from "@playwright/test";
import {
  PASSWORD_RECOVERY_USERNAME_QUERY_PARAM,
  PATHS,
} from "@/app/constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createPasswordRecoveryResetPage } from "../pages/PasswordRecoveryReset.page";

export const expectRecoveryResetScreen = async (
  page: Page,
  username: string
): Promise<void> => {
  await expect(page).toHaveURL(
    (url) =>
      url.pathname === PATHS.ACCESS.RECOVERY_RESET &&
      url.searchParams.get(
        PASSWORD_RECOVERY_USERNAME_QUERY_PARAM
      ) === username,
    { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
  );
  const resetPage = createPasswordRecoveryResetPage(page);

  for (const element of resetPage.getVisibleElements()) {
    await expect(element).toBeVisible();
  }

  await expect(resetPage.getUsernameInput()).toHaveValue(
    username
  );
};
