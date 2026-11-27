import type { Locator, Page } from "@playwright/test";
import { ARIA_LABEL, ARIA_ROLE } from "@/app/constants";
import { IMPACT_COUNT_COPY } from "@/app/components/impact-count/constants/ImpactCountCopy.constants";
import { UNIT_PHOTOS_COPY } from "@/app/features/operations/unit-photos/constants/UnitPhotosCopy.constants";
import type { PhotoAngle } from "../models/PhotoAngle.type";
import { getMainRegion } from "../support/mainRegion";

export const createUnitPhotosLocators = (page: Page) => {
  const main = getMainRegion(page);

  return {
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: UNIT_PHOTOS_COPY.HEADING,
        exact: true,
      }),
    getImpacts: (count: number): Locator =>
      main.getByText(IMPACT_COUNT_COPY.SPOKEN(count)),
    getNotFound: (): Locator =>
      main.getByText(UNIT_PHOTOS_COPY.NOT_FOUND),
    getViewOnlyNotice: (): Locator =>
      main.getByText(UNIT_PHOTOS_COPY.VIEW_ONLY),
    getPhoto: (angle: PhotoAngle): Locator =>
      main.getByRole(ARIA_ROLE.IMG, {
        name: `${UNIT_PHOTOS_COPY.ALT_PREFIX}${UNIT_PHOTOS_COPY.ANGLE[angle]}`,
      }),
    getNotice: (message: string): Locator =>
      page
        .getByRole(ARIA_ROLE.REGION, {
          name: ARIA_LABEL.TOASTS,
        })
        .getByText(message),
    getSlot: (angle: PhotoAngle): Locator =>
      main.getByRole(ARIA_ROLE.LISTITEM).filter({
        hasText: UNIT_PHOTOS_COPY.ANGLE[angle],
      }),
    getUploadInputs: (): Locator =>
      page.locator("input[type='file']"),
  };
};
