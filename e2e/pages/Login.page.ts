import type {
  Locator,
  Page,
  Request,
} from "@playwright/test";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import {
  ARIA_ROLE,
  PATHS,
  type SignInField,
} from "@/app/constants";
import {
  E2E_LOGIN_COPY,
  E2E_LOGIN_FIELD_ID,
} from "../constants/E2eLogin.constants";
import { getMainRegion } from "../support/mainRegion";

const createLoginLocators = (page: Page) => {
  const getFieldError = (field: SignInField): Locator =>
    getMainRegion(page).locator(
      `#${field}${FIELD_ERROR_ID_SUFFIX}`
    );

  return {
    getPasswordError: (): Locator =>
      getFieldError(E2E_LOGIN_FIELD_ID.PASSWORD),
    getPasswordInput: (): Locator =>
      getMainRegion(page).getByLabel(
        E2E_LOGIN_COPY.PASSWORD_LABEL,
        { exact: true }
      ),
    getSubmitButton: (): Locator =>
      getMainRegion(page).getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_LOGIN_COPY.SUBMIT,
      }),
    getUsernameInput: (): Locator =>
      getMainRegion(page).getByLabel(
        E2E_LOGIN_COPY.USERNAME_LABEL,
        { exact: true }
      ),
  };
};

const isLoginNavigation = (request: Request): boolean =>
  request.isNavigationRequest() &&
  new URL(request.url()).pathname === PATHS.ACCESS.LOGIN;

export const createLoginPage = (page: Page) => {
  const locators = createLoginLocators(page);

  return {
    ...locators,
    fillPassword: (password: string): Promise<void> =>
      locators.getPasswordInput().fill(password),
    fillUsername: (username: string): Promise<void> =>
      locators.getUsernameInput().fill(username),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.ACCESS.LOGIN);
    },
    submit: (): Promise<void> =>
      locators.getSubmitButton().click(),
    waitForSubmission: (): Promise<Request> =>
      page.waitForRequest(isLoginNavigation),
  };
};
