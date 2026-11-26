import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryImage } from "../models/CategoryImage.interface";

export const resolvePhotoSummary = (
  image: CategoryImage
): string =>
  image.imagePath
    ? CATEGORY_CONFIGURE_COPY.PHOTO_PRESENT
    : CATEGORY_CONFIGURE_COPY.PHOTO_MISSING;
