import type { Locator, Page } from "@playwright/test";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import {
  ARIA_ROLE,
  PASSWORD_RECOVERY_FIELD,
  PATHS,
} from "@/app/constants";
import { E2E_RECOVERY_COPY } from "../constants/E2ePasswordRecovery.constants";
import {
  E2E_CONTROLS_SELECTOR,
  HEADING_LEVEL,
} from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";
import type { RecoveryNewPasswordFormValues } from "../support/models/RecoveryNewPasswordFormValues.interface";

export const createPasswordRecoveryNewPasswordPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getInput = (label: string): Locator =>
    main.getByLabel(label, { exact: true });
  const getLink = (name: string): Locator =>
    main.getByRole(ARIA_ROLE.LINK, { name, exact: true });
  const getFieldError = (field: string): Locator =>
    main.locator(`#${field}${FIELD_ERROR_ID_SUFFIX}`);
  const getPasswordToggle = (field: string): Locator =>
    main
      .getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_RECOVERY_COPY.SHOW_PASSWORD,
        exact: true,
      })
      .and(main.locator(E2E_CONTROLS_SELECTOR(field)));
  const getSubmitButton = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_RECOVERY_COPY.NEW_PASSWORD_SUBMIT,
      exact: true,
    });
  const getHeading = (): Locator =>
    main.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.SCREEN,
      name: E2E_RECOVERY_COPY.NEW_PASSWORD_HEADING,
    });
  const getNewPasswordInput = (): Locator =>
    getInput(E2E_RECOVERY_COPY.NEW_PASSWORD_LABEL);
  const getConfirmPasswordInput = (): Locator =>
    getInput(E2E_RECOVERY_COPY.CONFIRM_PASSWORD_LABEL);
  const getRulesTitle = (): Locator =>
    main.getByText(E2E_RECOVERY_COPY.RULES_TITLE, {
      exact: true,
    });
  const getAnotherPinLink = (): Locator =>
    getLink(E2E_RECOVERY_COPY.REQUEST_ANOTHER_PIN);
  const getBackLink = (): Locator =>
    getLink(E2E_RECOVERY_COPY.BACK);

  return {
    fillForm: async ({
      confirmPassword,
      newPassword,
    }: RecoveryNewPasswordFormValues): Promise<void> => {
      await getNewPasswordInput().fill(newPassword);
      await getConfirmPasswordInput().fill(confirmPassword);
    },
    getAnotherPinLink,
    getBackLink,
    getBanner: (): Locator =>
      main.getByRole(ARIA_ROLE.ALERT),
    getConfirmPasswordError: (): Locator =>
      getFieldError(
        PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD
      ),
    getConfirmPasswordInput,
    getHeading,
    getNewPasswordError: (): Locator =>
      getFieldError(PASSWORD_RECOVERY_FIELD.NEW_PASSWORD),
    getNewPasswordInput,
    getRulesTitle,
    getSubmitButton,
    getVisibleElements: (): Locator[] => [
      getHeading(),
      getNewPasswordInput(),
      getRulesTitle(),
      getConfirmPasswordInput(),
      getSubmitButton(),
      getAnotherPinLink(),
      getBackLink(),
    ],
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.ACCESS.RECOVERY_PASSWORD);
    },
    revealPasswords: async (): Promise<void> => {
      await getPasswordToggle(
        PASSWORD_RECOVERY_FIELD.NEW_PASSWORD
      ).click();
      await getPasswordToggle(
        PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD
      ).click();
    },
    submit: (): Promise<void> => getSubmitButton().click(),
  };
};
