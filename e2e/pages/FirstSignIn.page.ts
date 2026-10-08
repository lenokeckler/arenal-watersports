import type { Locator, Page } from "@playwright/test";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import type { PasswordRuleState } from "@/app/components/password-rules-checklist/constants/PasswordRuleState.constants";
import {
  ARIA_ROLE,
  PATHS,
  STRING,
  type PasswordRule,
} from "@/app/constants";
import {
  FIRST_SIGN_IN_FIELD,
  type FirstSignInField,
} from "@/app/constants/access/FirstSignInError.constants";
import {
  E2E_FIRST_SIGN_IN_COPY,
  E2E_FIRST_SIGN_IN_RULES_LIST_ID,
  E2E_PASSWORD_RULES_COPY,
} from "../constants/E2eFirstSignIn.constants";
import { getMainRegion } from "../support/mainRegion";

const createFirstSignInLocators = (page: Page) => {
  const main = getMainRegion(page);
  const getInput = (label: string): Locator =>
    main.getByLabel(label, { exact: true });
  const getError = (field: FirstSignInField): Locator =>
    main.locator(`#${field}${FIELD_ERROR_ID_SUFFIX}`);

  return {
    getConfirmPasswordError: (): Locator =>
      getError(FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD),
    getConfirmPasswordInput: (): Locator =>
      getInput(
        E2E_FIRST_SIGN_IN_COPY.CONFIRM_PASSWORD_LABEL
      ),
    getCurrentPasswordError: (): Locator =>
      getError(FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD),
    getCurrentPasswordInput: (): Locator =>
      getInput(
        E2E_FIRST_SIGN_IN_COPY.CURRENT_PASSWORD_LABEL
      ),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: E2E_FIRST_SIGN_IN_COPY.HEADING,
      }),
    getNewPasswordError: (): Locator =>
      getError(FIRST_SIGN_IN_FIELD.NEW_PASSWORD),
    getNewPasswordInput: (): Locator =>
      getInput(E2E_FIRST_SIGN_IN_COPY.NEW_PASSWORD_LABEL),
    getRulesList: (): Locator =>
      main.locator(`#${E2E_FIRST_SIGN_IN_RULES_LIST_ID}`),
    getRulesTitle: (): Locator =>
      main.getByText(E2E_FIRST_SIGN_IN_COPY.RULES_TITLE, {
        exact: true,
      }),
    getSubmitButton: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_FIRST_SIGN_IN_COPY.SUBMIT,
      }),
  };
};

export const createFirstSignInPage = (page: Page) => {
  const locators = createFirstSignInLocators(page);

  return {
    ...locators,
    fillConfirmPassword: (
      password: string
    ): Promise<void> =>
      locators.getConfirmPasswordInput().fill(password),
    fillCurrentPassword: (
      password: string
    ): Promise<void> =>
      locators.getCurrentPasswordInput().fill(password),
    fillNewPassword: (password: string): Promise<void> =>
      locators.getNewPasswordInput().fill(password),
    getRuleItem: (
      rule: PasswordRule,
      state: PasswordRuleState
    ): Locator =>
      locators.getRulesList().locator("li", {
        hasText: `${E2E_PASSWORD_RULES_COPY.STATE[state]}${STRING.SPACE}${E2E_PASSWORD_RULES_COPY.RULE[rule]}`,
      }),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.ACCESS.FIRST_SIGN_IN);
    },
    submit: (): Promise<void> =>
      locators.getSubmitButton().click(),
  };
};
