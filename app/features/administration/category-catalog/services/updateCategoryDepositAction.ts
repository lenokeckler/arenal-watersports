"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import type { UpdateCategoryDepositInput } from "../models/UpdateCategoryDepositInput.interface";
import { mapUpdateCategoryDepositInputToRow } from "../utils/mapUpdateCategoryDepositInputToRow";

export const updateCategoryDepositAction = async (
  input: UpdateCategoryDepositInput
): Promise<CategoryMutationResult> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);

  const { data, error } = await supabase
    .from("equipment_categories")
    .update(
      mapUpdateCategoryDepositInputToRow(
        input,
        adminWorkerId
      )
    )
    .eq("id", input.categoryId)
    .select("id")
    .maybeSingle();
  throwIfSupabaseError(
    error,
    "updateCategoryDepositAction"
  );

  if (!data) {
    return {
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message:
        CATEGORY_CATALOG_COPY.DEPOSIT_CATEGORY_NOT_FOUND_ERROR,
    };
  }

  return { status: CATEGORY_MUTATION_STATUS.SUCCESS };
};
