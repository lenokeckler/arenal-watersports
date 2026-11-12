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
  PASSWORD_CHANGE_FIELD,
  type PasswordChangeField,
} from "@/app/constants/access/PasswordChangeError.constants";
import {
  E2E_FIRST_SIGN_IN_COPY,
  E2E_FIRST_SIGN_IN_RULES_LIST_ID,
  E2E_PASSWORD_RULES_COPY,
} from "../constants/E2eFirstSignIn.constants";
import { E2E_CONTROLS_SELECTOR } from "../constants/E2eRuntime.constants";
import type { PasswordChangeFormValues } from "../support/models/PasswordChangeFormValues.interface";
import { getMainRegion } from "../support/mainRegion";

const createFieldLocators = (main: Locator) => {
  const getInput = (label: string): Locator =>
    main.getByLabel(label, { exact: true });
  const getError = (field: PasswordChangeField): Locator =>
    main.locator(`#${field}${FIELD_ERROR_ID_SUFFIX}`);

  return {
    getConfirmPasswordError: (): Locator =>
      getError(PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD),
    getConfirmPasswordInput: (): Locator =>
      getInput(
        E2E_FIRST_SIGN_IN_COPY.CONFIRM_PASSWORD_LABEL
      ),
    getCurrentPasswordError: (): Locator =>
      getError(PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD),
    getCurrentPasswordInput: (): Locator =>
      getInput(
        E2E_FIRST_SIGN_IN_COPY.CURRENT_PASSWORD_LABEL
      ),
    getNewPasswordError: (): Locator =>
      getError(PASSWORD_CHANGE_FIELD.NEW_PASSWORD),
    getNewPasswordInput: (): Locator =>
      getInput(E2E_FIRST_SIGN_IN_COPY.NEW_PASSWORD_LABEL),
  };
};

const createChromeLocators = (main: Locator) => ({
  getHeading: (): Locator =>
    main.getByRole(ARIA_ROLE.HEADING, {
      name: E2E_FIRST_SIGN_IN_COPY.HEADING,
    }),
  getPasswordToggle: (
    field: PasswordChangeField
  ): Locator =>
    main
      .getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_FIRST_SIGN_IN_COPY.SHOW_PASSWORD,
        exact: true,
      })
      .and(main.locator(E2E_CONTROLS_SELECTOR(field))),
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
});

const createFirstSignInLocators = (page: Page) => ({
  ...createFieldLocators(getMainRegion(page)),
  ...createChromeLocators(getMainRegion(page)),
});

export const createFirstSignInPage = (page: Page) => {
  const locators = createFirstSignInLocators(page);

  return {
    ...locators,
    fillForm: async ({
      confirmPassword,
      currentPassword,
      newPassword,
    }: PasswordChangeFormValues): Promise<void> => {
      await locators
        .getCurrentPasswordInput()
        .fill(currentPassword);
      await locators
        .getNewPasswordInput()
        .fill(newPassword);
      await locators
        .getConfirmPasswordInput()
        .fill(confirmPassword);
    },
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
    revealPassword: (
      field: PasswordChangeField
    ): Promise<void> =>
      locators.getPasswordToggle(field).click(),
    submit: (): Promise<void> =>
      locators.getSubmitButton().click(),
  };
};
