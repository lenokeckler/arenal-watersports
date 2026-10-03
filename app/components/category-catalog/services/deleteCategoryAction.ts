"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import {
  createServerSupabaseClient,
  createServiceRoleSupabaseClient,
} from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import {
  assertCategoryHasNoRecords,
  CategoryHasRecordsError,
} from "./assertCategoryHasNoRecords";

export const deleteCategoryAction = async (
  categoryId: string
): Promise<CategoryMutationResult> => {
  const sessionClient = await createServerSupabaseClient();
  await assertIsAdminWorker(sessionClient);

  const serviceRoleClient =
    createServiceRoleSupabaseClient();

  try {
    await assertCategoryHasNoRecords(
      serviceRoleClient,
      categoryId
    );
  } catch (error) {
    if (error instanceof CategoryHasRecordsError) {
      return {
        status: CATEGORY_MUTATION_STATUS.ERROR,
        message:
          CATEGORY_CATALOG_COPY.DELETE_HAS_RECORDS_ERROR,
      };
    }
    throw error;
  }

  const { error } = await serviceRoleClient
    .from("equipment_categories")
    .delete()
    .eq("id", categoryId);
  throwIfSupabaseError(error, "deleteCategoryAction");

  return { status: CATEGORY_MUTATION_STATUS.SUCCESS };
};
