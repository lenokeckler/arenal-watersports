"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import { discardCategoryImageObject } from "./discardCategoryImageObject";
import { readCategoryImagePath } from "./readCategoryImagePath";

export const deleteCategoryAction = async (
  categoryId: string
): Promise<CategoryMutationResult> => {
  const supabase = await createServerSupabaseClient();
  await assertIsAdminWorker(supabase);

  const previous = await readCategoryImagePath({
    categoryId,
    supabase,
  });

  const { error } = await supabase
    .from("equipment_categories")
    .delete()
    .eq("id", categoryId);

  if (
    error?.code ===
    POSTGRES_ERROR_CODE.FOREIGN_KEY_VIOLATION
  ) {
    return {
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message:
        CATEGORY_CATALOG_COPY.DELETE_HAS_RECORDS_ERROR,
    };
  }
  throwIfSupabaseError(error, "deleteCategoryAction");

  await discardCategoryImageObject({
    imagePath: previous?.image_path ?? null,
    supabase,
  });

  return { status: CATEGORY_MUTATION_STATUS.SUCCESS };
};
