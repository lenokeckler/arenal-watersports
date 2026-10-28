import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  PASSWORD_RECOVERY_USERNAME_QUERY_PARAM,
  PATHS,
} from "@/app/constants";
import { E2E_RECOVERY_COPY } from "../constants/E2ePasswordRecovery.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createPasswordRecoveryResetPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getInput = (label: string): Locator =>
    main.getByLabel(label, { exact: true });
  const getLink = (name: string): Locator =>
    main.getByRole(ARIA_ROLE.LINK, { name, exact: true });
  const getSubmitButton = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_RECOVERY_COPY.RESET_SUBMIT,
      exact: true,
    });
  const getHeading = (): Locator =>
    main.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.SCREEN,
      name: E2E_RECOVERY_COPY.RESET_HEADING,
    });
  const getNotice = (): Locator =>
    main.getByRole(ARIA_ROLE.STATUS).filter({
      hasText: E2E_RECOVERY_COPY.CONFIRMATION,
    });
  const getNotReceivedNote = (): Locator =>
    main.getByText(E2E_RECOVERY_COPY.NOT_RECEIVED_NOTE);
  const getNoEmailNote = (): Locator =>
    main.getByText(E2E_RECOVERY_COPY.NO_EMAIL_NOTE);
  const getAnotherPinLink = (): Locator =>
    getLink(E2E_RECOVERY_COPY.REQUEST_ANOTHER_PIN);
  const getBackLink = (): Locator =>
    getLink(E2E_RECOVERY_COPY.BACK);
  const getUsernameInput = (): Locator =>
    getInput(E2E_RECOVERY_COPY.USERNAME_LABEL);
  const getPinInput = (): Locator =>
    getInput(E2E_RECOVERY_COPY.PIN_LABEL);
  const getNewPasswordInput = (): Locator =>
    getInput(E2E_RECOVERY_COPY.NEW_PASSWORD_LABEL);
  const getConfirmPasswordInput = (): Locator =>
    getInput(E2E_RECOVERY_COPY.CONFIRM_PASSWORD_LABEL);

  return {
    getAnotherPinLink,
    getBackLink,
    getConfirmPasswordInput,
    getHeading,
    getNewPasswordInput,
    getNoEmailNote,
    getNotReceivedNote,
    getNotice,
    getPinInput,
    getSubmitButton,
    getUsernameInput,
    getVisibleElements: (): Locator[] => [
      getHeading(),
      getNotice(),
      getUsernameInput(),
      getPinInput(),
      getNewPasswordInput(),
      getConfirmPasswordInput(),
      getSubmitButton(),
      getNoEmailNote(),
      getNotReceivedNote(),
      getAnotherPinLink(),
      getBackLink(),
    ],
    goTo: async (username: string): Promise<void> => {
      const query = new URLSearchParams({
        [PASSWORD_RECOVERY_USERNAME_QUERY_PARAM]: username,
      });
      await page.goto(
        `${PATHS.ACCESS.RECOVERY_RESET}?${query}`
      );
    },
  };
};
