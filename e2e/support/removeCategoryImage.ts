import { CATEGORY_IMAGE } from "@/app/constants";
import {
  E2E_CATEGORY_IMAGE,
  E2E_CATEGORY_IMAGE_ERROR,
} from "../constants/E2eCategoryImage.constants";
import { findCategoryId } from "./categoryFixtures";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const removeCategoryImage = async (
  categoryName: string
): Promise<void> => {
  const supabase = createServiceRoleClient();
  const categoryId = await findCategoryId(categoryName);
  const unlink = await supabase
    .from(E2E_CATEGORY_IMAGE.CATEGORY_TABLE)
    .update({ [E2E_CATEGORY_IMAGE.CATEGORY_COLUMN]: null })
    .eq(E2E_CATEGORY_IMAGE.ID_COLUMN, categoryId);
  const objects = await supabase.storage
    .from(CATEGORY_IMAGE.BUCKET)
    .list(categoryId);
  const paths = (objects.data ?? []).map(
    (object) =>
      `${categoryId}${CATEGORY_IMAGE.PATH_SEPARATOR}${object.name}`
  );
  const removal =
    paths.length > 0
      ? await supabase.storage
          .from(CATEGORY_IMAGE.BUCKET)
          .remove(paths)
      : { error: null };
  const failure =
    unlink.error ?? objects.error ?? removal.error;

  if (failure) {
    return failE2eOperation(
      E2E_CATEGORY_IMAGE_ERROR.OPERATION_REMOVE,
      failure.message
    );
  }

  return undefined;
};
