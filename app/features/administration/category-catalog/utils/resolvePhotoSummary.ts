import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryImage } from "../models/CategoryImage.interface";

export const resolvePhotoSummary = (
  image: CategoryImage,
  hasPickedPhoto: boolean
): string => {
  if (hasPickedPhoto) {
    return CATEGORY_CONFIGURE_COPY.PHOTO_PICKED;
  }

  return image.imagePath
    ? CATEGORY_CONFIGURE_COPY.PHOTO_PRESENT
    : CATEGORY_CONFIGURE_COPY.PHOTO_MISSING;
};
