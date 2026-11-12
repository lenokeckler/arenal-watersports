import {
  CATEGORY_IMAGE,
  CATEGORY_IMAGE_FILE_ISSUE,
} from "@/app/constants";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { buildCategoryImagePath } from "@/app/utils/category-image/buildCategoryImagePath";
import { isCategoryImageMimeType } from "@/app/utils/category-image/isCategoryImageMimeType";
import { validateCategoryImageFile } from "@/app/utils/category-image/validateCategoryImageFile";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import type { UploadCategoryImageObjectOptions } from "../models/UploadCategoryImageObjectOptions.interface";
import type { UploadCategoryImageObjectResult } from "../models/UploadCategoryImageObjectResult.type";
import { resolveCategoryImageIssueMessage } from "../utils/resolveCategoryImageIssueMessage";

export const uploadCategoryImageObject = async ({
  categoryId,
  file,
}: UploadCategoryImageObjectOptions): Promise<UploadCategoryImageObjectResult> => {
  const issue = validateCategoryImageFile(file);

  if (issue || !isCategoryImageMimeType(file.type)) {
    return {
      message: resolveCategoryImageIssueMessage(
        issue ?? CATEGORY_IMAGE_FILE_ISSUE.UNSUPPORTED_TYPE
      ),
    };
  }

  const imagePath = buildCategoryImagePath({
    categoryId,
    mimeType: file.type,
    objectId: crypto.randomUUID(),
  });

  const { error } = await createBrowserSupabaseClient()
    .storage.from(CATEGORY_IMAGE.BUCKET)
    .upload(imagePath, file, {
      contentType: file.type,
      upsert: false,
    });

  return error
    ? { message: CATEGORY_IMAGE_COPY.UPLOAD_ERROR }
    : { imagePath };
};
