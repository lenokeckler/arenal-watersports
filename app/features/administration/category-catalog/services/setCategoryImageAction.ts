"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import type { CategoryImageMutationResult } from "../models/CategoryImageMutationResult.type";
import {
  buildCategoryImageError,
  buildCategoryImageSuccess,
} from "../utils/buildCategoryImageResult";
import { parseSetCategoryImageInput } from "../utils/parseSetCategoryImageInput";
import { discardCategoryImageObject } from "./discardCategoryImageObject";
import { readCategoryImagePath } from "./readCategoryImagePath";
import { updateCategoryImagePath } from "./updateCategoryImagePath";
import { verifyCategoryImageObject } from "./verifyCategoryImageObject";

export const setCategoryImageAction = async (
  input: unknown
): Promise<CategoryImageMutationResult> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);

  const setInput = parseSetCategoryImageInput(input);
  if (!setInput) {
    return buildCategoryImageError(
      CATEGORY_IMAGE_COPY.INVALID_INPUT_ERROR
    );
  }

  const { categoryId, imagePath } = setInput;
  const objectError = await verifyCategoryImageObject({
    imagePath,
    supabase,
  });
  if (objectError) {
    return buildCategoryImageError(objectError);
  }

  const previous = await readCategoryImagePath({
    categoryId,
    supabase,
  });
  const wasUpdated =
    previous !== null &&
    (await updateCategoryImagePath({
      adminWorkerId,
      categoryId,
      imagePath,
      supabase,
    }));
  if (!previous || !wasUpdated) {
    await discardCategoryImageObject({
      imagePath,
      supabase,
    });
    return buildCategoryImageError(
      CATEGORY_IMAGE_COPY.CATEGORY_NOT_FOUND_ERROR
    );
  }

  const hasLeftoverObject =
    await discardCategoryImageObject({
      imagePath:
        previous.image_path === imagePath
          ? null
          : previous.image_path,
      supabase,
    });

  return buildCategoryImageSuccess(hasLeftoverObject);
};
