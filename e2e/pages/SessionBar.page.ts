import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { getMainRegion } from "../support/mainRegion";
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

  const getAllLogoutButtons = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_LOGOUT_COPY.BUTTON,
    });

  return {
    getAllLogoutButtons,
    getBar,
    addOverflow: (
      viewportMultiple: number
    ): Promise<void> =>
      getMainRegion(page).evaluate((main, multiple) => {
        const spacer = document.createElement("div");
        spacer.style.height = `${window.innerHeight * multiple}px`;
        main.appendChild(spacer);
      }, viewportMultiple),
    readScrollOffset: (): Promise<number> =>
      page.evaluate(() => window.scrollY),
    scrollToBottom: (): Promise<void> =>
      page.evaluate(() =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
        })
      ),
    getIdleButton,
    getConfirmButton,
    press: (): Promise<void> => getIdleButton().click(),
    confirmSignOut: (): Promise<void> =>
      getConfirmButton().click(),
  };
};
