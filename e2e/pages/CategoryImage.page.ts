import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "@/app/features/administration/category-catalog/constants/CategoryImageCopy.constants";
import { CATEGORY_IMAGE_FORM_FIELD_ID } from "@/app/features/administration/category-catalog/constants/CategoryImageFormFieldId.constants";
import { resolveCategoryImagePath } from "@/app/features/administration/category-catalog/utils/resolveCategoryImagePath";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import type { E2eCategoryImageFile } from "../models/E2eCategoryImageFile.interface";
import { createCategoryCardOptionsPage } from "./CategoryCardOptions.page";

export const createCategoryImagePage = (page: Page) => {
  const categoryCardOptionsPage =
    createCategoryCardOptionsPage();

  const goTo = async (
    categoryId: string
  ): Promise<void> => {
    await page.goto(resolveCategoryImagePath(categoryId));
  };

  const clickImageLink = async (
    categoryCard: Locator
  ): Promise<void> => {
    await categoryCardOptionsPage.openOptions(categoryCard);
    await categoryCard
      .getByRole(ARIA_ROLE.LINK, {
        name: CATEGORY_IMAGE_COPY.IMAGE_LINK,
        exact: true,
      })
      .click();
  };

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: CATEGORY_IMAGE_COPY.FORM_TITLE,
    });

  const getButton = (name: string): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, { name });

  const getPreviewImage = (alt: string): Locator =>
    page.getByRole(ARIA_ROLE.IMG, { name: alt });

  const getEmptyPreview = (): Locator =>
    page.getByText(CATEGORY_IMAGE_COPY.PREVIEW_EMPTY);

  const getAlert = (): Locator =>
    page.locator(`#${CATEGORY_IMAGE_FORM_FIELD_ID.ERROR}`);

  const getToastMessage = (message: string): Locator =>
    page.getByText(message);

  const isImageLoaded = (alt: string): Promise<boolean> =>
    getPreviewImage(alt).evaluate(
      (element: HTMLImageElement) =>
        element.complete && element.naturalWidth > 0
    );

  const chooseFile = async (
    file: E2eCategoryImageFile
  ): Promise<void> => {
    await page
      .getByLabel(CATEGORY_IMAGE_COPY.FILE_INPUT_LABEL)
      .setInputFiles(file);
  };

  const clickNamedButton = async (
    name: string
  ): Promise<void> => {
    await getButton(name).click();
  };

  return {
    chooseFile,
    clickImageLink,
    clickNamedButton,
    getAlert,
    getButton,
    getEmptyPreview,
    getHeading,
    getPreviewImage,
    getToastMessage,
    goTo,
    isImageLoaded,
  };
};
