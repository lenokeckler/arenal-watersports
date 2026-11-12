import type { Locator, Page } from "@playwright/test";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import {
  ARIA_ROLE,
  PASSWORD_RECOVERY_FIELD,
  PATHS,
} from "@/app/constants";
import { E2E_RECOVERY_COPY } from "../constants/E2ePasswordRecovery.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createPasswordRecoveryRequestPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getUsernameInput = (): Locator =>
    main.getByLabel(E2E_RECOVERY_COPY.USERNAME_LABEL, {
      exact: true,
    });
  const getSubmitButton = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_RECOVERY_COPY.REQUEST_SUBMIT,
      exact: true,
    });

  return {
    fillUsername: (username: string): Promise<void> =>
      getUsernameInput().fill(username),
    getBackLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: E2E_RECOVERY_COPY.BACK,
      }),
    getBanner: (): Locator =>
      main.getByRole(ARIA_ROLE.ALERT),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.SCREEN,
        name: E2E_RECOVERY_COPY.REQUEST_HEADING,
      }),
    getNoEmailNote: (): Locator =>
      main.getByText(E2E_RECOVERY_COPY.NO_EMAIL_NOTE),
    getSubmitButton,
    getUsernameError: (): Locator =>
      main.locator(
        `#${PASSWORD_RECOVERY_FIELD.USERNAME}${FIELD_ERROR_ID_SUFFIX}`
      ),
    getUsernameInput,
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.ACCESS.RECOVERY);
    },
    submit: (): Promise<void> => getSubmitButton().click(),
  };
};
