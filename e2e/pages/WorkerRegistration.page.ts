import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import {
  E2E_TEMPORARY_PASSWORD_SIBLING,
  E2E_WORKER_REGISTRATION_COPY,
} from "../constants/E2eWorkerRegistration.constants";
import { getMainRegion } from "../support/mainRegion";
import type { E2eNewWorker } from "../support/models/E2eNewWorker.interface";

export const createWorkerRegistrationPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const locators = {
    getBaseRoleSelect: (): Locator =>
      main.getByLabel(
        E2E_WORKER_REGISTRATION_COPY.BASE_ROLE_LABEL,
        {
          exact: true,
        }
      ),
    getFullNameInput: (): Locator =>
      main.getByLabel(
        E2E_WORKER_REGISTRATION_COPY.FULL_NAME_LABEL,
        {
          exact: true,
        }
      ),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
      }),
    getMessage: (message: string): Locator =>
      main.getByText(message, { exact: true }),
    getRegisteredNotice: (
      fullName: string,
      username: string
    ): Locator =>
      main.getByRole(ARIA_ROLE.STATUS).filter({
        hasText:
          E2E_WORKER_REGISTRATION_COPY.REGISTERED_NOTICE(
            fullName,
            username
          ),
      }),
    getSubmitButton: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_WORKER_REGISTRATION_COPY.SUBMIT,
        exact: true,
      }),
    getTemporaryPassword: (): Locator =>
      main
        .getByText(
          E2E_WORKER_REGISTRATION_COPY.TEMPORARY_PASSWORD_LABEL,
          { exact: true }
        )
        .locator(E2E_TEMPORARY_PASSWORD_SIBLING),
    getUsernameInput: (): Locator =>
      main.getByLabel(
        E2E_WORKER_REGISTRATION_COPY.USERNAME_LABEL,
        {
          exact: true,
        }
      ),
  };

  return {
    ...locators,
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.ADMINISTRATION.WORKERS_NEW);
    },
    register: async ({
      baseRole,
      fullName,
      username,
    }: E2eNewWorker): Promise<void> => {
      await locators.getFullNameInput().fill(fullName);
      await locators.getUsernameInput().fill(username);
      await locators
        .getBaseRoleSelect()
        .selectOption(baseRole);
      await locators.getSubmitButton().click();
    },
    submit: (): Promise<void> =>
      locators.getSubmitButton().click(),
  };
};
