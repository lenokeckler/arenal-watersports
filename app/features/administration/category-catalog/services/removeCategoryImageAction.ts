"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import type { CategoryImageMutationResult } from "../models/CategoryImageMutationResult.type";
import {
  buildCategoryImageError,
  buildCategoryImageSuccess,
} from "../utils/buildCategoryImageResult";
import { parseCategoryImageCategoryId } from "../utils/parseCategoryImageCategoryId";
import { discardCategoryImageObject } from "./discardCategoryImageObject";
import { readCategoryImagePath } from "./readCategoryImagePath";
import { updateCategoryImagePath } from "./updateCategoryImagePath";

export const removeCategoryImageAction = async (
  categoryIdInput: unknown
): Promise<CategoryImageMutationResult> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);

  const categoryId =
    parseCategoryImageCategoryId(categoryIdInput);
  if (!categoryId) {
    return buildCategoryImageError(
      CATEGORY_IMAGE_COPY.INVALID_INPUT_ERROR
    );
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
      imagePath: null,
      supabase,
    }));
  if (!previous || !wasUpdated) {
    return buildCategoryImageError(
      CATEGORY_IMAGE_COPY.CATEGORY_NOT_FOUND_ERROR
    );
  }

  const hasLeftoverObject =
    await discardCategoryImageObject({
      imagePath: previous.image_path,
      supabase,
    });

  return buildCategoryImageSuccess(hasLeftoverObject);
};
