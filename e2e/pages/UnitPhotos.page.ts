import type { Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { UNIT_PHOTOS_COPY } from "@/app/features/operations/unit-photos/constants/UnitPhotosCopy.constants";
import { E2E_UNIT_PHOTOS } from "../constants/E2eUnitPhotos.constants";
import type { PhotoAngle } from "../models/PhotoAngle.type";
import { chooseUnitPhotoFile } from "../support/chooseUnitPhotoFile";
import { createUnitPhotosLocators } from "./UnitPhotos.locators";

export const createUnitPhotosPage = (page: Page) => {
  const press = (name: string): Promise<void> =>
    page
      .getByRole(ARIA_ROLE.BUTTON, { name, exact: true })
      .click();
  const labelOf = (angle: PhotoAngle): string =>
    UNIT_PHOTOS_COPY.ANGLE[angle];

  return {
    ...createUnitPhotosLocators(page),
    goTo: async (unitId: string): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.UNIT_PHOTOS(unitId));
    },
    openLarge: (angle: PhotoAngle) =>
      press(UNIT_PHOTOS_COPY.VIEW_LARGE(labelOf(angle))),
    askToDelete: (angle: PhotoAngle) =>
      press(UNIT_PHOTOS_COPY.DELETE_LABEL(labelOf(angle))),
    confirmDelete: () => press(UNIT_PHOTOS_COPY.DELETE),
    uploadPhoto: (
      angle: PhotoAngle,
      isReplacing: boolean,
      mimeType: string = E2E_UNIT_PHOTOS.MIME_TYPE
    ): Promise<void> =>
      chooseUnitPhotoFile(page, {
        angle,
        isReplacing,
        mimeType,
      }),
  };
};
