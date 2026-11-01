"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";

export const reactivateCategoryAction = async (
  categoryId: string
): Promise<CategoryMutationResult> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);

  const { error } = await supabase
    .from("equipment_categories")
    .update({
      status: CATEGORY_STATUS.ACTIVE,
      updated_by: adminWorkerId,
    })
    .eq("id", categoryId)
    .eq("status", CATEGORY_STATUS.INACTIVE);
  throwIfSupabaseError(error, "reactivateCategoryAction");

  return { status: CATEGORY_MUTATION_STATUS.SUCCESS };
};
