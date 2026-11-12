import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryImageSaveOutcome } from "../models/CategoryImageSaveOutcome.interface";
import type { SetCategoryImageInput } from "../models/SetCategoryImageInput.interface";
import { discardCategoryImageObject } from "../services/discardCategoryImageObject";
import { setCategoryImageAction } from "../services/setCategoryImageAction";
import {
  buildCategoryImageCompletion,
  buildCategoryImageFailure,
} from "./buildCategoryImageOutcome";

export const linkUploadedCategoryImage = async (
  options: SetCategoryImageInput
): Promise<CategoryImageSaveOutcome> => {
  const discardUploadedObject = (): Promise<boolean> =>
    discardCategoryImageObject({
      imagePath: options.imagePath,
      supabase: createBrowserSupabaseClient(),
    });

  try {
    const result = await setCategoryImageAction(options);

    if (result.status === CATEGORY_MUTATION_STATUS.ERROR) {
      await discardUploadedObject();
      return buildCategoryImageFailure(result.message);
    }

    return buildCategoryImageCompletion(
      CATEGORY_IMAGE_COPY.SAVE_SUCCESS_TOAST,
      result.hasLeftoverObject
    );
  } catch {
    await discardUploadedObject();
    return buildCategoryImageFailure(
      CATEGORY_IMAGE_COPY.UPLOAD_ERROR
    );
  }
};
