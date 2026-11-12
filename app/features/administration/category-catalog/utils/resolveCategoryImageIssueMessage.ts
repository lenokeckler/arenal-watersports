import {
  CATEGORY_IMAGE_FILE_ISSUE,
  type CategoryImageFileIssue,
} from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";

const MESSAGE_BY_ISSUE: Record<
  CategoryImageFileIssue,
  string
> = {
  [CATEGORY_IMAGE_FILE_ISSUE.EMPTY]:
    CATEGORY_IMAGE_COPY.FILE_EMPTY_ERROR,
  [CATEGORY_IMAGE_FILE_ISSUE.TOO_LARGE]:
    CATEGORY_IMAGE_COPY.FILE_TOO_LARGE_ERROR,
  [CATEGORY_IMAGE_FILE_ISSUE.UNSUPPORTED_TYPE]:
    CATEGORY_IMAGE_COPY.FILE_UNSUPPORTED_TYPE_ERROR,
};

export const resolveCategoryImageIssueMessage = (
  issue: CategoryImageFileIssue
): string => MESSAGE_BY_ISSUE[issue];
