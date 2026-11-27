"use server";

import { SUPABASE_RPC } from "@/app/constants";
import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { ExtraCompatibilityMutationResult } from "../models/ExtraCompatibilityMutationResult.interface";
import { mapExtraCompatibilityErrorToResult } from "../utils/mapExtraCompatibilityErrorToResult";
import { parseSetExtraCompatibilityInput } from "../utils/parseSetExtraCompatibilityInput";
import { resolveExtraCompatibilityUnitIds } from "../utils/resolveExtraCompatibilityUnitIds";
import { fetchExtraCompatibilityCategory } from "./fetchExtraCompatibilityCategory";
import { fetchExtraLinkedUnitIds } from "./fetchExtraLinkedUnitIds";

const buildErrorResult = (
  message: string
): ExtraCompatibilityMutationResult => ({
  status: EXTRA_MUTATION_STATUS.ERROR,
  message,
});

export const setExtraCompatibilityAction = async (
  input: unknown
): Promise<ExtraCompatibilityMutationResult> => {
  const supabase = await createServerSupabaseClient();
  await assertIsAdminWorker(supabase);

  const parsedInput =
    parseSetExtraCompatibilityInput(input);
  if (!parsedInput) {
    return buildErrorResult(
      EXTRA_COMPATIBILITY_COPY.INVALID_INPUT_ERROR
    );
  }

  const categoryRow = await fetchExtraCompatibilityCategory(
    supabase,
    parsedInput.categoryId
  );
  if (!categoryRow) {
    return buildErrorResult(
      EXTRA_COMPATIBILITY_COPY.CATEGORY_NOT_FOUND_ERROR
    );
  }

  const unitIds = resolveExtraCompatibilityUnitIds({
    currentLinkedIds: await fetchExtraLinkedUnitIds(
      supabase,
      parsedInput.extraId
    ),
    categoryUnitRows: categoryRow.equipment_units,
    selectedUnitIds: parsedInput.unitIds,
  });
  if (!unitIds) {
    return buildErrorResult(
      EXTRA_COMPATIBILITY_COPY.INVALID_SELECTION_ERROR
    );
  }

  const { error } = await supabase.rpc(
    SUPABASE_RPC.SET_EXTRA_COMPATIBILITY,
    { p_extra_id: parsedInput.extraId, p_unit_ids: unitIds }
  );
  const failure = mapExtraCompatibilityErrorToResult(error);
  if (failure) {
    return failure;
  }
  throwIfSupabaseError(
    error,
    "setExtraCompatibilityAction"
  );

  return { status: EXTRA_MUTATION_STATUS.SUCCESS };
};
