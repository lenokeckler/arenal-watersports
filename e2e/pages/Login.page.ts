import type {
  Locator,
  Page,
  Request,
} from "@playwright/test";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import {
  ARIA_ROLE,
  PATHS,
  SIGN_IN_NOTICE_QUERY_PARAM,
  type SignInField,
} from "@/app/constants";
import { E2E_RECOVERED_LOGIN_PATH } from "../constants/E2ePasswordRecoveryPin.constants";
import {
  E2E_LOGIN_COPY,
  E2E_LOGIN_FIELD_ID,
  E2E_SIGNED_OUT_LOGIN_PATH,
} from "../constants/E2eLogin.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

const getFieldErrorId = (field: SignInField): string =>
  `${field}${FIELD_ERROR_ID_SUFFIX}`;

const createLoginLocators = (page: Page) => {
  const main = getMainRegion(page);
  const getFieldError = (field: SignInField): Locator =>
    main.locator(`#${getFieldErrorId(field)}`);

  return {
    getBanner: (): Locator =>
      main.getByRole(ARIA_ROLE.ALERT),
    getForgotPasswordLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: E2E_LOGIN_COPY.FORGOT_PASSWORD,
        exact: true,
      }),
    getFormError: (): Locator =>
      main.getByRole(ARIA_ROLE.ALERT),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
      }),
    getRecoveryOfferLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: E2E_LOGIN_COPY.RECOVER_PASSWORD,
        exact: true,
      }),
    getPasswordRecoveredNotice: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS).filter({
        hasText: E2E_LOGIN_COPY.PASSWORD_RECOVERED_NOTICE,
      }),
    getPasswordError: (): Locator =>
      getFieldError(E2E_LOGIN_FIELD_ID.PASSWORD),
    getPasswordInput: (): Locator =>
      main.getByLabel(E2E_LOGIN_COPY.PASSWORD_LABEL, {
        exact: true,
      }),
    getPasswordToggle: (label: string): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: label,
        exact: true,
      }),
    getSignedOutNotice: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS).filter({
        hasText: E2E_LOGIN_COPY.SIGNED_OUT_NOTICE,
      }),
    getSubmitButton: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_LOGIN_COPY.SUBMIT,
      }),
    getUsernameError: (): Locator =>
      getFieldError(E2E_LOGIN_FIELD_ID.USERNAME),
    getUsernameInput: (): Locator =>
      main.getByLabel(E2E_LOGIN_COPY.USERNAME_LABEL, {
        exact: true,
      }),
  };
};

const buildLoginUrl = (noticeReason?: string): string => {
  if (noticeReason === undefined) {
    return PATHS.ACCESS.LOGIN;
  }
  const query = new URLSearchParams({
    [SIGN_IN_NOTICE_QUERY_PARAM]: noticeReason,
  });
  return `${PATHS.ACCESS.LOGIN}?${query.toString()}`;
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
    getFieldErrorId,
    goToPasswordRecovered: async (): Promise<void> => {
      await page.goto(E2E_RECOVERED_LOGIN_PATH);
    },
    goToSignedOut: async (): Promise<void> => {
      await page.goto(E2E_SIGNED_OUT_LOGIN_PATH);
    },
    goTo: async (noticeReason?: string): Promise<void> => {
      await page.goto(buildLoginUrl(noticeReason));
    },
    submit: (): Promise<void> =>
      locators.getSubmitButton().click(),
    togglePasswordVisibility: (
      currentLabel: string
    ): Promise<void> =>
      locators.getPasswordToggle(currentLabel).click(),
    waitForSubmission: (): Promise<Request> =>
      page.waitForRequest(isLoginNavigation),
  };
};
