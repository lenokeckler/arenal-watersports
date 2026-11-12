import { CATEGORY_IMAGE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { validateCategoryImageFile } from "@/app/utils/category-image/validateCategoryImageFile";
import {
  safeNumber,
  safeString,
} from "@/app/utils/safe-value/SafeValue";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import type { RemoveCategoryImageObjectOptions } from "../models/RemoveCategoryImageObjectOptions.interface";
import { removeCategoryImageObject } from "./removeCategoryImageObject";

export const verifyCategoryImageObject = async (
  options: RemoveCategoryImageObjectOptions
): Promise<NullableRef<string>> => {
  const { data, error } = await options.supabase.storage
    .from(CATEGORY_IMAGE.BUCKET)
    .info(options.imagePath);

  if (error) {
    return CATEGORY_IMAGE_COPY.OBJECT_MISSING_ERROR;
  }

  const issue = validateCategoryImageFile({
    size: safeNumber(data.size),
    type: safeString(data.contentType),
  });

  if (issue) {
    await removeCategoryImageObject(options);
    return CATEGORY_IMAGE_COPY.OBJECT_INVALID_ERROR;
  }

  return null;
};
