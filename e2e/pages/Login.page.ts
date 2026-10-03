import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import {
  E2E_LOGIN_COPY,
  E2E_LOGIN_ERROR_ID_SUFFIX,
  E2E_LOGIN_FIELD_ID,
} from "../constants/E2eLogin.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createLoginPage = (page: Page) => {
  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.ACCESS.LOGIN);
  };

  const getHeading = (): Locator =>
    getMainRegion(page).getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
    });

  const getUsernameInput = (): Locator =>
    getMainRegion(page).getByLabel(
      E2E_LOGIN_COPY.USERNAME_LABEL,
      { exact: true }
    );

  const getPasswordInput = (): Locator =>
    getMainRegion(page).getByLabel(
      E2E_LOGIN_COPY.PASSWORD_LABEL,
      { exact: true }
    );

  const getSubmitButton = (): Locator =>
    getMainRegion(page).getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_LOGIN_COPY.SUBMIT,
    });

  const getPasswordToggle = (label: string): Locator =>
    getMainRegion(page).getByRole(ARIA_ROLE.BUTTON, {
      name: label,
      exact: true,
    });

  const getUsernameError = (): Locator =>
    getMainRegion(page).locator(
      `#${E2E_LOGIN_FIELD_ID.USERNAME}${E2E_LOGIN_ERROR_ID_SUFFIX}`
    );

  const getPasswordError = (): Locator =>
    getMainRegion(page).locator(
      `#${E2E_LOGIN_FIELD_ID.PASSWORD}${E2E_LOGIN_ERROR_ID_SUFFIX}`
    );

  const fillUsername = async (
    username: string
  ): Promise<void> => {
    await getUsernameInput().fill(username);
  };

  const fillPassword = async (
    password: string
  ): Promise<void> => {
    await getPasswordInput().fill(password);
  };

  const submit = async (): Promise<void> => {
    await getSubmitButton().click();
  };

  const togglePasswordVisibility = async (
    currentLabel: string
  ): Promise<void> => {
    await getPasswordToggle(currentLabel).click();
  };

  return {
    goTo,
    getHeading,
    getUsernameInput,
    getPasswordInput,
    getSubmitButton,
    getPasswordToggle,
    getUsernameError,
    getPasswordError,
    fillUsername,
    fillPassword,
    submit,
    togglePasswordVisibility,
  };
};
