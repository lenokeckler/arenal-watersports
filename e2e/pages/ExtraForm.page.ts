import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_FIELD_ID } from "@/app/features/administration/extra-catalog/constants/ExtraFormFieldId.constants";
import { E2E_NEXT_NOT_FOUND_MESSAGE } from "../constants/E2eCategoryBehavior.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";

export const createExtraFormPage = (page: Page) => {
  const goTo = async (
    path: string = PATHS.ADMINISTRATION.EXTRAS_NEW
  ): Promise<void> => {
    await page.goto(path);
  };

  const getHeading = (title: string): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: title,
    });

  const getNameInput = (): Locator =>
    page.locator(`#${EXTRA_FORM_FIELD_ID.NAME}`);

  const getNameError = (): Locator =>
    page.locator(`#${EXTRA_FORM_FIELD_ID.NAME}-error`);

  const getSubmitButton = (label: string): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: label,
      exact: true,
    });

  const getCancelButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_CATALOG_COPY.CANCEL_BUTTON,
    });

  const getToastMessage = (message: string): Locator =>
    page.getByText(message, { exact: true });

  const getNotFoundMessage = (): Locator =>
    page.getByText(E2E_NEXT_NOT_FOUND_MESSAGE);

  const fillName = async (value: string): Promise<void> => {
    await getNameInput().fill(value);
  };

  const submit = async (label: string): Promise<void> => {
    await getSubmitButton(label).click();
  };

  const cancel = async (): Promise<void> => {
    await getCancelButton().click();
  };

  return {
    goTo,
    getHeading,
    getNameInput,
    getNameError,
    getSubmitButton,
    getCancelButton,
    getToastMessage,
    getNotFoundMessage,
    fillName,
    submit,
    cancel,
  };
};
