import {
  CATEGORY_IMAGE,
  CATEGORY_IMAGE_FILE_ISSUE,
  type CategoryImageFileIssue,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isCategoryImageMimeType } from "./isCategoryImageMimeType";
import type { CategoryImageFile } from "./models/CategoryImageFile.interface";

export const validateCategoryImageFile = (
  file: CategoryImageFile
): NullableRef<CategoryImageFileIssue> => {
  if (file.size === 0) {
    return CATEGORY_IMAGE_FILE_ISSUE.EMPTY;
  }

  if (!isCategoryImageMimeType(file.type)) {
    return CATEGORY_IMAGE_FILE_ISSUE.UNSUPPORTED_TYPE;
  }

  if (file.size > CATEGORY_IMAGE.MAX_FILE_SIZE_BYTES) {
    return CATEGORY_IMAGE_FILE_ISSUE.TOO_LARGE;
  }

  return null;
};
