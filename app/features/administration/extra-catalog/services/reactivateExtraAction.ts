"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import { mapExtraWriteErrorToResult } from "../utils/mapExtraWriteErrorToResult";

export const reactivateExtraAction = async (
  extraId: string
): Promise<ExtraMutationResult> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);

  const { data: reactivatedExtraRow, error } =
    await supabase
      .from("extras")
      .update({
        status: EXTRA_STATUS.ACTIVE,
        updated_by: adminWorkerId,
      })
      .eq("id", extraId)
      .eq("status", EXTRA_STATUS.INACTIVE)
      .select("id")
      .maybeSingle();
  const failure = mapExtraWriteErrorToResult(error);
  if (failure) {
    return failure;
  }
  throwIfSupabaseError(error, "reactivateExtraAction");

  if (!reactivatedExtraRow) {
    return {
      status: EXTRA_MUTATION_STATUS.ERROR,
      message: EXTRA_CATALOG_COPY.NOT_FOUND_ERROR,
    };
  }

  return { status: EXTRA_MUTATION_STATUS.SUCCESS };
};
