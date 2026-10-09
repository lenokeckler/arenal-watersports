import type { Locator, Page } from "@playwright/test";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import {
  PASSWORD_CHANGE_FIELD,
  type PasswordChangeField,
} from "@/app/constants/access/PasswordChangeError.constants";
import { E2E_PROFILE_COPY } from "../constants/E2eProfile.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import type { PasswordChangeFormValues } from "../support/models/PasswordChangeFormValues.interface";
import { getMainRegion } from "../support/mainRegion";

export const createProfilePasswordPage = (page: Page) => {
  const main = getMainRegion(page);
  const getInput = (label: string): Locator =>
    main.getByLabel(label, { exact: true });
  const getSubmitButton = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_PROFILE_COPY.SUBMIT,
    });
  const getPasswordToggle = (
    field: PasswordChangeField
  ): Locator =>
    main
      .getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_PROFILE_COPY.SHOW_PASSWORD,
        exact: true,
      })
      .and(main.locator(`[aria-controls="${field}"]`));

  return {
    fillForm: async ({
      confirmPassword,
      currentPassword,
      newPassword,
    }: PasswordChangeFormValues): Promise<void> => {
      await getInput(
        E2E_PROFILE_COPY.CURRENT_PASSWORD_LABEL
      ).fill(currentPassword);
      await getInput(
        E2E_PROFILE_COPY.NEW_PASSWORD_LABEL
      ).fill(newPassword);
      await getInput(
        E2E_PROFILE_COPY.CONFIRM_PASSWORD_LABEL
      ).fill(confirmPassword);
    },
    getConfirmPasswordError: (): Locator =>
      main.locator(
        `#${PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD}${FIELD_ERROR_ID_SUFFIX}`
      ),
    getCurrentPasswordError: (): Locator =>
      main.locator(
        `#${PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD}${FIELD_ERROR_ID_SUFFIX}`
      ),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
        name: E2E_PROFILE_COPY.PASSWORD_HEADING,
      }),
    getNewPasswordError: (): Locator =>
      main.locator(
        `#${PASSWORD_CHANGE_FIELD.NEW_PASSWORD}${FIELD_ERROR_ID_SUFFIX}`
      ),
    getRulesTitle: (): Locator =>
      main.getByText(E2E_PROFILE_COPY.RULES_TITLE, {
        exact: true,
      }),
    getSubmitButton,
    goToWellKnownChangePassword:
      async (): Promise<void> => {
        await page.goto(PATHS.WELL_KNOWN.CHANGE_PASSWORD);
      },
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.PROFILE.PASSWORD);
    },
    revealPassword: (
      field: PasswordChangeField
    ): Promise<void> => getPasswordToggle(field).click(),
    submit: (): Promise<void> => getSubmitButton().click(),
  };
};
