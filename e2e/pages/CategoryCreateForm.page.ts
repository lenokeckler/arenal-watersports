import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { CATEGORY_CREATE_FORM_FIELD_ID } from "@/app/features/administration/category-catalog/constants/CategoryCreateFormFieldId.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";

export const createCategoryCreateFormPage = (
  page: Page
) => {
  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.ADMINISTRATION.CATEGORIES_NEW);
  };

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: CATEGORY_CATALOG_COPY.CREATE_FORM_TITLE,
    });

  const getNameInput = (): Locator =>
    page.getByLabel(CATEGORY_CATALOG_COPY.NAME_FIELD_LABEL);

  const getChoiceCard = (label: string): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(`^${label}`),
    });

  const getGroupNameInput = (): Locator =>
    page.getByLabel(
      CATEGORY_CATALOG_COPY.GROUP_FIELD_LABEL
    );

  const getNameError = (): Locator =>
    page.getByText(
      CATEGORY_CATALOG_COPY.NAME_FIELD_REQUIRED_ERROR
    );

  const getNameDuplicateError = (): Locator =>
    page.getByText(
      CATEGORY_CATALOG_COPY.NAME_DUPLICATE_ERROR
    );

  const getTrackingModeError = (): Locator =>
    page.getByText(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_REQUIRED_ERROR
    );

  const getGroupNameError = (): Locator =>
    page.locator(
      `#${CATEGORY_CREATE_FORM_FIELD_ID.GROUP_NAME}-error`
    );

  const getCancelButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON,
    });

  const getSubmitButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.SUBMIT_BUTTON,
    });

  const getToastMessage = (message: string): Locator =>
    page.getByText(message);

  const fillName = async (value: string): Promise<void> => {
    await getNameInput().fill(value);
  };

  const selectChoice = async (
    label: string
  ): Promise<void> => {
    await getChoiceCard(label).click();
  };

  const fillGroupName = async (
    value: string
  ): Promise<void> => {
    await getGroupNameInput().fill(value);
  };

  const submit = async (): Promise<void> => {
    await getSubmitButton().click();
  };

  const cancel = async (): Promise<void> => {
    await getCancelButton().click();
  };

  return {
    goTo,
    getHeading,
    getNameInput,
    getChoiceCard,
    getGroupNameInput,
    getNameError,
    getNameDuplicateError,
    getTrackingModeError,
    getGroupNameError,
    getCancelButton,
    getSubmitButton,
    getToastMessage,
    fillName,
    selectChoice,
    fillGroupName,
    submit,
    cancel,
  };
};
