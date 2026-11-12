import {
  CATEGORY_IMAGE_FILE_ISSUE,
  type CategoryImageFileIssue,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { validateCategoryImageFile } from "@/app/utils/category-image/validateCategoryImageFile";

export const validateCategoryImagePick = (
  file: File
): NullableRef<CategoryImageFileIssue> => {
  const issue = validateCategoryImageFile(file);

  return issue === CATEGORY_IMAGE_FILE_ISSUE.TOO_LARGE
    ? null
    : issue;
};
