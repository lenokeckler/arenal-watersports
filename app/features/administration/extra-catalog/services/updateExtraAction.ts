"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import type { UpdateExtraInput } from "../models/UpdateExtraInput.interface";
import { mapExtraWriteErrorToResult } from "../utils/mapExtraWriteErrorToResult";
import { mapExtraInputToPriceColumns } from "../utils/mapExtraInputToPriceColumns";
import { resolveExtraValidationResult } from "../utils/resolveExtraValidationResult";

export const updateExtraAction = async (
  input: UpdateExtraInput
): Promise<ExtraMutationResult> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);

  const validationFailure =
    resolveExtraValidationResult(input);
  if (validationFailure) {
    return validationFailure;
  }

  const { data: updatedExtraRow, error } = await supabase
    .from("extras")
    .update({
      name: input.name.trim(),
      ...mapExtraInputToPriceColumns(input),
      updated_by: adminWorkerId,
    })
    .eq("id", input.extraId)
    .select("id")
    .maybeSingle();
  const failure = mapExtraWriteErrorToResult(error);
  if (failure) {
    return failure;
  }
  throwIfSupabaseError(error, "updateExtraAction");

  if (!updatedExtraRow) {
    return {
      status: EXTRA_MUTATION_STATUS.ERROR,
      message: EXTRA_CATALOG_COPY.NOT_FOUND_ERROR,
    };
  }

  return { status: EXTRA_MUTATION_STATUS.SUCCESS };
};
