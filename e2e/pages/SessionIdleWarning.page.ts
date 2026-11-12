import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { E2E_SESSION_IDLE_WARNING_COPY } from "../constants/E2eSessionIdleWarning.constants";

export const createSessionIdleWarningPage = (
  page: Page
) => {
  const getDialog = (): Locator =>
    page.getByRole(ARIA_ROLE.ALERT_DIALOG, {
      name: E2E_SESSION_IDLE_WARNING_COPY.TITLE,
    });

  const getKeepWorking = (): Locator =>
    getDialog().getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_SESSION_IDLE_WARNING_COPY.KEEP_WORKING,
    });

  const getSignOut = (): Locator =>
    getDialog().getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_SESSION_IDLE_WARNING_COPY.SIGN_OUT,
    });

  return { getDialog, getKeepWorking, getSignOut };
};
