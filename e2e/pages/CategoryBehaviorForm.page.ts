import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { resolveCategoryBehaviorPath } from "@/app/features/administration/category-catalog/utils/resolveCategoryBehaviorPath";
import { E2E_NEXT_NOT_FOUND_MESSAGE } from "../constants/E2eCategoryBehavior.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";

export const createCategoryBehaviorFormPage = (
  page: Page
) => {
  const goTo = async (
    categoryId: string
  ): Promise<void> => {
    await page.goto(
      resolveCategoryBehaviorPath(categoryId)
    );
  };

  const reload = async (): Promise<void> => {
    await page.reload();
  };

  const getControl = (label: string): Locator =>
    page.getByLabel(label, { exact: true });

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: CATEGORY_CATALOG_COPY.BEHAVIOR_FORM_TITLE,
    });

  const getTrackingModeLine = (
    trackingModeLabel: string
  ): Locator =>
    page.getByText(
      `${CATEGORY_CATALOG_COPY.BEHAVIOR_TRACKING_MODE_LINE_LABEL} ${trackingModeLabel}`
    );

  const getTrackingModeControl = (): Locator =>
    getControl(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_FIELD_LABEL
    );

  const getIsReservableCheckbox = (): Locator =>
    getControl(
      CATEGORY_CATALOG_COPY.IS_RESERVABLE_FIELD_LABEL
    );

  const getHasMotorCheckbox = (): Locator =>
    getControl(CATEGORY_CATALOG_COPY.HAS_MOTOR_FIELD_LABEL);

  const getUsageMetricSelect = (): Locator =>
    getControl(
      CATEGORY_CATALOG_COPY.USAGE_METRIC_FIELD_LABEL
    );

  const getHasConditionPhotosCheckbox = (): Locator =>
    getControl(
      CATEGORY_CATALOG_COPY.HAS_CONDITION_PHOTOS_FIELD_LABEL
    );

  const getGuideOnlyCheckbox = (): Locator =>
    getControl(
      CATEGORY_CATALOG_COPY.GUIDE_ONLY_FIELD_LABEL
    );

  const getDurationInput = (): Locator =>
    getControl(
      CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_FIELD_LABEL
    );

  const getDurationError = (): Locator =>
    page.getByText(
      CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR
    );

  const getCancelButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON,
    });

  const getSubmitButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.BEHAVIOR_SUBMIT_BUTTON,
    });

  const getToastMessage = (message: string): Locator =>
    page.getByText(message);

  const getNotFoundMessage = (): Locator =>
    page.getByText(E2E_NEXT_NOT_FOUND_MESSAGE);

  const checkIsReservable = async (): Promise<void> => {
    await getIsReservableCheckbox().check();
  };

  const checkGuideOnly = async (): Promise<void> => {
    await getGuideOnlyCheckbox().check();
  };

  const uncheckHasMotor = async (): Promise<void> => {
    await getHasMotorCheckbox().uncheck();
  };

  const fillDuration = async (
    value: string
  ): Promise<void> => {
    await getDurationInput().fill(value);
  };

  const submit = async (): Promise<void> => {
    await getSubmitButton().click();
  };

  const cancel = async (): Promise<void> => {
    await getCancelButton().click();
  };

  return {
    goTo,
    reload,
    getHeading,
    getTrackingModeLine,
    getTrackingModeControl,
    getIsReservableCheckbox,
    getHasMotorCheckbox,
    getUsageMetricSelect,
    getHasConditionPhotosCheckbox,
    getGuideOnlyCheckbox,
    getDurationInput,
    getDurationError,
    getCancelButton,
    getSubmitButton,
    getToastMessage,
    getNotFoundMessage,
    checkIsReservable,
    checkGuideOnly,
    uncheckHasMotor,
    fillDuration,
    submit,
    cancel,
  };
};
