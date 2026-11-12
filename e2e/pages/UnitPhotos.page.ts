import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { UNIT_PHOTOS_COPY } from "@/app/features/operations/unit-photos/constants/UnitPhotosCopy.constants";
import { E2E_UNIT_PHOTOS } from "../constants/E2eUnitPhotos.constants";
import { buildE2ePhoto } from "../support/buildE2ePhoto";
import { getMainRegion } from "../support/mainRegion";

type PhotoAngle = keyof typeof UNIT_PHOTOS_COPY.ANGLE;

export const createUnitPhotosPage = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: UNIT_PHOTOS_COPY.HEADING,
        exact: true,
      }),
    getImpacts: (count: number): Locator =>
      main.getByText(`${UNIT_PHOTOS_COPY.IMPACTS}${count}`),
    getNotFound: (): Locator =>
      main.getByText(UNIT_PHOTOS_COPY.NOT_FOUND),
    getPhoto: (angle: PhotoAngle): Locator =>
      main.getByRole("img", {
        name: `${UNIT_PHOTOS_COPY.ALT_PREFIX}${UNIT_PHOTOS_COPY.ANGLE[angle]}`,
      }),
    getSaved: (): Locator =>
      main.getByText(UNIT_PHOTOS_COPY.SAVED),
    getSlot: (angle: PhotoAngle): Locator =>
      main.getByRole(ARIA_ROLE.LISTITEM).filter({
        hasText: UNIT_PHOTOS_COPY.ANGLE[angle],
      }),
    getUploadInputs: (): Locator =>
      main.locator("input[type='file']"),
    goTo: async (unitId: string): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.UNIT_PHOTOS(unitId));
    },
    uploadPhoto: async (
      angle: PhotoAngle,
      isReplacing: boolean,
      mimeType: string = E2E_UNIT_PHOTOS.MIME_TYPE
    ): Promise<void> => {
      await main
        .getByLabel(
          `${isReplacing ? UNIT_PHOTOS_COPY.REPLACE : UNIT_PHOTOS_COPY.UPLOAD}: ${UNIT_PHOTOS_COPY.ANGLE[angle]}`
        )
        .setInputFiles({
          buffer: buildE2ePhoto(),
          mimeType,
          name: E2E_UNIT_PHOTOS.PHOTO_NAME,
        });
    },
  };
};
