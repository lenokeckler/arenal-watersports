import type { Locator, Page } from "@playwright/test";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import {
  ARIA_ROLE,
  PATHS,
  PERSONAL_EMAIL_FIELD,
} from "@/app/constants";
import { E2E_PERSONAL_EMAIL_COPY } from "../constants/E2ePersonalEmail.constants";
import {
  E2E_CONTROLS_SELECTOR,
  E2E_KEY,
  HEADING_LEVEL,
} from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createPersonalEmailPage = (page: Page) => {
  const main = getMainRegion(page);
  const getInput = (label: string): Locator =>
    main.getByLabel(label, { exact: true });
  const getEmailInput = (): Locator =>
    main.locator(`#${PERSONAL_EMAIL_FIELD.EMAIL}`);
  const getPasswordInput = (): Locator =>
    getInput(
      E2E_PERSONAL_EMAIL_COPY.CURRENT_PASSWORD_LABEL
    );
  const getButton = (name: string): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, { name, exact: true });
  const getSaveButton = (): Locator =>
    getButton(E2E_PERSONAL_EMAIL_COPY.SAVE);
  const getRemoveButton = (): Locator =>
    getButton(E2E_PERSONAL_EMAIL_COPY.REMOVE);
  const getError = (field: string): Locator =>
    main.locator(`#${field}${FIELD_ERROR_ID_SUFFIX}`);

  return {
    fillEmail: (address: string): Promise<void> =>
      getEmailInput().fill(address),
    fillPassword: (password: string): Promise<void> =>
      getPasswordInput().fill(password),
    getBackLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: E2E_PERSONAL_EMAIL_COPY.BACK,
      }),
    getEmailError: (): Locator =>
      getError(PERSONAL_EMAIL_FIELD.EMAIL),
    getEmailInput,
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
        name: E2E_PERSONAL_EMAIL_COPY.HEADING,
      }),
    getPasswordError: (): Locator =>
      getError(PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD),
    getPasswordInput,
    getRemoveButton,
    getSaveButton,
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.PROFILE.EMAIL);
    },
    remove: (): Promise<void> => getRemoveButton().click(),
    revealPassword: (): Promise<void> =>
      main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: E2E_PERSONAL_EMAIL_COPY.SHOW_PASSWORD,
          exact: true,
        })
        .and(
          main.locator(
            E2E_CONTROLS_SELECTOR(
              PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD
            )
          )
        )
        .click(),
    save: (): Promise<void> => getSaveButton().click(),
    submitWithEnter: (): Promise<void> =>
      getPasswordInput().press(E2E_KEY.ENTER),
  };
};
