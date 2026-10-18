import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { E2E_LOGOUT_COPY } from "../constants/E2eLogout.constants";

export const createSessionBarPage = (page: Page) => {
  const getBar = (): Locator =>
    page.getByRole(ARIA_ROLE.BANNER);
  const getLogoutButton = (name: string): Locator =>
    getBar().getByRole(ARIA_ROLE.BUTTON, { name });
  const getIdleButton = (): Locator =>
    getLogoutButton(E2E_LOGOUT_COPY.BUTTON);
  const getConfirmButton = (): Locator =>
    getLogoutButton(E2E_LOGOUT_COPY.CONFIRM);

  return {
    getBar,
    getIdleButton,
    getConfirmButton,
    press: (): Promise<void> => getIdleButton().click(),
    confirmSignOut: (): Promise<void> =>
      getConfirmButton().click(),
  };
};
