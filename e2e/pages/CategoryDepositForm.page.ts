import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  type CurrencyCode,
} from "@/app/constants";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { CATEGORY_DEPOSIT_FIELD_LABEL } from "@/app/features/administration/category-catalog/constants/CategoryDepositFieldLabel.constants";
import { CATEGORY_DEPOSIT_FORM_FIELD_ID } from "@/app/features/administration/category-catalog/constants/CategoryDepositFormFieldId.constants";
import { resolveCategoryDepositPath } from "@/app/features/administration/category-catalog/utils/resolveCategoryDepositPath";
import { E2E_NEXT_NOT_FOUND_MESSAGE } from "../constants/E2eCategoryBehavior.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { createCategoryCardOptionsPage } from "./CategoryCardOptions.page";

export const createCategoryDepositFormPage = (
  page: Page
) => {
  const categoryCardOptionsPage =
    createCategoryCardOptionsPage();

  const goTo = async (
    categoryId: string
  ): Promise<void> => {
    await page.goto(resolveCategoryDepositPath(categoryId));
  };

  const clickDepositLink = async (
    categoryCard: Locator
  ): Promise<void> => {
    await categoryCardOptionsPage.openOptions(categoryCard);
    await categoryCard
      .getByRole(ARIA_ROLE.LINK, {
        name: CATEGORY_CATALOG_COPY.DEPOSIT_LINK,
      })
      .click();
  };

  const reload = async (): Promise<void> => {
    await page.reload();
  };

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: CATEGORY_CATALOG_COPY.DEPOSIT_FORM_TITLE,
    });

  const getAmountInput = (
    currency: CurrencyCode
  ): Locator =>
    page.getByLabel(
      CATEGORY_DEPOSIT_FIELD_LABEL[currency],
      {
        exact: true,
      }
    );

  const getAmountError = (
    currency: CurrencyCode
  ): Locator =>
    page.locator(
      `#${CATEGORY_DEPOSIT_FORM_FIELD_ID[currency]}${FIELD_ERROR_ID_SUFFIX}`
    );

  const getPlaceholderInputs = (): Locator =>
    page.getByPlaceholder(
      CATEGORY_CATALOG_COPY.DEPOSIT_FIELD_PLACEHOLDER
    );

  const getCancelButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON,
    });

  const getSubmitButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.DEPOSIT_SUBMIT_BUTTON,
    });

  const getToastMessage = (message: string): Locator =>
    page.getByText(message);

  const getNotFoundMessage = (): Locator =>
    page.getByText(E2E_NEXT_NOT_FOUND_MESSAGE);

  const fillAmount = async (
    currency: CurrencyCode,
    value: string
  ): Promise<void> => {
    await getAmountInput(currency).fill(value);
  };

  const submit = async (): Promise<void> => {
    await getSubmitButton().click();
  };

  const cancel = async (): Promise<void> => {
    await getCancelButton().click();
  };

  return {
    goTo,
    clickDepositLink,
    reload,
    getHeading,
    getAmountInput,
    getAmountError,
    getPlaceholderInputs,
    getCancelButton,
    getSubmitButton,
    getToastMessage,
    getNotFoundMessage,
    fillAmount,
    submit,
    cancel,
  };
};
