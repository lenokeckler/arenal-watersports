import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "@/app/features/administration/category-catalog/constants/CategoryImageCopy.constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "@/app/features/administration/category-catalog/constants/CategoryConfigureSaveCopy.constants";
import {
  CATEGORY_CONFIGURE_NEXT_STEP_COPY,
  CATEGORY_CONFIGURE_NEXT_STEPS_COPY,
} from "@/app/features/administration/category-catalog/constants/CategoryConfigureNextStepsCopy.constants";
import type { CategoryConfigureNextStepId } from "@/app/features/administration/category-catalog/models/CategoryConfigureNextStepId.type";
import { CATEGORY_CONFIGURE_COPY } from "@/app/features/administration/category-catalog/constants/CategoryConfigureCopy.constants";
import { resolveCategoryConfigurePath } from "@/app/features/administration/category-catalog/utils/resolveCategoryConfigurePath";
import { E2E_NEXT_NOT_FOUND_MESSAGE } from "../constants/E2eCategoryBehavior.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import type { E2eCategoryImageFile } from "../models/E2eCategoryImageFile.interface";

export const createCategoryConfigurePage = (page: Page) => {
  const goTo = async (
    categoryId: string
  ): Promise<void> => {
    await page.goto(
      resolveCategoryConfigurePath(categoryId)
    );
  };

  const getHeading = (name: string): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name,
    });

  const getSectionButton = (title: string): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(`^${title}`),
    });

  const getNextStepsHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.SCREEN,
      name: CATEGORY_CONFIGURE_NEXT_STEPS_COPY.TITLE,
    });

  const getNextStepsProgress = (text: string): Locator =>
    page.getByText(text);

  const getNextStepButton = (
    stepId: CategoryConfigureNextStepId
  ): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CONFIGURE_NEXT_STEPS_COPY.ACTION_LABEL(
        CATEGORY_CONFIGURE_NEXT_STEP_COPY[stepId].action,
        CATEGORY_CONFIGURE_NEXT_STEP_COPY[stepId].title
      ),
    });

  const getSectionHeadings = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.CARD,
    });

  const getBackLink = (): Locator =>
    page.getByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CONFIGURE_COPY.BACK,
    });

  const getBackButton = (): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(CATEGORY_CONFIGURE_COPY.BACK),
    });

  const getLeaveSheet = (): Locator =>
    page.getByRole(ARIA_ROLE.DIALOG, {
      name: CATEGORY_CONFIGURE_COPY.LEAVE_TITLE,
    });

  const getStatusMessage = (text: string): Locator =>
    page
      .getByRole(ARIA_ROLE.STATUS)
      .filter({ hasText: text });

  const getFailureAlert = (): Locator =>
    page.getByRole(ARIA_ROLE.ALERT).filter({
      hasText: CATEGORY_CONFIGURE_SAVE_COPY.FAILED,
    });

  const getActiveSwitch = (): Locator =>
    page.getByRole(ARIA_ROLE.SWITCH, {
      name: CATEGORY_CONFIGURE_COPY.ACTIVE_LABEL,
    });

  const getSwitch = (label: string): Locator =>
    page.getByRole(ARIA_ROLE.SWITCH, { name: label });

  const getChip = (label: string): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: label,
      exact: true,
    });

  const getDurationField = (): Locator =>
    page.getByRole(ARIA_ROLE.TEXTBOX);

  const getField = (label: string): Locator =>
    page.getByLabel(label);

  const getNotFoundMessage = (): Locator =>
    page.getByText(E2E_NEXT_NOT_FOUND_MESSAGE);

  const getButton = (name: string): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, { name });

  const getPhotoPreview = (): Locator =>
    page.getByRole(ARIA_ROLE.IMG, {
      name: CATEGORY_IMAGE_COPY.PREVIEW_ALT_PICKED,
    });

  const choosePhoto = async (
    file: E2eCategoryImageFile
  ): Promise<void> => {
    await page
      .getByLabel(CATEGORY_IMAGE_COPY.FILE_INPUT_LABEL)
      .setInputFiles(file);
  };

  const toggleSection = async (
    title: string
  ): Promise<void> => {
    await getSectionButton(title).click();
  };

  return {
    goTo,
    getHeading,
    getSectionButton,
    getNextStepsHeading,
    getNextStepsProgress,
    getNextStepButton,
    getSectionHeadings,
    getBackLink,
    getBackButton,
    getLeaveSheet,
    getStatusMessage,
    getFailureAlert,
    getActiveSwitch,
    getSwitch,
    getChip,
    getDurationField,
    getField,
    getNotFoundMessage,
    getButton,
    getPhotoPreview,
    choosePhoto,
    toggleSection,
  };
};
