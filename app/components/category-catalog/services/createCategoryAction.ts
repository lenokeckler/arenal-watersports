"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { STRING } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CreateCategoryInput } from "../models/CreateCategoryInput.interface";
import type { CreateCategoryResult } from "../models/CreateCategoryResult.interface";
import { resolveGroupConflictErrorMessage } from "../utils/resolveGroupConflictErrorMessage";
import {
  assertCategoryGroupTrackingModeAvailable,
  CategoryGroupConflictError,
} from "./assertCategoryGroupTrackingModeAvailable";

export const createCategoryAction = async (
  input: CreateCategoryInput
): Promise<CreateCategoryResult> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);

  const trimmedName = input.name.trim();
  const trimmedGroupName = input.groupName.trim();

  if (trimmedGroupName !== STRING.Empty) {
    try {
      await assertCategoryGroupTrackingModeAvailable(
        supabase,
        {
          groupName: trimmedGroupName,
          trackingMode: input.trackingMode,
        }
      );
    } catch (error) {
      if (error instanceof CategoryGroupConflictError) {
        return {
          status: CATEGORY_MUTATION_STATUS.ERROR,
          groupNameError: resolveGroupConflictErrorMessage(
            error.existingTrackingMode,
            input.trackingMode
          ),
        };
      }
      throw error;
    }
  }

  const { data: insertedCategoryRow, error } =
    await supabase
      .from("equipment_categories")
      .insert({
        name: trimmedName,
        tracking_mode: input.trackingMode,
        group_name:
          trimmedGroupName === STRING.Empty
            ? null
            : trimmedGroupName,
        created_by: adminWorkerId,
        updated_by: adminWorkerId,
      })
      .select("id")
      .single();
  throwIfSupabaseError(error, "createCategoryAction");
  if (!insertedCategoryRow) {
    throw new Error(
      "createCategoryAction: insert returned no row"
    );
  }

  return {
    status: CATEGORY_MUTATION_STATUS.SUCCESS,
    categoryId: insertedCategoryRow.id,
  };
};
