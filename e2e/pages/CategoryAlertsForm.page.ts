import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import type { CategoryAlertType } from "@/app/features/administration/category-catalog/constants/CategoryAlertType.constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { resolveCategoryAlertsPath } from "@/app/features/administration/category-catalog/utils/resolveCategoryAlertsPath";
import { E2E_NEXT_NOT_FOUND_MESSAGE } from "../constants/E2eCategoryBehavior.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import type { CategoryAlertThresholdInput } from "../models/CategoryAlertThresholdInput.interface";

export const createCategoryAlertsFormPage = (
  page: Page
) => {
  const goTo = async (
    categoryId: string
  ): Promise<void> => {
    await page.goto(resolveCategoryAlertsPath(categoryId));
  };

  const clickAlertsLink = async (
    categoryCard: Locator
  ): Promise<void> => {
    await categoryCard
      .getByRole(ARIA_ROLE.LINK, {
        name: CATEGORY_CATALOG_COPY.ALERT_LINK,
      })
      .click();
  };

  const reload = async (): Promise<void> => {
    await page.reload();
  };

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: CATEGORY_CATALOG_COPY.ALERT_FORM_TITLE,
    });

  const getTypeSelect = (): Locator =>
    page.getByLabel(
      CATEGORY_CATALOG_COPY.ALERT_TYPE_FIELD_LABEL
    );

  const getMinQuantityInput = (): Locator =>
    page.getByLabel(
      CATEGORY_CATALOG_COPY.ALERT_MIN_QUANTITY_FIELD_LABEL
    );

  const getExpiryDaysInput = (): Locator =>
    page.getByLabel(
      CATEGORY_CATALOG_COPY.ALERT_EXPIRY_DAYS_FIELD_LABEL
    );

  const getFieldError = (fieldId: string): Locator =>
    page.locator(`#${fieldId}${FIELD_ERROR_ID_SUFFIX}`);

  const getCancelButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON,
    });

  const getSubmitButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.ALERT_SUBMIT_BUTTON,
    });

  const getToastMessage = (message: string): Locator =>
    page.getByText(message);

  const getNotFoundMessage = (): Locator =>
    page.getByText(E2E_NEXT_NOT_FOUND_MESSAGE);

  const selectType = async (
    alertType: CategoryAlertType
  ): Promise<void> => {
    await getTypeSelect().selectOption(alertType);
  };

  const fillThresholds = async (
    input: CategoryAlertThresholdInput
  ): Promise<void> => {
    if (input.minQuantityText) {
      await getMinQuantityInput().fill(
        input.minQuantityText
      );
    }
    if (input.expiryDaysText) {
      await getExpiryDaysInput().fill(input.expiryDaysText);
    }
  };

  const submit = async (): Promise<void> => {
    await getSubmitButton().click();
  };

  const cancel = async (): Promise<void> => {
    await getCancelButton().click();
  };

  return {
    goTo,
    clickAlertsLink,
    reload,
    getHeading,
    getTypeSelect,
    getMinQuantityInput,
    getExpiryDaysInput,
    getFieldError,
    getCancelButton,
    getSubmitButton,
    getToastMessage,
    getNotFoundMessage,
    selectType,
    fillThresholds,
    submit,
    cancel,
  };
};
