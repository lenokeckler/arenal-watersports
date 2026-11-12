import { UNIT_PHOTO_UPLOAD } from "../constants/UnitPhotos.constants";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import type { NullableRef } from "@/app/types";

export const validatePhotoFile = (
  file: Pick<File, "size" | "type">
): NullableRef<string> => {
  if (
    !(
      UNIT_PHOTO_UPLOAD.ALLOWED_TYPES as readonly string[]
    ).includes(file.type)
  ) {
    return UNIT_PHOTOS_COPY.ERROR_TYPE;
  }

  if (file.size > UNIT_PHOTO_UPLOAD.MAX_BYTES) {
    return UNIT_PHOTOS_COPY.ERROR_SIZE;
  }

  return null;
};
