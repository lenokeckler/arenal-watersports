import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import {
  E2E_PROFILE_COPY,
  E2E_PROFILE_NOTICE_PATH,
} from "../constants/E2eProfile.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createProfilePage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
        name: E2E_PROFILE_COPY.PROFILE_HEADING,
      }),
    findText: (text: string): Locator =>
      main.getByText(text),
    getEmailEntry: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: E2E_PROFILE_COPY.PERSONAL_EMAIL_ENTRY,
      }),
    getNotice: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS),
    getPasswordEntry: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: E2E_PROFILE_COPY.PASSWORD_ENTRY,
        exact: true,
      }),
    goToEmailEntry: (): Promise<void> =>
      main
        .getByRole(ARIA_ROLE.LINK, {
          name: E2E_PROFILE_COPY.PERSONAL_EMAIL_ENTRY,
        })
        .click(),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.PROFILE.ROOT);
    },
    goToWithPasswordChangedNotice:
      async (): Promise<void> => {
        await page.goto(E2E_PROFILE_NOTICE_PATH);
      },
  };
};
